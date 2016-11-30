  var express = require('express');
  var router = express.Router();
  // var Burgers = require('../models')["Burgers"];


  router.get('/', function (req, res) {
    res.redirect('/news');
  });


  router.get('/news', function (req, res) {
    
  
        res.render('index');
      
  });


  router.post("/burgers/create", function(req,res) {

  });

    
  module.exports = router;
