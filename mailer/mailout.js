var nodemailer = require('nodemailer');

var transport = nodemailer.createTransport('SMTP', {
    host: 'smtp.gmail.com',
    secureConnection: true,
    port: 465,
    auth: {
        user: "jcaleb4@gmail.com",
        pass: "tresde44"
    }
});


var msg = {
    transport: transport,
    text:    "Hello! This is your newsletter, :D",
    from:    "Caleb Briancesco <jcaleb4@hotmail.com>",
    subject: "Your Newsletter"
};


var maillist = [
    'Mr One <calebbriancesco@hotmail.com>',
    'Mr Two <mailtest2@mailinator.com>',
    'Mr Three <mailtest3@mailinator.com>',
    'Mr Four <mailtest4@mailinator.com>',
    'Mr Five <mailtest5@mailinator.com>'
];


maillist.forEach(function (to, i) {
    msg.to = to;

    nodemailer.sendMail(msg, function (err) {
        if (err) { 
            console.log('Sending to ' + to + ' failed: ' + err);
            return;
        }

        console.log('Sent to ' + to);

        if (i === maillist.length - 1) { msg.transport.close(); }
    });
});


























var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"Fred Foo" <foo@blurdybloop.com>', // sender address
    to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
    subject: 'Hello', // Subject line
    text: 'Hello world', // plaintext body
    html: '<b>Hello world</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});