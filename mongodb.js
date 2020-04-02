const mongodb = require('mongodb') 
const MongoClient = mongodb.MongoClient 

const ObjectID = mongodb.ObjectID

const connectionUrl = 'mongodb://127.0.0.1:27017' 
const databaseName = 'task-manager'  



MongoClient.connect(connectionUrl, {useNewUrlParser : true}, (error, client) => { 
    if (error) { 
       return console.log('Unable to connect to database')
    } 
    
    const db = client.db(databaseName)         

    db.collection('users').deleteOne({ task : 'pick up kids from daycaree'}).then((result) => { 
        console.log('the task has been deleted', result)
    }).catch((error) => { 
        console.log('could not delete your task', error)
    })












    // db.collection('users').deleteMany({age : 17}, ).then((result) => { 
    //     console.log('users have been deleted', result)
    // }).catch((error) => { 
    //     console.log('users could not be deleted', error)
    // })

    // db.collection('users').updateMany( { completed : false },
    //     { 
    //         $set :  
    //         {completed : true} 
    //     }
    //     ).then((result) => { 
    //         console.log('task updated', result)
    //     }).catch((error) => { 
    //         console.log('task could not be updated', error)
    //     })

//    const updatePromise = db.collection('users').updateOne({ 
//         _id : new ObjectID('5e7ba8fe83c01604643b049f') 
//     }, 
//     { 
//         $inc : 
//         { age : -2}  
//     }) 

//     updatePromise.then((result) => { 
//         console.log('User updated', result)
//     }).catch((error) => { 
//         console.log('user could not be updated', error)
//     })

   
    // db.collection('users').find({completed : true}).toArray((error, users) => {  
    //     if (error) { 
    //         console.log('All task complete')
    //     }
    //     console.log(users)
    // }) 

    // db.collection ('users').findOne({_id : new ObjectID('5e7bb9c703b48a1f300febbd')}, (error, user) => { 
    //     if (error) { 
    //         console.log('Unable to find the task')
    //     } 
    //     console.log(user)
    // })

   


















    //previous lines of code
    // db.collection('users').insertMany([ 
    //     {task : 'meeting with department chair', completed : true },  
    //     {task : 'pick up kids from daycaree', completed : true}], 
    //     (error, result) => { 
    //         if (error) { 
    //             return console.log('Unable to add task')
    //         } 

    //         console.log(result.ops)
    //     })

    // db.collection('users').insertMany([{name : 'Cicely', age : 47}, {name : 'Donald', age : 46}], (error, result) => {  
    //     if (error) { 
    //               return console.log('Unable to create user profile')
    //              }  
    //              console.log(result.ops)

    // })

    // db.collection('users').insertOne( 
    //      {  
    //     _id : id,
    //     name : 'Justin', 
    //      age : '17'}, (error, result) => { 
    //     if (error) { 
    //         return console.log('Unable to create user profile')
    //     } 

    //     console.log(result.ops)
    // })
} )  
// const id = new ObjectID() 

//console.log(id) 
// console.log(id.getTimestamp())
// console.log(id.toHexString())
