var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/disc-courses');
var discCourses = db.get('courses');

/* GET home page. */
router.get('/', function (req, res, next) {
  discCourses.find({}, function (err, data){
    res.render('courses/index', { title: 'Colorado Disc',
                                  allCourses: data 
                                });
  })
});

router.get('/new', function (req, res, next){
  res.render('courses/newcourse', { title: 'Colorado Disc' });
});

router.post('/', function (req, res, next) {
  discCourses.insert({ name: req.body.coursename,
                       location: req.body.courseloc,
                       holecount: req.body.holenums,
                       yearEst: req.body.established
                      });
  res.redirect('/courses');
});

router.get('/:id/newscore', function (req, res, next) {
  discCourses.findOne({_id: req.params.id}, function (err, data){
    res.render('courses/newscore', {theCourse: data})  
  })
})

router.get('/:id', function (req, res, next){
  discCourses.findOne({_id: req.params.id}, function (err, data){
    res.render('courses/show', { title: 'Colorado Disc',
                                 theCourse: data
                                })
  })
})

router.post('/:id/newscore', function (req, res, next){
  discCourses.update({_id: req.params.id}, {
                         $push: { lastround: req.body.roundscore}
                          }, function (err, record){
    res.redirect('/courses/' + req.params.id)
  })
})

router.post('/:id/delete', function (req, res, next){
  discCourses.update({_id: req.params.id}, {
                          $pop: { lastround: 1}
                          }, function (err, record){
    res.redirect('/courses/' + req.params.id)
  })
})

module.exports = router;