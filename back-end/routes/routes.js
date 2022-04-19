var express = require('express');
var router = express.Router();
var passport = require('passport');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var auth = require('../middleware/auth.js');
var User = require('../models/User.js');
var Lesson = require('../models/Lesson.js');
var Question = require('../models/Question.js');


// user auth routes

router.post('/register', async function(req, res, next) {
  try {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    var oldUser = await User.findOne({ username });
    if (oldUser) {
      return res.send('User Already Exists. Please Login instead.');
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: encryptedPassword, 
    });

    var token = jwt.sign(
      { user_id: user._id, username },
      'WoolyHamFingers',
      {
        expiresIn: '2h',
      }
    );

    user.token = token;

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async function(req, res, next) {
  try {
    var username = req.body.username;
    var password = req.body.password;

    if (!(username && password)) {
      res.status(400).send('Username and password both required.');
    }
    
    var user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      
      var token = jwt.sign(
        { user_id: user._id, username },
        'WoolyHamFingers',
        {
          expiresIn: '2h',
        }
      );

      user.token = token;

      res.status(200).json(user);
    }
  } catch (err) {
    console.log(err);
  }
});


// lesson api routes
router.get('/api/lessons', function(req, res, next) {
  Lesson.find(function (err, lessons) {
    if (err) return next(err);
	res.json(lessons);
  });
});

router.post('/api/lessons/:id/completed', function(req, res, next) {
  Lesson.findByIdAndUpdate(req.params.id, { completed: true } , function (err, post) {
    if (err) return next(err);
  res.json(post);
  });
});

// user routes
router.get('/user/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, user) {
     if (err) return next(err);
    res.json(user);
   });
 });

router.post('/user/:id/lesson-end', function(req, res, next) {
  User.findOneAndUpdate(
    req.params.id, { 
      $addToSet: { completed: req.body.finishedLesson }, 
      $push: { totalPoints: 5 },
    }, 
    function (err, post) {
      if (err) return next(err);
      res.json(post);
  });
});

router.post('/user/:id/quiz-passed', function(req, res, next) {
  User.findOneAndUpdate(
    req.params.id, { 
      $addToSet: { quizesPassed: req.body.quizName }, 
      $push: { totalPoints: 5 },
    }, 
    function (err, post) {
      if (err) return next(err);
      res.json(post);
  });
});

router.post('/user/:id/avatar', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, { avatar: req.body.avatar }, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.post('/user/:id/level-up', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, { level: req.body.level, totalPoints: 0 }, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// quiz routes
router.get('/api/quizes/:number', function(req, res, next) {
  Question.find({ 'quiz' : req.params.number }, function (err, questions) {
    if (err) return next(err);
	res.json(questions);
  });
});

// student api routes
router.get('/api/students', function(req, res, next) {
  Student.find(function (err, students) {
    if (err) return next(err);
	res.json(students);
  });
});

router.get('/api/student/:id', function(req, res, next) {
 Student.findById(req.params.id, function (err, student) {
    if (err) return next(err);
   res.json(student);
  });
});

router.post('/', function(req, res, next) {
  Student.create('sample', function (err, post) {
    if (err) return next(err);
    //res.json(post);
  });
});

router.put('/:id', function(req, res, next) {
  Student.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', function(req, res, next) {
  Student.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
