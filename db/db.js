
  var mongoose = require("mongoose");
  var Promise = require("bluebird");

  mongoose.Promise = Promise;

  mongoose.connect("mongodb://localhost/NewsSource");
  var db = mongoose.connection;

  db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
  });

  db.once("open", function() {
    console.log("Mongoose connection successful.");
  });

  module.exports = db