var mongoose = require("mongoose");

var questionSchema = mongoose.Schema({
  homeworkId: {type: String, required: true},
  question: {type: String, required: true},
  answer: {type: String, required: true}
});

var Questions = mongoose.model("Questions", questionSchema);

module.exports = Questions;
