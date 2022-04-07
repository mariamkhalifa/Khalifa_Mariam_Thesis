var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User.js');
var Lesson = require('../models/Lesson.js');


// user auth routes
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	return res.send('failed');
}

router.post('/login', passport.authenticate('local'), function(req, res, next) {
	if(!req.user) {
    res.send('failed')
	}
  res.json(req.user.username);
});

router.post('/register', function(req, res, next) {
  console.log(req.body.username);
	User.register(new User({
		username:req.body.username,
		email:req.body.email}),
		req.body.password,

		function(err, user) {
		if (err) {
			res.send('Failed')
		}
    //automatically logs in any new user
		passport.authenticate('local')(req, res, function() {
			res.json(res.username);
		});
	});
});


router.get('/protected', isLoggedIn, function(req, res, next){
	//console.log(req.user.username);
	res.json(req.user.username);
});

router.post('/logout', function(req, res){
  req.logout();
  res.send('success');
});

// lesson api routes
router.get('/api/lessons', function(req, res, next) {
  Lesson.find(function (err, lessons) {
    if (err) return next(err);
	res.json(lessons);
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
