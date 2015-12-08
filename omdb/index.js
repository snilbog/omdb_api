var express = require('express');
var	ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var app = express();

//controllers
var indexPage = require('./controller/index.js');
var resultsPage = require('./controller/results.js');
var moviePage = require('./controller/movie.js');


app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static(__dirname + '/views'));


//use controllers
app.use('/', indexPage);
app.use('/results', resultsPage);
app.use('/movie', moviePage);


// app.use('/', indexPage);


app.listen(process.env.PORT || 3000)



