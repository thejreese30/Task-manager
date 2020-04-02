const mongoose = require('mongoose')  
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',  
{ 
    useNewUrlParser : true, 
    useCreateIndex : true, 
    useFindAndModify : false
}) 







// const myTask = new Task({ task : 'Say happy birthday to Jon' }) 

// myTask.save().then((result) => { 
//     console.log('Your task has been created', result)
// }).catch((error) => { 
//     console.log('Your task could not be created', error)
// })


// const me = new User({ name : 'Selina', email : 'catwoman@gmail.com', password : 'Password' }) 
// me.save().then((me) => { 
//     console.log('New user has been created', me)
// }).catch((error) => { 
//     console.log('new user could not be created', error)
// })