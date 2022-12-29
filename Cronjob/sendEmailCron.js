const nodeCron = require("node-cron");
const nodeemail = require('nodemailer');

const sendEmail = require('../email/email.js');

// Schedule a job to run every two minutes

const sendEmailCron = async (req,res,next) => {
    console.log('coming...',8);
    try{
        const job = nodeCron.schedule("*/1 * * * *",() => {
            console.log(new Date().toLocaleString());
           
            try{

               // sendEmail.sendEmail;
                let transporter = nodeemail.createTransport({
                    host: 'smtp.ethereal.email',
                    port: 587,
                    secure: false,
                    auth: {
                        user: 'eqhyc6mqxp3t2vn2@ethereal.email',
                        pass: 'NJNhBExVRV8gbmKctY'
                    }
                });

                transporter.use
            
                // // Message object
                let message = {
                    from: 'eqhyc6mqxp3t2vn2@ethereal.email',
                    to: 'sqeyxcoiw33mkmv4@ethereal.email',
                    subject: 'Nodemailer is unicode friendly ✔',
                    text: 'Hello to myself!',
                    html: '<p><b>Hello</b> to Welcome !</p>'
                };
            
                transporter.sendMail(message, (err, info) => {
                    if (err) {
                        console.log('Error occurred. ' + err.message);
                        return process.exit(1);
                    }
            
                    console.log('Message sent: %s', info.messageId);
                    // Preview only available when sending through an Ethereal account
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                });
                return res.status(200).send({message:"Email send "})
            }catch{
                res.status(400).send("ERRor")
            }
            // call send email function
          } );
    }catch(error){
        return res.status(500).send({messges:"Something went to wrong"});
    }
}




  module.exports = {
    sendEmailCron
  }

