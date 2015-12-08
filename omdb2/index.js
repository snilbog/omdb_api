var express = require('express');
var	ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var app = express();
var bodyParser = require('body-parser');


//controllers
app.use('/movies', require('./controllers/movie'));
app.use('/favorites', require('./controllers/favorite'));


app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', function(req, res) {
  res.render('index');
});

//debugger

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


app.listen(process.env.PORT || 5000)