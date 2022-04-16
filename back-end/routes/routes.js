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
    // raw user input from form
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    //check for an existing user with this username before creating a new one
    var oldUser = await User.findOne({ username });
    if (oldUser) {
      return res.send('User Already Exists. Please Login instead.');
    }

//If there is no existing user with that username:

    //Encrypt the plain-text password
    encryptedPassword = await bcrypt.hash(password, 10);

     // Create a new user in database
     const user = await User.create({
      username,
      email,
      password: encryptedPassword, //no plain-text password saved
    });

    // Create signed token
    var token = jwt.sign(
      { user_id: user._id, username },
      'WoolyHamFingers',
      {
        expiresIn: '2h',
      }
    );
    // save user token to user object in memory
    user.token = token;

    // return new user as JSON
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }

});

router.post("/login", async function(req, res, next) {
  try {
    // raw user input from login form
    var username = req.body.username;
    var password = req.body.password;

    // Validate that both username and password are provided
    if (!(username && password)) {
      res.status(400).send('Username and password both required.');
    }
    // return the user from the local database
    var user = await User.findOne({ username });

    //bcrypt encrypts the raw password from login and compares the hashed version
    //with the one saved in the database
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      var token = jwt.sign(
        { user_id: user._id, username },
        'WoolyHamFingers',
        {
          expiresIn: '2h',
        }
      );

      // save user token
      user.token = token;

      // return the user as JSON
      res.status(200).json(user);
    }
    //res.status(400).send("Invalid Credentials");
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

// user routes
router.get('/user/:username', function(req, res, next) {
  User.findOne({ username : req.params.username }, function (err, user) {
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
