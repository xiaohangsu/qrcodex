var express = require('express');
var router = express.Router();
var Question  = require('../models/Question');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: '首页',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});

/* logout a user */
router.get('/logout', function(req, res, next) {
  if(!req.session.user) {
    req.flash('error', '你处于未登录状态');
    return res.redirect('/');
  } else {
    req.session.user = null;
    req.flash('success', '登出成功');
    return res.redirect('/');  
  }
});

module.exports = router;