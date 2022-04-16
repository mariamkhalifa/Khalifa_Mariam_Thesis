
var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
  quiz: Number,
  question: String,
  img: String,
  answer: String
});

module.exports = mongoose.model('Question', QuestionSchema);