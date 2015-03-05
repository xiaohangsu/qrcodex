var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if (!req.session.user) {
    req.flash('error', '请先登陆');
    res.redirect('/');
  }
  res.render('myFav', {
    title: '我的收藏',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});

module.exports = router;