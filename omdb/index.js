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


app.get('/', function(req, res) {
  res.render('index');
});

app.get('/movies', function(req, res) {
  var query = req.query.q;

  debugger

  request('http://www.omdbapi.com/?s=' + query, function(err, response, body) {
    var data = JSON.parse(body);
    if (!err && response.statusCode === 200 && data.Search) {
      res.render('movies', {movies: data.Search,
                            q: query});
    } else {
      res.render('error');
    }
  });
});

app.get('/movies/:imdbID', function(req, res) {
  // res.send(req.params.imdbID);
  var searchQuery = req.query.q ? req.query.q : '';
  var imdbID = req.params.imdbID;
  request('http://www.omdbapi.com/?i=' + imdbID, function(err, response, body) {
    res.render('movieShow', {movie: JSON.parse(body),
                             q: searchQuery});
  });
});


app.listen(process.env.PORT || 5000)