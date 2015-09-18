var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/disc-courses');
var Courses = db.get('courses');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('courses/index', { title: 'Colorado Disc' });
});

router.get(/)

module.exports = router;