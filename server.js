'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
var bodyParser = require('body-parser');
const dns = require('dns');

var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.MONGOLAB_URI);
mongoose.connect(process.env.MONGO_URI);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  const Schema = mongoose.Schema;

  const urlSchema = new Schema({
    original:{type:String,required:true},
  }); 

urlSchema.plugin(AutoIncrement, {inc_field: 'id'});
const URLLong = mongoose.model("URLLong", urlSchema);
  
app.post('/api/shorturl/new', (req,res) => {
  const url = req.body.url;
  const re = (/^(?:https?:\/\/)?(?:www\.)?/i);
  const urlRemoved = req.body.url.replace(re, ''); 
  
  console.log(urlRemoved);
  dns.lookup(urlRemoved, (err, address) => {
      if(err) { 
        console.log(err.code, address);
        res.json({"error":"invalid URL"});
      } else {        
        URLLong.create({ original: url }, function (err, data) {
          if (err) {
            console.log(err)
            res.json({"error":err.code});
          }else {
            res.json({"original_url":url, "short_url":data.id });
          }

        });
      }; 
  	});
});       

app.get('/api/shorturl/', (req,res) => {
    res.sendFile(__dirname + "/views/index.html");
});
        
app.listen(port, function () {
  console.log('Node.js listening ...');
});