var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/disc-courses');
var discCourses = db.get('courses');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('courses/profile', { title: 'Colorado Disc' });
});

router.post('/', function(req, res, next) {
  console.log(typeof req.body.coursesearch)
  //var search = req.body.coursesearch;
  var reg = new RegExp(req.body.coursesearch, "i")
  discCourses.find({name: reg }, function(err, data) {
    res.render('courses/profile', { updatePage: true,
                                    courseSearch: data
                                  })
  })
})

module.exports = router;

