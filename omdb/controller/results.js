var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res) {
  var query = req.query.q;
  	request('http://www.omdbapi.com/?s=' + query, function(err, response, body) {
  var data = JSON.parse(body);
    if (!err && response.statusCode === 200 && data.Search) {
      res.render('movies', {movies: data.Search, q: query});
    } else {
      res.render('noMovie');
    }
  });
});


module.exports = router;
