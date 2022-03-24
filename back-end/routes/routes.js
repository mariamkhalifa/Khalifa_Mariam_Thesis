var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User.js');


// user auth routes
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	return res.redirect('/');
}

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Log In' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.get('/home', function(req, res, next) {
  res.send('logged in!');
});


router.post('/login', passport.authenticate('local'), function(req, res, next) {
	if(!req.user) {
		//res.redirect('/');
    res.send('failed');
	}
  //res.redirect('/home');
  res.send('sucess');
});

router.post('/register', function(req, res, next) {
	User.register(new User({
		username:req.body.username,
		email:req.body.email}),
		req.body.password,

		function(err, user) {
		if (err) {
			res.render('register',{title: 'Register',user:user});
		}
    //automatically logs in any new user
		passport.authenticate('local')(req, res, function() {
			res.redirect('/home');
		});
	});
});

router.get('/protected', isLoggedIn, function(req, res, next){
	console.log(req.user.username);
	res.render('protected',{title:'profile page', name:req.user.username});
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
