var express = require('express');
var router = express.Router();
var rest = require('restler');
var paper = null;

rest.post('http://localhost:3000/resource/get_paper_answer', {
  data: {
    subject: 'ENGLISH',
    objectId: '54f55629e4b0b00571a53e54'
  }
}).on('complete', function(data, response) {
  console.log('=============');
  console.log('POST_COMELETE');
  console.log('=============');
  paper = data;
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: '英语月考3',
    user: req.session.user,
    paper: paper,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});

/* logout a user */
router.get('/logout', function(req, res, next) {
  if (!req.session.user) {
    req.flash('error', '你处于未登录状态');
    return res.redirect('/');
  } else {
    req.session.user = null;
    req.flash('success', '登出成功');
    return res.redirect('/');
  }
});

module.exports = router;