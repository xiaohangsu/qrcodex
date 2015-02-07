var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var AV = require('avoscloud-sdk').AV;
var config = require('../config');

/* GET admin-login page. */
router.get('/login', function(req, res, next) {
  res.render('admin_login', {
    title: 'Admin - Login',
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});

router.post('/login', function(req, res, next) {
  AV.User.logIn(req.body.admin_name, req.body.admin_password, {
    success: function(user) {
      var hash = crypto.createHash("md5");
      hash.update(new Date().getTime().toString());
      config.Admin_Hash_Code = hash.digest('hex');
      res.redirect('/admin/add' + '/' + config.Admin_Hash_Code);
    },
    error: function(user, error) {
      req.flash('error', '密码或账号错误');
      return res.redirect('/admin/login');
    }
  });
});


router.get('/add/:hash_code', function(req, res, next) {
  if (req.params.hash_code === config.Admin_Hash_Code) {
    console.log(config);
    res.render('admin_add', {
      title: 'Admin - Add',
      subject: config.SUBJECT
    });
  } else {
    req.flash('error', '非法操作');
    res.redirect('/admin/login');
  }
});

// router.get('/add/:hash_code/:subject', function(req, res, next) {
//   console.log(req.params.subject);
//   res.render('admin_add', {
//     title: 'Admin - Add',
//     subject: config.SUBJECT
//   });
// });


module.exports = router;