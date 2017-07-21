const express = require('express');
const path = require('path');
const request = require('request');
const app = express();
const imageSearch = require('node-google-image-search');
const axios = require("axios");
const mongoose = require('mongoose');
const Latest = mongoose.model('Latest', new mongoose.Schema({ name: { type: String, lowercase: true }, time: { type: Number } }));

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.render('index', {});
});

app.post("/api/v1/imagesearch/:query", (req, res) => {
  Latest.count({}, function(err, count){
    let findtho;
    Latest.find( {
      time: { $lt: new Date().getTime() }
    }, function(err, found) {
    }).sort('-time').exec (function (err, time) {
      if(count >= 10) {
        Latest.remove({ _id: time[time.length-1]._id }, function(err, data) {
        });
      }
    });
    const latest = (new Latest({name: req.params.query, time: new Date().getTime()})).save();
    });
  send_this(req, res);
});

function send_this(req, res) {
  let datares;
  axios({
      method: 'get',
      url: 'https://api.imgur.com/3/gallery/search?q=' + req.params.query,
      headers: { 'authorization': 'Client-ID ' + process.env.IMGUR_CLIENT_ID }
  }).then(function(response) {
    datares = response.data.data.map( it => {
      let file;
      if(it.type) {
        file = (it.type).split('/');
        file = file[file.length - 1];
        it.type = file;
      }
      changeToIcon(it, it.type);
      return {link: it.link, type: it.type, searchTerm: req.params.query};
    });
    
    function changeToIcon(it, file) {
      switch(file) {
          case 'jpeg':
            it.type='.jpg';
            break;
          case 'png':
            it.type='.png';
            break;
          case 'gif':
            it.type='.gif';
            break;
          default:
            it.type='.jpg';
            break;
        }
      }
    res.json(datares);
  }).catch(function(error) {
      console.log(error);
  });
}


//////////
// API ///
//////////
app.get("/api/v1/latest", function (request, response) {
  
  Latest.find( {
      time: { $lt: new Date().getTime() }
    }, function(err, found) {
      response.json(found.map( it => {return {name: it.name, time: it.time}}));
    })
});

//////////////////////////////////////////////
///////// Catch everything else //////////////
//////////////////////////////////////////////
app.get("*", function (request, response) {
  response.render('index', {});
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
