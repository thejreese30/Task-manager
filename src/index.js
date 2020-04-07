const express = require('express')  
require('./db/mongoose')   
const userRouter = require('./routers/user') 
const taskRouter = require('./routers/task') 
const jwt = require('jsonwebtoken')

// const User = require('./models/users') 
// const Task = require('./models/tasks')

const app = express() 
const port = process.env.PORT || 3000    

// app.use((req, res, next) => { 
//         res.status(503).send('The site is currently under maintenance please visit again soon')
// })

// app.use((req, res, next) => { 
//    if(req.method === 'GET') {  
//        res.send('GET request are disabled')

//    } else { 
//        next()
//    }
// })

app.use(express.json())  
app.use(userRouter) 
app.use(taskRouter)
 
 

    
// app.post('/users', async (req, res) => {  
//    const user = new User(req.body)   

//    try { 
//     await user.save() 
//     res.status(201).send(user)
//    } catch (e) {  
//        res.status(400).send(e)

//    }
    

// //    user.save().then((user) => { 
// //        res.send(user)
// //    }).catch((e) => {  
// //        res.status(400).send(e)

// //    })
    
// }) 

// app.post('/tasks', async (req, res) => { 
//     const task = new Task(req.body)  
//         try { 
//             task.save() 
//             res.status(201).send(task)
//         } catch (e) { 
//             res.status(400).send(e)
//         }


//     // task.save().then((task) => { 
//     //     res.status(201).send(task)
//     // }).catch((e) => { 
//     //     res.status(400).send(e)
//     // })
// })  
 






// app.get('/users', async (req,res) => {    
//     try { 
//       const users = await User.find({}) 
//        res.status(200).send(users)
//     } catch (e) { 
//         res.status(500).send(e)
//     }


//     // User.find({}).then((users) => { 
//     //     res.status(200).send(users)
//     // }).catch((e) => { 
//     //     res.status(500).send(e)
//     // })

// }) 

// app.get('/users/:id', async (req, res) => { 
//     const _id = req.params.id  
//         try {  
//             const user = await User.findById(_id) 
//             if (!user) { 
//                 res.status(404).send('no user could be found') 

//             }
//             res.status(200).send(user)

//         } catch (e) { 

//         }






//     // User.findById(_id).then((user) => {  
//     //     if(!user) { 
//     //         return res.status(404).send('No users match the id you entered')
//     //     }
//     //     res.status(200).send(user)
//     // }).catch((e) => { 
//     //     res.status(500).send(e)
//     // })
// })

// app.get('/tasks', async (req, res) => {  
//         try { 
//             const tasks = await Task.find({}) 
//             if(!tasks) { 
//                 return res.status(404).send('no task were found')
//             } 
//             res.status(200).send(tasks)
//         } catch (e) { 
//             res.status(500).send(e)
//         }


//     // Task.find({}).then((tasks) => { 
//     //     if(!tasks) { 
//     //        return res.status(404).send('task could not be found')
//     //     } 
//     //     res.status(200).send('Here are your tasks: ' + tasks)
//     // }).catch((e) => { 
//     //     res.status(500).send(e)
//     // })
// })
 
// app.get('/tasks/:id', async (req, res) => { 
//     const _id = req.params.id  
//     try { 
//         const task = await Task.findById(_id) 
//         if(!task) { 
//             return res.status(404).send('A task with the ID ' + _id + ' could not be found')
//         } 
//         res.status(200).send('Here is your task with ID ' + _id + task)
//     } catch (e) { 
//         res.status(500).send(e)
//     }


    
//     // Task.findById(_id).then((task) => { 
//     //     if(!task){ 
//     //         return res.status(404).send('A task with the ID ' + _id + ' could not be found')
//     //     } 
//     //     res.status(200).send('Here is your task with ID ' + _id + task)
//     // }).catch((e) => { 
//     //     res.status(500).send(e)
//     // })
// })
 

// app.patch('/users/:id', async (req, res) => {   
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name','age','email','password','username'] 
//     const isValidOperation = updates.every((update) => { 
//         return allowedUpdates.includes(update)
//     })
     
//     if (!isValidOperation) { 
//         return res.status(400).send({error :'Invalid updates'})
//     } 

//     try {  
//         const user = await User.findByIdAndUpdate(req.params.id, req.body, { new : true, runValidators : true})   
//         if (!user) { 
//             res.status(404).send('the user was unable to be updated')
//         }
//         res.send(user)
        

//     } catch (e) {  
//         res.status(400).send(e)

//     }
// })
 
// app.patch('/tasks/:id', async (req, res) => {   
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['task', 'completed']  
//     const _id = req.params.id
//     const isValidOperation = updates.every((update) => { 
//         return allowedUpdates.includes(update) 
//     })  
//     if (!isValidOperation) { 
//         res.status(400).send('The update for task with ID ' + _id + ' contains invalid material')
//     }
//     try {  
//         const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators : true}) 
//         if (!task) { 
//             return res.status(404).send('The task with ID ' + _id + ' could not be updated')
//         }
//         res.send('The task with ID ' + _id + ' has been updated' + task)
//     } catch (e) {  
//         res.status(400).send(e)

//     }
// })

// app.delete('/users/:id', async (req, res) => {  
//     const _id = req.params.id
//     try {   
//         const user = await User.findByIdAndDelete(req.params.id)   
//         if (!user) { 
//            return res.status(404).send('The action cannot be peformed because user ' + _id + ' does not exist')
//         }
//         res.send('User with ID ' + _id + ' has been deleted' + user)

//     } catch(e) {  
//         res.status(500).send(e)

//     }
// })

// app.delete('/tasks/:id', async (req, res) => { 
//     const _id = req.params.id 
//     try {  
//         const task = await Task.findByIdAndDelete(req.params.id) 
//         if (!task) { 
//             return res.status(404).send('The action cannot be peformed because the task wit ID ' + _id + ' does not exist')
//         }
//         res.send('The task with ID ' + _id + ' has been deleted' + task)
//     } catch (e) {  
//         res.status(500).send(e)

//     }
// })







app.listen (port, () => { 
    console.log('Server is running on port ' + port)
})