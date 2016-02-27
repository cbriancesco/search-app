var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
//var emailTemplates = require('../../app/emails');


module.exports.sendEmail = function(req, res){

    var transporter = nodemailer.createTransport(smtpTransport({
        host: 'smtp.gmail.com',
        secureConnection: true,
        port: 465,
        auth: {
            user: "wolfate04@gmail.com",
            pass: "tresde44"
        }
    }));

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"Wolfate" <wolfate04@gmail.com>', // sender address
        subject: req.body.subject, // Subject line
        createTextFromHtml: true,
        html: '<h2>'+ req.body.subject +'</h2><b>Hello world this is awesome email</b> <a href="http://localhost:4000/"> try this link</a>' // html body
    };

    var maillist = req.body.maillist;

    for(var i = 0, max = maillist.length; i < max; i += 1){
        mailOptions.to = maillist[i];

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            
            console.log('Message sent: ' + info.response);
        });
    }

    res.json('Message sent');
}

