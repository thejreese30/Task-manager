const sgMail = require('@sendgrid/mail')
 

sgMail.setApiKey(process.env.SENDGRID_API_KEY)  

const sendWelcomeEmail = (email, name) => {    
    sgMail.send({ 
        to : email, 
        from : 'jdreese3002@gmail.com',  
        subject : 'Thanks for joining!',
        text : `Welcome to the platform, ${name}`
    })  
const sendCancellationEmail = (email, name) => { 
    sgMail.send({ 
        to : email, 
        from : 'jdreese3002@gmail.com', 
        subject : 'We are sorry to hear you are leaving', 
        text : `${name}, we are sorry to hear you are leaving. Best wishes and please consider returning in the future.`
    })
}
    module.exports = { 
        sendWelcomeEmail, 
        sendCancellationEmail
    }

} 

