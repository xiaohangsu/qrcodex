var AV = require('avoscloud-sdk').AV;
var config = require('../config');
AV.initialize(config.avos_app_id, config.avos_app_key);
var QRUser = AV.Object.extend('QRUser');

function User() {}

User.prototype = {
  /**
   * Add a new user - sub function
   */
  addNewUser: function(username, school, studentClass, studentID, phoneNumber, callback) {
    var newUser = new QRUser();
    newUser.save({
      username: username,
      school: school,
      studentClass: studentClass,
      studentID: studentID,
      phoneNumber: phoneNumber,
      myFav: {},
      myPic: 'default'
    }).then(function(user) {
      callback(user);
    }, function(error) {
      callback({
        error: error.description
      });
    });
  },

  /**
   * Update a user's infomation - sub function
   **/
  updateUser: function(username, school, studentClass, studentID, user, callback) {
    user.set('username', username);
    user.set('school', school);
    user.set('studentClass', studentClass);
    user.set('studentID', studentID);
    user.save(null, {
      success: function(user) {
        callback(user);
      },
      error: function(error) {
        callback({
          error: error.description
        });
      }
    });
  },

  /**
   * Update a user's picture - sub function
   **/
  updatePic: function(user, pic, callback) {
    user.set('myPic', pic);
    user.save(null, {
      success: function(user) {
        callback(user);
      },
      error: function(error) {
        callback({
          error: error.description
        });
      }
    });
  },

  /**
   * Sign up a user
   **/
  signUp: function(username, school, studentClass, studentID, phoneNumber, callback) {
    var self = this;
    var query = new AV.Query(QRUser);
    query.equalTo("phoneNumber", phoneNumber);
    query.first({
      success: function(user) {
        if (user) {
          callback({
            error: 'user existed'
          });
        } else {
          self.addNewUser(username, school, studentClass, studentID, phoneNumber, callback);
        }
      },
      error: function(error) {
        callback({
          error: error.description
        });
      }
    });
  },

  /**
   * Sign in a user
   **/
  signIn: function(phoneNumber, verifyCode, callback) {
    var query = new AV.Query(QRUser);
    query.equalTo('phoneNumber', phoneNumber);
    query.first({
      success: function(user) {
        if (!user) {
          callback({
            error: 'user does not exist'
          });
        } else {
          AV.Cloud.verifySmsCode(verifyCode, phoneNumber).then(function() {
            callback({
              user: user,
              success: 'success'
            });
          }, function(error) {
            callback({
              error: 'verify code does not correct'
            });
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

  /**
   * Update a user's infomation
   */
  updateUserInfo: function(username, school, studentClass, studentID, phoneNumber, callback) {
    var self = this;
    var query = new AV.Query(QRUser);
    query.equalTo('phoneNumber', phoneNumber);
    query.first({
      success: function(user) {
        if (user) {
          self.updateUser(username, school, studentClass, studentID, user, callback);
        } else {
          callback({
            error: 'user does not exist'
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

  /**
   * Update a user's picture
   **/
  updateUserPic: function(phoneNumber, pic, callback) {
    var self = this;
    var query = new AV.Query(QRUser);
    query.equalTo('phoneNumber', phoneNumber);
    query.first({
      success: function(user) {
        if (user) {
          self.updatePic(user, pic, callback);
        } else {
          callback({
            error: 'user does not exist'
          });
        }
      },
      error: function(error) {
        callback({
          error: error.description
        });
      }
    });
  }
};

module.exports = User;