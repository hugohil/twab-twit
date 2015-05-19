var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var Twit = require('twit');
var global = require('./config');

var T = new Twit({
  consumer_key: global.config.consumer_key,
  consumer_secret: global.config.consumer_secret,
  access_token: global.config.access_token,
  access_token_secret: global.config.access_token_secret
})

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/update', function (req, res){
  res.header("Access-Control-Allow-Origin", "*");
  var avoidDuplicatesPool = ['Hehe, ', 'Hello, ', 'Hi, ', 'Hi there, ', 'Waouh! ', 'Awesome! ', 'No way! ', 'Boom! ', 'Bim! ', 'Bang! '];
  var avoidDuplicates = avoidDuplicatesPool[Math.floor(Math.random() * avoidDuplicatesPool.length)];
  var statusText = avoidDuplicates + req.body.twitterHandle + ' just twabbed something! ' + req.body.twabURL;
  console.log(statusText.length, 'characters');
  console.log(statusText);
  T.post('statuses/update', { status: statusText }, function (err, data, response) {
    if(err){
      console.log(err);
      res.send(err);
    } else {
      console.log('OK\n');
      res.send('OK\n');
    }
  });
});

app.listen(4242);
