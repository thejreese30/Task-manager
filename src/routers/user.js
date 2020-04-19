const express = require('express')  
const User = require('../models/users')
const auth = require('../middleware/auth') 
const multer = require('multer') 
const sharp = require('sharp')
const { sendWelcomeEmail, sendCancellationEmail } = require('../emails/account') 
const router = new express.Router()   


router.post('/users', async (req, res) => {  
    const user = new User(req.body)     
    
    try {   
     await user.save()  
     const token = await user.generateAuthToken()
     res.status(201).send({user, token}) 
      sendWelcomeEmail(user.email, user.name)  
    } catch (e) {  
        res.status(400).send(e)
 
    }
     
 //    user.save().then((user) => { 
 //        res.send(user)
 //    }).catch((e) => {  
 //        res.status(400).send(e)
 
 //    })
     
 })  

 router.post('/users/login', async (req, res) => { 
     try {  
         const user = await User.findByCredentials(req.body.email, req.body.password) 
         const token = await user.generateAuthToken()
        res.send({user , token})
     } catch (e) { 
         res.status(400).send('Your login failed ' + e)
     }

 }) 

 router.post('/users/logout', auth, async (req, res) => { 
     try {  
         req.user.tokens = req.user.tokens.filter((token)=> { 
             return token.token !== req.token
         }) 
         await req.user.save() 
         res.send('You have been logged out')

     } catch (e) { 
         res.status(500).send('Your log out failed')

     }
 }) 

 router.post('/users/logoutAll', auth, async(req, res) => { 
     try {  
         req.user.tokens = []
         await req.user.save()
             res.send('All accounts have been signed out') 

     } catch (e) { 
        res.status(500).send('the logout failed' + e)
     }
 })

 router.get('/users/me', auth, async (req,res) => {    
   res.send(req.user)

    // try { 
    //   const users = await User.find({}) 
    //    res.send(users)
    // } catch (e) { 
    //     res.status(500).send(e)
    // }


    // User.find({}).then((users) => { 
    //     res.status(200).send(users)
    // }).catch((e) => { 
    //     res.status(500).send(e)
    // })

})  

// router.get('/users/:id', async (req, res) => { 
//     const _id = req.params.id  
//         try {  
//             const user = await User.findById(_id) 
//             if (!user) { 
//                 res.status(404).send('no user could be found') 

//             }
//             res.send(user)

//         } catch (e) {  
//             res.status(500).send(e)

//         }
  // User.findById(_id).then((user) => {  
    //     if(!user) { 
    //         return res.status(404).send('No users match the id you entered')
    //     }
    //     res.status(200).send(user)
    // }).catch((e) => { 
    //     res.status(500).send(e)
    // })
//}) 

router.patch('/users/me', auth, async (req, res) => {   
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','age','email','password'] 
    const isValidOperation = updates.every((update) => { 
        return allowedUpdates.includes(update)
    })
     
    if (!isValidOperation) { 
        return res.status(400).send({error :'Invalid updates'})
    } 

    try {   
        //const user = await User.findById(req.user._id) 
        updates.forEach((update) => { 
            req.user[update] = req.body[update] 
        }) 
        await req.user.save()
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new : true, runValidators : true})   
        // if (!user) { 
        //    return res.status(404).send('the user was unable to be updated')
        // } 
        res.send(req.user)
        

    } catch (e) {  
        res.status(400).send(e)

    }
}) 

router.delete('/users/me', auth, async (req, res) => {  
    //const _id = req.params.id
    try {   
        // const user = await User.findByIdAndDelete(req.user._id)   
        // if (!user) { 
        //    return res.status(404).send('The action cannot be peformed because user ' + _id + ' does not exist')
        // } 
        await req.user.remove() 
        res.send('User has been deleted' + req.user) 
        sendCancellationEmail(req.user.email, req.user.name)

    } catch(e) {  
        res.status(500).send(e)

    }
})  

const upload = multer({ 
    limits : { 
        fileSize : 1000000
    }, 
    fileFilter (req, file, cb) {  
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) { 
           return cb(new Error ('file must be a jpg or jpeg'))
        } 
        cb(undefined, true)

    }
}) 

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {  
    const buffer = await sharp(req.file.buffer).resize({width : 250, height : 250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => { 
    res.status(400).send({error : error.message})
})
 
router.delete('/users/me/avatar', auth, async (req, res) => { 
    req.user.avatar = undefined 
    await req.user.save()
    res.send('Your avatar has been removed')
}, (error, req, res, next) => { 
    res.status(400).send({ error : error.messsage})
}) 

router.get('/users/:id/avatar', async (req,res) => { 
    try { 
        const user = await  User.findById(req.params.id) 
        if (!user || !user.avatar) { 
            throw new Error() 
        } 
        res.set('Content-Type', 'image/png') 
        res.send(user.avatar)
    } catch (e) { 
        res.status(404).send()
    }
})
module.exports = router