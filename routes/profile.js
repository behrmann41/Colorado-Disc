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
      console.log(data)
  })
})

// function pagelist(items) {
//   var result = "<html><body><ul>";
//   items.forEach(function(item) {
//     var itemstring = "<li>" + item._id + "<ul><li>" + item.textScore +
//       "</li><li>" + item.created + "</li><li>" + item.document +
//       "</li></ul></li>";
//     result = result + itemstring;
//   });
//   result = result + "</ul></body></html>";
//   return result;
// }

module.exports = router;

