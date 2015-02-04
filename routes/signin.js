var express = require('express');
var router = express.Router();

/* GET signin page. */
router.get('/', function(req, res, next) {
  res.render('signin', {
    title: '登陆'
  });
});

/* POST signin page */
router.post('/', function(req, res, next) {
  console.log(req.body);
});

module.exports = router;