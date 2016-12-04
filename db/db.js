  var mongoose = require("mongoose");
  var Promise = require("bluebird");

  mongoose.connect("mongodb://localhost/realNews");
  var db = mongoose.connection;
  db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
  });
  db.once("open", function() {
    console.log("Mongoose connection successful.");
  });

  module.exports = db;