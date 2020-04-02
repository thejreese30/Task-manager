require('../src/db/mongoose') 
const Task = require('../src/models/tasks') 

// Task.findByIdAndDelete('5e7e36ad88d9e12840f7e5ff').then((result) => {  
//     const _id = '55e7e36ad88d9e12840f7e5ff' 
//     if (!result) { 
//         console.log('The task does not exist')
//     }
//     console.log('task with ID ' + _id + ' has been deleted') 
//     return Task.countDocuments( {completed : false} )
// }).then((tasks) => { 
//     console.log(tasks)
// }).catch((e)=> { 
//     console.log(e)
// }) 

const deleteTaskAndCount = async (id) => { 
    const task = await Task.findByIdAndDelete(id)
    const countTask = await Task.countDocuments({completed : false})  
    
    return  task + countTask
} 
deleteTaskAndCount('5e7fc2d2df6b081134e6a724').then((result) => {  
    const _id = '5e7fc2d2df6b081134e6a724'
    console.log('the task with ID ' + _id + ' has been deleted ' + result)

}).catch((e) => { 
    console.log('an error occured' + e)
})