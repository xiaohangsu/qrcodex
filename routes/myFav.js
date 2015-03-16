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

  if (req.session.user.myFav.length === 0) {
    res.render('myFav', {
      title: '我的收藏',
      user: req.session.user,
      myFavJSON: [],
      inArray: inArray,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  }

  var renderMyFav = function() {
    var AVCLOUD_HEADERS = REST_API.generateHeaders();
    rest.get('https://leancloud.cn/1.1/classes/ENGLISH/' + req.session.user.myFav[i], {
      headers: AVCLOUD_HEADERS
    }).on('complete', function(result) {
      myFavJSON.push(result);
      if (myFavJSON.length == req.session.user.myFav.length) {
        myFavJSON.sort(function(q1, q2) {
          if (q1.number > q2.number) {
            return 1;
          } else {
            return -1;
          }
        });
        console.log(myFavJSON);
        res.render('myFav', {
          title: '我的收藏',
          user: req.session.user,
          myFavJSON: myFavJSON,
          inArray: inArray,
          success: req.flash('success').toString(),
          error: req.flash('error').toString()
        });
      }
    });
  };

  var myFavJSON = [];
  for (var i = 0; i < req.session.user.myFav.length; i++) {
    renderMyFav();
  }
});

module.exports = router;