require('../src/db/mongoose') 
const User = require('../src/models/users')  

// User.findByIdAndUpdate('5e7e540b2319cb3308f00eeb', {age : 27}).then((user) => { 
//     console.log(user) 
//     return User.countDocuments({ age : 99})
// }).then((result) => { 
//     console.log(result)
// }).catch((e) => 
// console.log(e)) 

const updateAgeandCount = async (id, age) => {  
    const user = await User.findByIdAndUpdate(id, {age : age}) 
    const countUser = await User.countDocuments({age : age})

    return user + countUser
} 
updateAgeandCount('5e7e540b2319cb3308f00eeb', 29).then((result) => {  
    const _id = '5e7e540b2319cb3308f00eeb'
    console.log('The user with ID ' + _id + ' has been updated' + result)
}).catch((e) => { 
    console.log('Something went wrong' + e)
})