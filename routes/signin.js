var express = require('express');
var router = express.Router();
var User = require('../models/User');
var AV = require('avoscloud-sdk').AV;
var config = require('../config');
AV.initialize(config.avos_app_id, config.avos_app_key);

/* POST signin page */
router.post('/', function(req, res, next) {
  if (req.session.user) {
    req.flash('error', '请先登出');
    return res.redirect('/');
  }

  var username = req.body.signin_username,
    password = req.body.signin_password;
  if (username === '' | password === '') {
    req.flash('error', '请填写登陆所需的完整信息');
    return res.redirect('/');
  }

  var checkResult = function(result) {
    if (result.success == 'success') {
      req.session.user = result.user.attributes;
      req.flash('success', '登陆成功');
      console.log('======');
      console.log('登陆成功');
      console.log('======');
      return res.redirect('/');
    } else if (result.error == 'can\'t find the user') {
      req.flash('error', '用户名或密码错误');
      console.log('======================');
      console.log('登陆失败: 用户名或密码错误');
      console.log('======================');
      return res.redirect('/');
    } else {
      req.flash('error', '服务器发生错误, 请稍后再试');
      console.log('========================');
      console.log('登陆失败: ' + result.error);
      console.log('========================');
      return res.redirect('/');
    }
  };

  var user = new User();
  user.signIn(username, password, checkResult);
});
module.exports = router;