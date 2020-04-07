const mongoose = require('mongoose')  
const validator = require('validator') 
const bcrypt = require('bcryptjs')  
const uniqueValidator = require('mongoose-unique-validator') 
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({ 
    name : { 
        type : String, 
        required: true,  
        trim : true,
        default : 'Anon'
    },   

    email : {
        type : String,  
        unique : true,
        required : true,   
        trim : true,   
        lowercase : true,
        //default : 'joedoe@mail.com',
        validate(value) {  
            if(!validator.isEmail(value)) { 
                throw new Error('Invalid Email entered')
            }
            
        }

    },

    age : { 
        type : Number, 
        default : 99,
        validate(value) { 
            if (value < 0) { 
                throw new Error('invalid age entered')
            }
        }
    }, 
    password : {  
        type : String, 
        required : true,   
        trim : true,  
        minlength : 7,
        validate(value) { 
            // if (value.length <= 6) { 
            //     throw new Error('your password is too short!')
            // }  
            //else
             if (value.toLowerCase().includes('password')) { 
                throw new Error('Your password cannot contain the word password')
            } 
           
        }
    
    }, 
    tokens : [{ 
        token : { 
            type: String,
            required : true
        }
    }]
    
})      

//the below code doesnt work, find out why 

// userSchema.methods.toJSON = async function () {  
//     const user = this 
//     const userObject = user.toObject()
    
//     delete userObject.password 
//     delete userObject.tokens 

//     return userObject.name

// }

userSchema.methods.generateAuthToken = async function () { 
    const user = this 
    const token = jwt.sign({_id : user._id.toString()}, 'thisis')  
    user.tokens = user.tokens.concat({ token }) 
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login') 

    }
    return user 
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
}) 

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User









// userSchema.statics.findByCredentials = async (email, password) => { 
//     const user = await User.findOne({ email })  

//     if(!user) { 
//         throw new Error('Unable to login a')
//     }  

   
//     const isMatch = await bcrypt.compare(password, user.password)  
//     if(!isMatch) { 
//         throw new Error('Unable to login b')
//     } 

//     return user
// }


// userSchema.pre('save', async function (next) {  
//     const user = this  

//     if(user.isModified('password')) { 
//         user.password = await bcrypt.hash(user.password, 8) 
    
//     } 
    
//     next()

// })
 


// const User = mongoose.model('User', userSchema)
// module.exports = User
