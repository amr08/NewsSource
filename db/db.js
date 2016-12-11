
  var mongoose = require("mongoose");
  var Promise = require("bluebird");

  mongoose.Promise = Promise;

  var databaseUri = "mongodb://heroku_h1ttmm5z:bg69nfsalu9s08df3u6h8pcfeo@ds115738.mlab.com:15738/heroku_h1ttmm5z";

  if(process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
  } else {
    mongoose.connect(databaseUri);
  }
  
  var db = mongoose.connection;

  db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
  });

  db.once("open", function() {
    console.log("Mongoose connection successful.");
  });

  module.exports = db