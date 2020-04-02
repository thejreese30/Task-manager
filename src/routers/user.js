const express = require('express')  
const User = require('../models/users')
const router = new express.Router()  
 


router.post('/users', async (req, res) => {  
    const user = new User(req.body)   
 
    try { 
     await user.save() 
     res.status(201).send(user)
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
            res.send(user)
     } catch (e) { 
        res.status(400).send('Your login failed ' + e)
     }
 })

 router.get('/users', async (req,res) => {    
    try { 
      const users = await User.find({}) 
       res.status(200).send(users)
    } catch (e) { 
        res.status(500).send(e)
    }


    // User.find({}).then((users) => { 
    //     res.status(200).send(users)
    // }).catch((e) => { 
    //     res.status(500).send(e)
    // })

})  

router.get('/users/:id', async (req, res) => { 
    const _id = req.params.id  
        try {  
            const user = await User.findById(_id) 
            if (!user) { 
                res.status(404).send('no user could be found') 

            }
            res.status(200).send(user)

        } catch (e) {  
            res.status(500).send(e)

        }
  // User.findById(_id).then((user) => {  
    //     if(!user) { 
    //         return res.status(404).send('No users match the id you entered')
    //     }
    //     res.status(200).send(user)
    // }).catch((e) => { 
    //     res.status(500).send(e)
    // })
}) 

router.patch('/users/:id', async (req, res) => {   
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','age','email','password','username'] 
    const isValidOperation = updates.every((update) => { 
        return allowedUpdates.includes(update)
    })
     
    if (!isValidOperation) { 
        return res.status(400).send({error :'Invalid updates'})
    } 

    try {   
        const user = await User.findById(req.params.id) 
        updates.forEach((update) => { 
            user[update] = req.body[update] 
        }) 
        await user.save()
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new : true, runValidators : true})   
        if (!user) { 
            res.status(404).send('the user was unable to be updated')
        }
        res.send(user)
        

    } catch (e) {  
        res.status(400).send(e)

    }
}) 

router.delete('/users/:id', async (req, res) => {  
    const _id = req.params.id
    try {   
        const user = await User.findByIdAndDelete(req.params.id)   
        if (!user) { 
           return res.status(404).send('The action cannot be peformed because user ' + _id + ' does not exist')
        }
        res.send('User with ID ' + _id + ' has been deleted' + user)

    } catch(e) {  
        res.status(500).send(e)

    }
})

module.exports = router