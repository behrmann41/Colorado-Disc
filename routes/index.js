var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  var username = req.session.user
  res.render('index', { title: 'Colorado Disc', user: username });
});

module.exports = router;
