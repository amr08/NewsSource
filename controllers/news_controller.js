  var express = require("express");
  var router = express.Router();
  var request = require("request");
  var cheerio = require("cheerio");
  var db = require("../db/db.js")
  var News = require("../models/News.js");

//redirect to scrape
  router.get("/", function (req, res) {
    res.redirect("/all");
  });

//scraping db
  router.get("/all", function(req, res) {
    request("http://www.bbc.com/news/world/us_and_canada", function(error, response, html) {
      var $ = cheerio.load(html);
      $(".faux-block-link__overlay-link").each(function(i, element) {
        var result = {};
        result.title = element.children[0].data;
        result.link = "www.bbc.com" + element.attribs.href;
        // console.log(result.title)
        // console.log(result.link)
        var entry = new News(result);
        entry.save(function(err, doc) {
          if (err) {
            console.log(err);
          } else {
            // console.log(doc);
          }
        });
      });
    });
    res.redirect("/bbc");
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
