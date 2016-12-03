  var express = require('express');
  var router = express.Router();
  var request = require("request");
  var cheerio = require("cheerio");
  var mongojs = require("mongojs");
 
  // var Burgers = require('../models')["Burgers"];

var databaseUrl = "newsSourcedb";
var collections = ["news"];

// Hook mongojs config to db variable
var db = mongojs(databaseUrl, collections);
// Log any mongojs errors to console
db.on("error", function(error) {
  console.log("Database Error:", error);
});


  router.get('/', function (req, res) {
    res.redirect('/news');
  });


  router.get('/news', function (req, res) {
    
  
        res.render('index');
      
  });


 router.get("/all", function(req, res) {
  // Find all results from the scrapedData collection in the db
  db.news.find({}, function(error, found) {
    // Throw any errors to the console
    if (error) {
      console.log(error);
    }
    // If there are no errors, send the data to the browser as a json
    else {
      res.json(found);
    }
  });
});



 router.get("/scrape", function(req, res) {
  // Make a request for the news section of ycombinator
  request("http://www.bbc.com/news/world/us_and_canada", function(error, response, html) {
    // Load the html body from request into cheerio
    var $ = cheerio.load(html);
    // For each element with a "title" class


    $(".faux-block-link__overlay-link").each(function(i, element) {

      var title = element.children[0].data
      var link = "www.bbc.com" + element.attribs.href
  
      console.log(title)
      console.log(link)

      // If this title element had both a title and a link
      // if (title && link) {
      //   // Save the data in the scrapedData db
      //   db.news.save({
      //     title: title,
      //     link: link
      //   },
      //   function(error, saved) {
      //     // If there's an error during this query
      //     if (error) {
      //       // Log the error
      //       console.log(error);
      //     }
      //     // Otherwise,
      //     else {
      //       // Log the saved data
      //       console.log(saved);
          // }
      //   });
      // }
    });
  });

  // This will send a "Scrape Complete" message to the browser
  res.send("Scrape Complete");
});

  // router.post("/burgers/create", function(req,res) {

  // });

    
  module.exports = router;
