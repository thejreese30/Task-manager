const express = require('express')  
require('./db/mongoose')   
const userRouter = require('./routers/user') 
const taskRouter = require('./routers/task') 
const jwt = require('jsonwebtoken')

const app = express() 
const port = process.env.PORT 





// app.use((req, res, next) => { 
//         res.status(503).send('The site is currently under maintenance please visit again soon')
// })

app.use(express.json())  
app.use(userRouter) 
app.use(taskRouter)
 
 

app.listen (port, () => { 
    console.log('Server is running on port ' + port)
}) 


