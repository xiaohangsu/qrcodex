var AV = require('avoscloud-sdk').AV;
var config = require('../config');
AV.initialize(config.avos_app_id, config.avos_app_key);
var QRUser = AV.Object.extend('QRUser');

function User() {}

User.prototype = {
  /**
   * Add a new user
   */
  addNewUser: function(username, school, studentClass, studentID, phoneNumber, callback) {
    var newUser = new QRUser();
    newUser.save({
      username: username,
      school: school,
      studentClass: studentClass,
      studentID: studentID,
      phoneNumber: phoneNumber,
      myFav: {}
    }).then(function(user) {
      callback(user);
    }, function(error) {
      callback({error: error.description});
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
          callback({error: 'user existed'});
        } else {
          self.addNewUser(username, school, studentClass, studentID, phoneNumber, callback);
        }
      },
      error: function(error) {
        callback({error: error.description});
      }
    });
  },

  /**
   * Sign in a user
   **/
  signIn: function(phoneNumber, verifyCode, callback) {

  }
};

module.exports = User;