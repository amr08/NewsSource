  var express = require("express");
  var bodyParser = require("body-parser");
  var logger = require("morgan");
  var Note = require("./models/Note.js");
  var Article = require("./models/Article.js");
  var db = require("./db/db.js")
  var request = require("request");
  var cheerio = require("cheerio");
  var app = express();

  app.use(logger("dev"));
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(express.static("public"));

//handlebars
  var exphbs = require('express-handlebars');
  app.engine('handlebars', exphbs({
    defaultLayout: 'main'
  }));
  app.set('view engine', 'handlebars');

//routes
  var routes = require('./controllers/news_controller.js');
  app.use('/', routes);

  app.listen(3333, function() {
    console.log("App running on port 3333!");
  });



