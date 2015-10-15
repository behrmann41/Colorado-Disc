var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/disc-courses');
var discCourses = db.get('courses');
var Users = db.get('users')
var bcrypt = require('bcrypt')

/* GET home page. */
router.get('/', function (req, res, next) {
  var username = req.session.user
  res.render('courses/profile', { title: 'Colorado Disc', user: username });
});

router.post('/', function (req, res, next) {
  var reg = new RegExp(req.body.coursesearch, "i")
  discCourses.find({name: reg}, function(err, data) {
    res.render('courses/profile', { updatePage: true,
                                    courseSearch: data
                                  })
  })
})

router.get('/register', function (req, res, next){
  res.render('users/register', {  title: 'Create a new profile'})
})

router.post('/register', function (req, res, next){
  var errors = []
  var hash = bcrypt.hashSync(req.body.password, 10)
  if (!req.body.username.trim()){
    errors.push('Please enter a username')
  }
  if (!req.body.email.trim()){
    errors.push('Please enter an email')
  }
  if (!req.body.email.match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i)){
    errors.push("Invalid Email")
  }
  if (!req.body.password.trim()){
    errors.push('Please enter a password')
  }
  if (req.body.password !== req.body.pwconfirm){
    errors.push('Passwords do not match')
  }
  if (req.body.password.length < 8){
    errors.push('Password needs to be at least 8 characters')
  }
  if (errors.length){
    res.render('users/register', {  title: 'Create a new profile', errors: errors})
  } else {
    Users.find({email: req.body.email}, function (err, user){
      if (user.length > 0){
        errors.push('Email already in use')
        res.render('users/register', {  title: 'Create a new profile', errors: errors})
      } else {
        Users.insert({  username: req.body.username,
                        email: req.body.email,
                        passwordDigest: hash
                      })
        req.session.user = req.body.username
        res.redirect('/profile')
      }
    })
  }
})

router.get('/login', function (req, res, next){
  res.render('users/login', { title: 'Login to Profile'})
})

router.post('/login', function (req, res, next){
  var errors = []
  if (!req.body.email.trim()){
    errors.push('Please Enter An Email')
  }
  if (!req.body.password.trim()){
    errors.push('Please Enter A Password')
  }
  if (errors.length){
    res.render('users/login', { title: 'Login to Profile', errors: errors})
  } else {
    Users.findOne({ email: req.body.email }, function (err, user){
      if (!user){
        errors.push('Invalid Username / Password')
        res.render('users/login', { title: 'Login to Profile', errors: errors})
      } else {
        if (bcrypt.compareSync(req.body.password, user.passwordDigest)){
          req.session.user = user.username
          res.redirect('/')
        } else {
          errors.push('Invalid Username / Password')
          res.render('users/login', { title: 'Login to Profile', errors: errors})
        }
      }
    })
  }
})

router.get('/logout', function (req, res, next){
  req.session = null
  res.redirect('/')
})

module.exports = router;


