
var mongoose = require('mongoose');

var LessonSchema = new mongoose.Schema({
  unit: Number,
  name: String,
  video: String,
  completed: { type: Boolean, default: false }

});

module.exports = mongoose.model('Lesson', LessonSchema);