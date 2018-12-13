'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const dns = require('dns');

var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.MONGOLAB_URI);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
app.post('/api/shorturl/new', (req,res) => {
  const url = req.body.url;
  
  const re = ^https?://
  const urlRemoved = url. 
  
  
  console.log(url);
  dns.lookup("freecodecamp.com", (err, address) => {
      if(err) { 
        console.log(err.code, address);
        res.json({"error":"invalid URL"});
      } else {
        res.json({'url': url})
      }; 
  });
});       



app.listen(port, function () {
  console.log('Node.js listening ...');
});