var express = require('express');
var router = express.Router();
var request = require('request');


router.get('/:imdbID', function(req, res) {
  //res.send(req.params.imdbID);
  var searchQuery = req.query.q ? req.query.q : '';
  var imdbID = req.params.imdbID;
  request('http://www.omdbapi.com/?i=' + imdbID, function(err, response, body) {
    res.render('movieShow', {movie: JSON.parse(body), q: searchQuery});
  });
});

module.exports = router;