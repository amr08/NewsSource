  var express = require("express");
  var bodyParser = require("body-parser");
  var logger = require("morgan");
  var request = require("request");
  var cheerio = require("cheerio");
  var Note = require("./models/Note.js");
  var Article = require("./models/Article.js");
  var db = require("./db/db.js")
  var app = express();
  var PORT = process.env.PORT || 7777;
  
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

  app.listen(PORT, function(){
    console.log('App listening on PORT ' + PORT);
  })


