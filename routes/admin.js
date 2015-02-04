var express = require('express');
var router = express.Router();
var AV = require('avoscloud-sdk').AV;
/* GET admin-login page. */
router.get('/login', function(req, res, next) {
  res.render('admin_login', {
    title: 'Admin - Login'
  });
});

router.post('/login', function(req, res, next) {
  console.log(req.body);
  AV.User.logIn(req.body.admin_name, req.body.admin_password, {
    success: function(user) {
      console.log(user);
      res.redirect('/admin/add');
    },
    error: function(user, error) {
      res.redirect('/admin/login');
    }
  });
});

router.get('/add', function(req, res, next) {
  res.render('admin_add', {
    title: 'Admin - Add'
  });
});
module.exports = router;