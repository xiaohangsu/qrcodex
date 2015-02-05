var express = require('express');
var router = express.Router();

/* GET signin page. */
router.get('/', function(req, res, next) {
  if(req.session.user) {
    req.flash('error', '请先登出');
    return res.redirect('/');
  }

  res.render('signin', {
    title: '登陆',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});

/* POST signin page */
router.post('/', function(req, res, next) {
  console.log(req.body);
});

module.exports = router;