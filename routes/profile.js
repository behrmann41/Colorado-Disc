var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/disc-courses');
var discCourses = db.get('courses');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('courses/profile', { title: 'Colorado Disc' });
});

router.post('/', function (req, res, next) {
  var reg = new RegExp(req.body.coursesearch, "i")
  discCourses.find({name: reg }, function(err, data) {
    res.render('courses/profile', { updatePage: true,
                                    courseSearch: data
                                  })
  })
})

router.get('/:id/newscore', function (req, res, next) {
  discCourses.findOne({_id: req.params.id}, function (err, data){
    res.render('courses/newscore', {theCourse: data})  
  })
})

//router.post('/newscore', function (req, res, next))

module.exports = router;

