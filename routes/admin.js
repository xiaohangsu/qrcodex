var express = require('express');
var app = express();
var router = express.Router();
var crypto = require('crypto');
var AV = require('avoscloud-sdk').AV;

var Hash_Code = '';

/* GET admin-login page. */
router.get('/login', function(req, res, next) {
  console.log(req.session);
  res.render('admin_login', {
    title: 'Admin - Login',
    success : req.flash('success').toString(),
    error : req.flash('error').toString()
  });
});

router.post('/login', function(req, res, next) {
  AV.User.logIn(req.body.admin_name, req.body.admin_password, {
    success: function(user) {
      var hash = crypto.createHash("md5");
      hash.update(new Date().getTime().toString());
      Hash_Code = hash.digest('hex');
      res.redirect('/admin/add' + '/' + Hash_Code);
    },
    error: function(user, error) {
      req.flash('error', '密码或账号错误');
      return res.redirect('/admin/login');
    }
  });
});


router.get('/add/:hash_code', function(req, res, next) {
  if (req.params.hash_code === Hash_Code) {
    res.render('admin_add', {
      title: 'Admin - Add'
    });
  } else {
    req.flash('error', '另一用户登陆');
    res.redirect('/admin/login');
  }
});
module.exports = router;