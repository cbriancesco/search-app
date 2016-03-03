var mongoose = require('mongoose');
var twilio = require('twilio');

var accountSid = 'ACc6e7faf86ce49bc44bb758d4a0acc082'; 
var authToken = '8f46d6f137950246b705d59b884f0cb3';

module.exports.sendSms = function (req, res){
    var client = new twilio.RestClient(accountSid, authToken);
    // Pass in parameters to the REST API using an object literal notation. The
    // REST client will handle authentication and response serialzation for you.
    client.sms.messages.create({
        to: '+50672046325',//'+19713199671',
        from:'+19713199671',
        body:'ahoy hoy! Testing Twilio and node.js Caleb Rocks!'
    }, function(error, message) {
        // The HTTP request to Twilio will run asynchronously. This callback
        // function will be called when a response is received from Twilio
        // The "error" variable will contain error information, if any.
        // If the request was successful, this value will be "falsy"
        if (!error) {
            // The second argument to the callback will contain the information
            // sent back by Twilio for the request. In this case, it is the
            // information about the text messsage you just sent:
            console.log('Success! The SID for this SMS message is:');
            console.log(message.sid);
     
            console.log('Message sent on:');
            console.log(message.dateCreated);
        } else {
            console.log('Oops! There was an error.');
        }
    });

}










