  var express = require('express');
  var router = express.Router();
  var request = require("request");
  var cheerio = require("cheerio");
  var mongoose = require("mongoose");
 
  // var Burgers = require('../models')["Burgers"];

  var News = require("../models/News.js");

  mongoose.connect("mongodb://localhost/realNews");

  var db = mongoose.connection;

  // If there's a mongoose error, log it to console
  db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
  });

  db.once("open", function() {
    console.log("Mongoose connection successful.");
  });

  router.get('/', function (req, res) {
    res.redirect("/all");
  });

  router.get("/bbc", function(req, res) {
    // res.send('index')

    News.find({}, function(error, doc) {
      if (error) {
        console.log(error);
      } else {
        res.json(doc);
      }
    });
  });

  router.get("/all", function(req, res) {
    request("http://www.bbc.com/news/world/us_and_canada", function(error, response, html) {
      var $ = cheerio.load(html);

      $(".faux-block-link__overlay-link").each(function(i, element) {

        var result = {};

        result.title = element.children[0].data;
        result.link = "www.bbc.com" + element.attribs.href;

        console.log(result.title)
        console.log(result.link)

        var entry = new News(result);

        entry.save(function(err, doc) {
          if (err) {
            console.log(err);
          } else {
            console.log(doc);
          }
        });
      });
    });
   // res.redirect("/bbc");
    // res.render('index');
  
});

    
  module.exports = router;
