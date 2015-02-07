var express = require('express');
var router = express.Router();
var User = require('../models/User');
var AV = require('avoscloud-sdk').AV;
var config = require('../config');
AV.initialize(config.avos_app_id, config.avos_app_key);

/* GET signin page. */
router.get('/', function(req, res, next) {
  if (req.session.user) {
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
  if (req.session.user) {
    req.flash('error', '请先登出');
    return res.redirect('/');
  }

  var phoneNumber = req.body.signin_phone_number,
    verifyCode = req.body.signin_verify_code;
  if (phoneNumber === '' | verifyCode === '') {
    req.flash('error', '请填写登陆所需的完整信息');
    return res.redirect('/signin');
  }
  if(phoneNumber.length !== 11) {
    req.flash('error', '手机号码长度为11位, 请重新填写');
    return res.redirect('/signin');
  }
  if(verifyCode.length !== 6) {
    req.flash('error', '验证码长度为6位, 请重新填写');
    return res.redirect('/signin');
  }

  var checkResult = function(result) {
    if(result.success == 'success') {
      req.session.user = result.user.attributes;
      req.flash('success', '登陆成功');
      console.log('======');
      console.log('登陆成功');
      console.log('======');
      return res.redirect('/');
    } else if (result.error == 'user does not exist') {
      req.flash('error', '此手机号码尚未注册, 请先注册');
      console.log('===================');
      console.log('登陆失败: 不存在的用户');
      console.log('===================');
      return res.redirect('/signin');
    } else if (result.error == 'verify code does not correct') {
      req.flash('error', '验证码错误');
      return res.redirect('/signin');
    } else {
      req.flash('error', '服务器发生错误, 请稍后再试');
      console.log('========================');
      console.log('登陆失败: ' + result.error);
      console.log('========================');
      return res.redirect('/signin');
    }
  };

  var user = new User();
  user.signIn(phoneNumber, verifyCode, checkResult);
});

/* POST to getVerifyCode */
router.post('/getVerifyCode', function(req, res, next) {
  AV.Cloud.requestSmsCode(req.body.phoneNumber).then(function() {
    res.send({
      result: '发送成功'
    });
  }, function(err) {
    res.send({
      result: '发送失败'
    });
  });
});

module.exports = router;