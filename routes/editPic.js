var express = require('express');
var router = express.Router();
var fs = require('fs');
var User = require('../models/User');

/* GET edit user pic page. */
router.get('/', function(req, res, next) {
  if (!req.session.user) {
    req.flash('error', '请先登陆');
    return res.redirect('/');
  }

  var UserPics =  JSON.parse(fs.readFileSync('./models/UserPics.json'), 'utf-8');
  res.render('editPic', {
    title: '修改头像',
    user: req.session.user,
    UserPics: UserPics,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});

/* POST eit user pic page */
router.post('/', function(req, res, next) {
  if (!req.session.user) {
    req.flash('error', '请先登陆');
    return res.redirect('/');
  }

  var checkResult = function(result) {
    if(result.id) {
      req.session.user = result;
      req.flash('success', '更新成功');
      console.log('==============');
      console.log('更新个人头像成功');
      console.log('==============');
      return res.redirect('/editPic');
    } else if(result.error == 'user does not exist') {
      req.flash('error', '不存在的用户');
      console.log('==========================');
      console.log('更新个人头像失败: 不存在的用户');
      console.log('==========================');
      return res.redirect('/editPic');
    } else {
      req.flash('error', '服务器错误, 请稍后再试');
      console.log('===============================');
      console.log('更新个人头像失败: ' + result.error);
      console.log('===============================');
      return res.redirect('/editPic');
    }
  };

  var user = new User();
  user.updateUserPic(req.session.phoneNumber, req.body.edit_user_pic, checkResult);
});

module.exports = router;