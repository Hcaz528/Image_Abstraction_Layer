// NOTE TO SELF:
// USE mongo to save short urls
// probably use mongoose to set up schemas and stuff
// use mlab for storage
// get specific link by calling the req.params
// use res redirect

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes/index');
const app = express();

// app.use(require('stylus').middleware(__dirname + '/public'));

// view engine setup
app.set('views', path.join(__dirname, 'views')); // this is the folder where we keep our pug files
app.set('view engine', 'pug'); // we use the engine pug, mustache or EJS work great too

app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
// app.get("/", function (request, response) {
//   response.sendFile(__dirname + '/views/index.html');
// });
app.use('/', routes);

module.exports = app;
