var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NewsSchema = new Schema({

  title: {
    type: String,
    required: true
  },

  link: {
    type: String,
    required: true
  }

  // note: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Note"
  // }
});

var News = mongoose.model("News", NewsSchema);

// Finally, we export the module, allowing server.js to hook into it with a require statement
module.exports = News;