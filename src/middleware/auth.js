const jwt = require('jsonwebtoken') 
const User = require('../models/users')

const auth = async (req, res, next) => {  
    try {  
        const token = req.header('Authorization').replace('Bearer ', '') 
        const decoded = jwt.verify(token, 'thisis') 
        const user = await User.findOne({_id : decoded._id, 'tokens.token' : token}) 

        if(!user) { 
            throw new Error()
        } 
        req.user = user 
        req.token = token
        next() 
    } catch (e) { 
        res.status(401).send('Please authenticate/Log in ' + e)
    }
   
} 
 
module.exports = auth