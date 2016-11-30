  var express = require("express");
  var bodyParser = require('body-parser');
  // var methodOverride = require('method-override');

//setting up express and page
  var app = express();
  var PORT = process.env.PORT || 7000;

  app.use(express.static(process.cwd() + '/public'));

  app.use(bodyParser.urlencoded({
    extended: false
  }));

  // app.use(methodOverride('_method'));
  var exphbs = require('express-handlebars');

  app.engine('handlebars', exphbs({
    defaultLayout: 'main'
  }));

  app.set('view engine', 'handlebars');



  var routes = require('./controllers/news_controller.js');
  app.use('/', routes);


  //port listen
  app.listen(PORT, function(){
    console.log('App listening on PORT ' + PORT);
  })