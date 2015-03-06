var net = require('net');
var nodemailer = require('nodemailer');
var email = require('./emailConf');
var config = require('./config');

config.forEach(function(section){    
    setInterval(function(){ping(section);}, section.interval || 15000);     
    ping(section);    
});


function ping(confSection){
    
    var host = confSection.host;
    var port = confSection.port;
    var timeout = confSection.timeout || 2000;
    var notifyEmail = confSection.notifyEmail;
    
    var s = new net.Socket();
    
    var onError = function(e){
        console.log(e);
        console.log("HOST IS DOWN");
        console.log(new Date() + 'HOST IS DOWN: ' + host + ':' + port);
        if(notifyEmail){
            sendEmail("HOST IS DOWN: " + host + ':' + port, e, [notifyEmail]);
        }        
        s.destroy();
    };

    s.setTimeout(timeout, onError);
    s.on('error', onError);
    s.on('data', function(data) {
        console.log(data);
        s.destroy();
    });
    s.connect(port, host, function() {
        console.log(new Date() + 'OPEN: ' + host + ':' + port);
        s.destroy();
    });
};


function sendEmail(subj, msg, receivers){
    var transporter = nodemailer.createTransport({
        service: email.service,
        auth: {
            user: email.auth.user,
            pass: email.auth.pass
        }
    });
    var mailOptions = {
        from: email.From, // sender address
        to: receivers.join(','),// list of receivers
        subject: subj, // Subject line
        text: msg, // plaintext body
        html: msg // html body
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
        }
    });
}