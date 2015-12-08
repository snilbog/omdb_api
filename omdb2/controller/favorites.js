var express = require('express');
var db = require('./../models');
var router = express.Router();

router.post('/', function(req, res) {
  db.favorite.findOrCreate({
    where: {
      imdbID: req.body.imdbID
    },
    defaults: {
      year: req.body.year,
      title: req.body.title
    }
  }).spread(function(favorite, created) {
    console.log(favorite.get());
    res.redirect('/');
  });
});

router.get('/', function(req, res) {
  db.favorite.findAll({
    order: 'title ASC'
  }).then(function(favorites) {
    res.render('favorites/index', {favorites: favorites});
  });
});

router.delete('/:imdbID', function(req, res) {
  db.favorite.destroy({
    where: {
      imdbID: req.params.imdbID
    }
  }).then(function() {
    res.send({'msg': 'success'});
  }).catch(function(e) {
    res.send({'msg': 'error', 'error': e});
  });
});





module.exports = router;
