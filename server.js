var express = require('express');
var bodyParser = require('body-parser');
var twilio = require('twilio')('ACd124e8119e3d558c8dceb3ec0678f7af', '5ec59511a035303d0288cb8463e43f6f');
var moment = require('moment');

var Firebase = require("firebase");

var ref = new Firebase("https://textsupport.firebaseio.com/numbers");

var app = express();
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());

ref.on('child_added', function(data) {
  console.log("new child!", data.val());
});

app.post('/support/messages', function(req, res) {
  var message = {
    to: req.body.to,
    from: '8016236746',
    body: req.body.message,
    date_sent: moment().format('ddd, D MMM YYYY HH:mm:ss ZZ'),
    is_support: true
  };
  twilio.sendMessage(message, function(err, data) {
    if (!err) {
      ref.child('/'+req.body.to).push(message);
      return res.status(200).end();
    }
  });
});

app.get('/support/resources/:resource_name', function(req, res) {
  console.log(req.param('resource_name'));
  switch(req.param('resource_name')) {
    case "terms-and-conditions":
      res.sendFile(__dirname+'/public/FakeTermsandConditions.pdf');
    break;
    case "cease-and-desist":
      res.sendFile(__dirname+'/public/FakeCeaseandDesist.pdf');
    break;
    case "helpful-infographic":
      console.log("send");
      res.sendFile(__dirname+'/public/helpful-infographic.jpg');
    break;
    default:
      res.sendFile(__dirname+'/public/404.html');
    break;
  }
});

app.listen(1220);
