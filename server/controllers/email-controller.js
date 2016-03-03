var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
//var emailTemplates = require('../../app/emails');

var transporter = nodemailer.createTransport(smtpTransport({
    host: 'smtp.gmail.com',
    secureConnection: true,
    port: 465,
    auth: {
        user: "prodigious.cr04@gmail.com",
        pass: "tresde44"
    }
}));

var mainFrom = '"Prodigious" <prodigious.cr04@gmail.com>';
var out = 'http://10.66.22.80:4000';
var local = 'http://localhost:4000';

module.exports.sendEmail = function(req, res){
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: mainFrom, // sender address
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


//{id: info._id, subject: 'Please Verify your email', email: info.email, name: info.name};

module.exports.verifyEmail = function(req, res){
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: mainFrom, // sender address
        to: req.body.email,
        subject: req.body.subject, // Subject line
        createTextFromHtml: true,
        html: '<h2>'+ req.body.subject +'</h2>'+
        '<p>Hi ' + req.body.name + ' please verify your email by clicking <a href="'+ out +'/#/verify?'+ req.body.id +'">this link</a></p>'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        
        console.log('Message sent: ' + info.response);
        res.json('Message sent');
    });
}

