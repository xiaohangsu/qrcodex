var AV = require('avoscloud-sdk').AV;
var config = require('../config');
AV.initialize(config.avos_app_id, config.avos_app_key);
var QRUser = AV.Object.extend('Student');

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

  updateMyFav: function(userId, quesIndex, operation, callback) {
    var query = new AV.Query(QRUser);
    query.get(userId, {
      success: function(target) {
        if (target.get('myFav') === undefined) {
          target.set('myFav', []);
        } else {
          if (operation == '+') {
            target.get('myFav').push(quesIndex);
          } else if (operation == '-') {
            for (var i = 0; i < target.get('myFav').length; i++) {
              if (target.get('myFav')[i] == quesIndex) {
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

  updateMyReview: function(userId, quesIndex, operation, callback) {
    console.log(userId);
    console.log(quesIndex);
    console.log(operation);
    var query = new AV.Query(QRUser);
    query.get(userId, {
      success: function(target) {
        if (target.get('myReview') === undefined) {
          target.set('myReview', []);
        } else {
          if (operation == '+') {
            target.get('myReview').push(quesIndex);
          } else if (operation == '-') {
            for (var i = 0; i < target.get('myReview').length; i++) {
              if (target.get('myReview')[i] == quesIndex) {
                target.get('myReview').splice(i, 1);
              }
            }
          }
        }
        target.save();
        callback(target);
      }
    });
  },
  /**
   * Add a new user - sub function
   */
  // addNewUser: function(username, school, studentClass, studentID, phoneNumber, callback) {
  //   var newUser = new QRUser();
  //   newUser.save({
  //     username: username,
  //     school: school,
  //     studentClass: studentClass,
  //     studentID: studentID,
  //     phoneNumber: phoneNumber,
  //     myFav: {},
  //     myPic: '/images/default.jpg'
  //   }).then(function(user) {
  //     callback(user);
  //   }, function(error) {
  //     callback({
  //       error: error.description
  //     });
  //   });
  // },

  /**
   * Update a user's infomation - sub function
   **/
  // updateUser: function(username, school, studentClass, studentID, user, callback) {
  //   user.set('username', username);
  //   user.set('school', school);
  //   user.set('studentClass', studentClass);
  //   user.set('studentID', studentID);
  //   user.save(null, {
  //     success: function(user) {
  //       callback(user);
  //     },
  //     error: function(error) {
  //       callback({
  //         error: error.description
  //       });
  //     }
  //   });
  // },

  /**
   * Update a user's picture - sub function
   **/
  // updatePic: function(user, pic, callback) {
  //   user.set('myPic', pic);
  //   user.save(null, {
  //     success: function(user) {
  //       callback(user);
  //     },
  //     error: function(error) {
  //       callback({
  //         error: error.description
  //       });
  //     }
  //   });
  // },

  /**
   * Sign up a user
   **/
  // signUp: function(username, school, studentClass, studentID, phoneNumber, callback) {
  //   var self = this;
  //   var query = new AV.Query(QRUser);
  //   query.equalTo("phoneNumber", phoneNumber);
  //   query.first({
  //     success: function(user) {
  //       if (user) {
  //         callback({
  //           error: 'user existed'
  //         });
  //       } else {
  //         self.addNewUser(username, school, studentClass, studentID, phoneNumber, callback);
  //       }
  //     },
  //     error: function(error) {
  //       callback({
  //         error: error.description
  //       });
  //     }
  //   });
  // },

  // /**
  //  * Update a user's infomation
  //  */
  // updateUserInfo: function(username, school, studentClass, studentID, phoneNumber, callback) {
  //   var self = this;
  //   var query = new AV.Query(QRUser);
  //   query.equalTo('phoneNumber', phoneNumber);
  //   query.first({
  //     success: function(user) {
  //       if (user) {
  //         self.updateUser(username, school, studentClass, studentID, user, callback);
  //       } else {
  //         callback({
  //           error: 'user does not exist'
  //         });
  //       }
  //     },
  //     error: function(error) {
  //       callback({
  //         error: error.description
  //       });
  //     }
  //   });
  // },

  // /**
  //  * Update a user's picture
  //  **/
  // updateUserPic: function(phoneNumber, pic, callback) {
  //   var self = this;
  //   var query = new AV.Query(QRUser);
  //   query.equalTo('phoneNumber', phoneNumber);
  //   query.first({
  //     success: function(user) {
  //       if (user) {
  //         self.updatePic(user, pic, callback);
  //       } else {
  //         callback({
  //           error: 'user does not exist'
  //         });
  //       }
  //     },
  //     error: function(error) {
  //       callback({
  //         error: error.description
  //       });
  //     }
  //   });
  // }
};

module.exports = User;