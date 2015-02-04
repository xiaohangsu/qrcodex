var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET signup page. */
router.get('/', function(req, res, next) {
  console.log('GET!!!!!!');
  console.log(req.flash());
  if(req.session.user) {
    req.flash('error', '请先登出');
    return res.redirect('/');
  }

  res.render('signup', {
    title: '注册',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});

/* POST signup page */
router.post('/', function(req, res, next) {
  req.flash('error', 'test');
  var username = req.body.signup_username,
    school = req.body.signup_school,
    studentClass = req.body.signup_class,
    studentID = req.body.signup_studentID,
    phoneNumber = req.body.signup_phone_number;
  var user = new User();

  var checkResult = function(result) {
    if (result.id) {
      req.session.user = result.attributes;
      req.flash('success', '注册成功');
      console.log('======');
      console.log('注册成功');
      console.log('======');
      // return res.redirect('/');
    } else if (result.error == 'user existed') {
      req.flash('error', '该用户已存在');
      console.log(req.session);
      console.log('==================');
      console.log('注册失败: 该用户已存在');
      console.log('==================');
      // return res.redirect('/signup');
    } else {
      req.flash('error', '注册失败');
      console.log('========================');
      console.log('注册失败: ' + result.error);
      console.log('========================');
      // return res.redirect('/signup');
    }  
  };
  
  user.signUp(username, school, studentClass, studentID, phoneNumber, checkResult);
  console.log('POST!!!!!!');
  console.log(req.flash());
  return res.redirect('/signup');
});

module.exports = router;