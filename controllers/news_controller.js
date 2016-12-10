  var express = require("express");
  var router = express.Router();
  var request = require("request");
  var cheerio = require("cheerio");
  var db = require("../db/db.js")
  var Article = require("../models/Article.js");
  var Note = require("../models/Note.js");
    
  router.get("/", function(req, res) {
        request("http://www.bbc.com/news/world/us_and_canada", function(error, response, html) {
        var $ = cheerio.load(html);
        $(".title-link__title").each(function(i, element) {
          var result = {};
          var link = $(this).parent("a").attr("href");
          result.title = $(this).children().text();
          result.link = "https://www.bbc.com" + link;
     
          var entry = new Article(result);
          entry.save(function(err, doc) {
            if (err) {
              console.log(err);
            } else {
              // console.log(doc);
            }
          });
        });
        res.redirect("/articles");
      });
  });

  router.get("/articles", function(req, res) {
    Article.find({})
    .populate("note")
    .exec(function(error, article) {
      if (error) {
        console.log(error);
      } else {
        // console.log(article)
       
        res.render("index", {Article: article});
    
      }
    });
  });

  router.get("/articles/:id", function(req, res) {
    Article.findOne({ "_id": req.params.id })
    .populate("note")
    .exec(function(error, doc) {
      if (error) {
        console.log(error);
      } else {
        // res.json(doc);
      }
    });
  });

  router.post("/articles/:id", function(req, res) {
    var newNote = new Note(req.body);
    newNote.save(function(error, doc) {
      if (error) {
        console.log(error);
      } else {
        Article.findOneAndUpdate({ "_id": req.params.id }, { "note": doc._id })
        .exec(function(err, doc) {
          if (err) {
            console.log(err);
          }
          else {
             res.redirect("/articles");
            // res.json(doc);


          }
        });
      }
    });
  });

  router.get('/delete/:id', function(req, res) {
    Article.deleteOne({"_id": req.params.id})
      .exec(function(err, doc) {
       if (error) {
      console.log(error);
      res.send(error);
      } else {
        console.log(removed);
        res.send(removed);
        res.redirect('/burgers');
      }
    });
  });

  module.exports = router;
