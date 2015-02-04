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

module.exports = router;