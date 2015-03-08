var AV = require('avoscloud-sdk').AV;
var config = require('../config');
AV.initialize(config.avos_app_id, config.avos_app_key);
var QRUser = AV.Object.extend('student');

function User() {}

User.prototype = {
  /**
   * Sign in a user
   **/
  signIn: function(username, password, callback) {
    var query = new AV.Query(QRUser);
    query.equalTo('username', username);
    query.equalTo('password', password);
    query.first({
      success: function(user) {
        if (!user) {
          callback({
            error: 'can\'t find the user'
          });
        } else {
          callback({
            user: user,
            success: 'success'
          });
        }
      },
      error: function(error) {
        callback({
          error: error.description
        });
      }
    });
  },

  updateMyFav: function(userId, quesId, operation, callback) {
    var query = new AV.Query(QRUser);
    query.get(userId, {
      success: function(target) {
        if (target.get('myFav') === undefined) {
          target.set('myFav', []);
        } else {
          if (operation == '+') {
            target.get('myFav').push(quesId);
          } else if (operation == '-') {
            for (var i = 0; i < target.get('myFav').length; i++) {
              if (target.get('myFav')[i] == quesId) {
                target.get('myFav').splice(i, 1);
              }
            }
          }
        }
        target.save();
        callback(target);
      }
    });
  },

  updateMyReview: function(userId, quesId, operation, callback) {
    var query = new AV.Query(QRUser);
    query.get(userId, {
      success: function(target) {
        if (target.get('myReview') === undefined) {
          target.set('myReview', []);
        } else {
          if (operation == '+') {
            target.get('myReview').push(quesId);
          } else if (operation == '-') {
            for (var i = 0; i < target.get('myReview').length; i++) {
              if (target.get('myReview')[i] == quesId) {
                target.get('myReview').splice(i, 1);
              }
            }
          }
        }
        target.save();
        callback(target);
      }
    });
  }
};

module.exports = User;