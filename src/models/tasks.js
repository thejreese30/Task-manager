const mongoose = require('mongoose')   
const validator = require('validator')  
// const bcrypt = require('bcryptjs')

const taskSchema = new mongoose.Schema( {  
    task : { 
        type : String, 
        required : true,   
        trim : true,
        

        
    },  

    completed : { 
        type : Boolean, 
        default : false
    }


})    

// taskSchema.pre('save', async function (next) { 
//     const task = this 
//     if (task.isModified('completed')) { 
//         task.completed = await bcrypt.hash(task.completed, 8)
//     } 
//     next()
// })
 
 
 const Task = mongoose.model('Task', taskSchema)

module.exports = Task