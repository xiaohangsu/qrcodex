var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.session.user) {
    req.flash('error', '请先登陆');
    return res.redirect('/');
  }

  res.render('editProfile', {
    title: '修改个人信息',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});

router.post('/', function(req, res, next) {
  if (!req.session.user) {
    req.flash('error', '请先登陆');
    return res.redirect('/');
  }

  var username = req.body.edit_username,
    school = req.body.edit_school,
    studentClass = req.body.edit_studentClass,
    studentID = req.body.edit_studentID,
    phoneNumber = req.session.user.phoneNumber;

  if (username === '' | school === '' | studentClass === '' | studentID === '') {
    req.flash('error', '个人信息不能修改为空值');
    return res.redirect('/editProfile');
  }

  var user = new User();

  var checkResult = function(result) {
    if(result.id) {
      req.session.user = result;
      req.flash('success', '更新成功');
      console.log('==============');
      console.log('更新个人信息成功');
      console.log('==============');
      return res.redirect('/editProfile');
    } else if(result.error == 'user does not exist') {
      req.flash('error', '不存在的用户');
      console.log('==========================');
      console.log('更新个人信息失败: 不存在的用户');
      console.log('==========================');
      return res.redirect('/editProfile');
    } else {
      req.flash('error', '服务器错误, 请稍后再试');
      console.log('===============================');
      console.log('更新个人信息失败: ' + result.error);
      console.log('===============================');
      return res.redirect('/editProfile');
    }
  };

  user.updateUserInfo(username, school, studentClass, studentID, phoneNumber, checkResult);
});

module.exports = router;