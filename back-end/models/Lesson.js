
var mongoose = require('mongoose');

var LessonSchema = new mongoose.Schema({
  unit: Number,
  name: String,
  video: String
});

module.exports = mongoose.model('Lesson', LessonSchema);