const express = require('express')  
const router = new express.Router()  
const Task = require('../models/tasks') 
const auth = require('../middleware/auth')
 

 
 router.post('/tasks',auth, async (req, res) => { 
    const task = new Task({ 
        ...req.body ,
        owner : req.user._id
    })
        try { 
           await task.save() 
            res.status(201).send(task)
        } catch (e) { 
            res.status(400).send(e)
        }


    // task.save().then((task) => { 
    //     res.status(201).send(task)
    // }).catch((e) => { 
    //     res.status(400).send(e)
    // })
})   

router.get('/tasks', auth, async (req, res) => {   
    const match = {}  
    const sort = {}
     
    if (req.query.completed) { 
        match.completed = req.query.completed === 'true'
    } 
    if (req.query.sortBy) { 
        const parts = req.query.sortBy.split(':') 
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try { 
        //const tasks = await Task.find({owner : req.user._id})  
         await req.user.populate({ 
             path : 'tasks',
             match, 
             options : { 
                 limit : parseInt(req.query.limit),  
                 skip : parseInt(req.query.skip), 
                 sort
             }

         }).execPopulate()
        if(!req.user.tasks) { 
            return res.status(404).send('no task were found')
        } 
        res.status(200).send(req.user.tasks)
    } catch (e) { 
        res.status(500).send(e)
    }   

    //    user.save().then((user) => { 
 //        res.send(user)
 //    }).catch((e) => {  
 //        res.status(400).send(e)
 
 //    })
}) 

router.get('/tasks/:id', auth, async (req, res) => { 
    const _id = req.params.id  
    try {   
        const task = await Task.findOne({_id, owner : req.user._id})
        if(!task) { 
            return res.status(404).send('A task with the ID ' + _id + ' could not be found')
        } 
        res.status(200).send('Here is your task with ID ' + _id + task)
    } catch (e) { 
        res.status(500).send(e)
    }


    
    // Task.findById(_id).then((task) => { 
    //     if(!task){ 
    //         return res.status(404).send('A task with the ID ' + _id + ' could not be found')
    //     } 
    //     res.status(200).send('Here is your task with ID ' + _id + task)
    // }).catch((e) => { 
    //     res.status(500).send(e)
    // })
})
  
router.patch('/tasks/:id', auth, async (req, res) => {   
    const updates = Object.keys(req.body)
    const allowedUpdates = ['task', 'completed']  
    const _id = req.params.id
    const isValidOperation = updates.every((update) => { 
        return allowedUpdates.includes(update) 
    })  
    if (!isValidOperation) { 
        res.status(400).send('The update for task with ID ' + _id + ' contains invalid material')
    }
    try {    
        const task = await Task.findOne({ _id , owner : req.user._id }) 

        //const task = await Task.findById(req.params.id)
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators : true})  

        if (!task) { 
            return res.status(404).send('The task with ID ' + _id + ' could not be updated')
        }  

        updates.forEach((update) => task[update] = req.body[update])
        
        await task.save()
        res.send('The task with ID ' + _id + ' has been updated' + task)
    } catch (e) {  
        res.status(400).send(e)

    }
}) 

router.delete('/tasks/:id', auth, async (req, res) => { 
    const _id = req.params.id 
    try {  
        const task = await Task.findOneAndDelete({_id, owner : req.user._id}) 
        if (!task) { 
            return res.status(404).send('The action cannot be peformed because the task witj ID ' + _id + ' does not exist')
        }
        res.send('The task with ID ' + _id + ' has been deleted ' + task)
    } catch (e) {  
        res.status(500).send(e)

    }
}) 

module.exports = router