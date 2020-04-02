const express = require('express')  
const router = new express.Router()  
const Task = require('../models/tasks')
 

 
 router.post('/tasks', async (req, res) => { 
    const task = new Task(req.body)  
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

router.get('/tasks', async (req, res) => {  
    try { 
        const tasks = await Task.find({}) 
        if(!tasks) { 
            return res.status(404).send('no task were found')
        } 
        res.status(200).send(tasks)
    } catch (e) { 
        res.status(500).send(e)
    }   

    //    user.save().then((user) => { 
 //        res.send(user)
 //    }).catch((e) => {  
 //        res.status(400).send(e)
 
 //    })
}) 

router.get('/tasks/:id', async (req, res) => { 
    const _id = req.params.id  
    try { 
        const task = await Task.findById(_id) 
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
  
router.patch('/tasks/:id', async (req, res) => {   
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
        const task = await Task.findById(req.params.id)
        updates.forEach((update) => { 
            task[update] = req.body[update]
        })
        await task.save()
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators : true}) 
        if (!task) { 
            return res.status(404).send('The task with ID ' + _id + ' could not be updated')
        }
        res.send('The task with ID ' + _id + ' has been updated' + task)
    } catch (e) {  
        res.status(400).send(e)

    }
}) 

router.delete('/tasks/:id', async (req, res) => { 
    const _id = req.params.id 
    try {  
        const task = await Task.findByIdAndDelete(req.params.id) 
        if (!task) { 
            return res.status(404).send('The action cannot be peformed because the task wit ID ' + _id + ' does not exist')
        }
        res.send('The task with ID ' + _id + ' has been deleted' + task)
    } catch (e) {  
        res.status(500).send(e)

    }
}) 

module.exports = router