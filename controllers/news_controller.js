  var express = require("express");
  var router = express.Router();
  var request = require("request");
  var cheerio = require("cheerio");
  var db = require("../db/db.js")
  var News = require("../models/News.js");

//scrape
  router.get("/", function (req, res) {
     request("http://www.bbc.com/news/world/us_and_canada", function(error, response, html) {
      var $ = cheerio.load(html);
      $(".title-link__title").each(function(i, element) {
        var result = {};
        var link = $(this).parent("a").attr("href");
        result.title = $(this).children().text();
        result.link = "https://www.bbc.com" + link;
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
      res.redirect("/bbc");
    });
  });

//landing page with db
  router.get("/bbc", function(req, res) {
    News.find({}, function(error, doc) {
      var hasObject = {News: doc};
      if (error) {
        console.log(error);
      } else {
        res.render("index", hasObject);
        console.log(doc)
      }
    });
  });


    
  module.exports = router;
