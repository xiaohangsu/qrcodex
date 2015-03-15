var express = require('express');
var router = express.Router();
var rest = require('restler');
var REST_API = require('../models/REST_API');

var inArray = function(obj, array) {
  for (var i = 0; i < array.length; i++) {
    if (obj == array[i]) {
      return 1;
    }
  }
  return 0;
};

router.get('/', function(req, res, next) {
  if (!req.session.user) {
    req.flash('error', '请先登陆');
    res.redirect('/');
  }

  if (req.session.user.myReview.length === 0) {
    res.render('myReview', {
      title: '我的点评',
      user: req.session.user,
      myReviewJSON: [],
      inArray: inArray,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  }

  var renderMyReview = function() {
    var AVCLOUD_HEADERS = REST_API.generateHeaders();
    rest.get('https://leancloud.cn/1.1/classes/ENGLISH/' + req.session.user.myReview[i], {
      headers: AVCLOUD_HEADERS
    }).on('complete', function(result) {
      myReviewJSON.push(result);
      if (myReviewJSON.length == req.session.user.myReview.length) {
        myReviewJSON.sort(function(q1, q2) {
          if (q1.number > q2.number) {
            return 1;
          } else {
            return -1;
          }
        });
        res.render('myReview', {
          title: '我的点评',
          user: req.session.user,
          myReviewJSON: myReviewJSON,
          inArray: inArray,
          success: req.flash('success').toString(),
          error: req.flash('error').toString()
        });
      }
    });
  };

  var myReviewJSON = [];
  for (var i = 0; i < req.session.user.myReview.length; i++) {
    renderMyReview();
  }
});

module.exports = router;