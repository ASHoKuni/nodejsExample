const nodeemail = require('nodemailer');


const sendEmail = async (req, res, next) => {
    let transporter = nodeemail.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: 'eqhyc6mqxp3t2vn2@ethereal.email',
                pass: 'NJNhBExVRV8gbmKctY'
            }
        });
    
        // Message object
    let message = {
        from: 'eqhyc6mqxp3t2vn2@ethereal.email',
        to: 'sqeyxcoiw33mkmv4@ethereal.email',
        subject: 'Nodemailer is unicode friendly ✔',
        text: 'Hello to myself!',
        html: '<p><b>Hello</b> to nodemailer!</p>'
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



}

module.exports = { sendEmail}



// nodeemail.createTestAccount((err,account) =>{
//     if(err){
//         console.log('error creating account .. ');
//         return process.exit(1);
//     }

//     console.log(account);

    // let transporter = nodeemail.createTransport({
    //     host: 'smtp.ethereal.email',
    //     port: 587,
    //     secure: false,
    //     auth: {
    //         user: 'eqhyc6mqxp3t2vn2@ethereal.email',
    //         pass: 'NJNhBExVRV8gbmKctY'
    //     }
    // });

    // // Message object
    // let message = {
    //     from: 'eqhyc6mqxp3t2vn2@ethereal.email',
    //     to: 'sqeyxcoiw33mkmv4@ethereal.email',
    //     subject: 'Nodemailer is unicode friendly ✔',
    //     text: 'Hello to myself!',
    //     html: '<p><b>Hello</b> to nodemailer!</p>'
    // };

    // transporter.sendMail(message, (err, info) => {
    //     if (err) {
    //         console.log('Error occurred. ' + err.message);
    //         return process.exit(1);
    //     }

    //     console.log('Message sent: %s', info.messageId);
    //     // Preview only available when sending through an Ethereal account
    //     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // });



// });


