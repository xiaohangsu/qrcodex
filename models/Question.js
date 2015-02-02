var AV = require('avoscloud-sdk').AV;
var config = require('../config');
AV.initialize(config.avos_app_id, config.avos_app_key);


function isSubject(subject) {
  return config.SUBJECT.some(function(item, index, array) {
    return (item === subject);
  });
}

function Question(subject) {
  if (isSubject(subject)) {

    this.Question = AV.Object.extend(subject);
    this.Subject = subject;
    this.error = '';
  } else {
    this.error = 'Initialize Failed!';
  }
}

Question.prototype = {
    /**
     * Question New
     * para0 : Exam Paper Number
     * para1 : Qus Type
     * para2 : Qus Number
     * para3 : Qus Content
     * para4 : Qus Answer
     **/
    new: function(para0, para1, para2, para3, para4) {
      var question = new this.Question();
      question.save({
        ExamPaperId: para0,
        type: para1,
        number: para2,
        content: para3,
        answer: para4
      }, {
        success: function(question) {
          console.log('New object created with objectId: ' + question.id);
        },
        error: function(question, error) {
          this.error = error.description;
          console.log('Failed to create new object, with error code: ' + error.description);
        }
      });
    },

    /**
     * Question New
     * paraArray as above order
     **/
    newByParaArray: function(paraArray) {
      var question = new this.Question();
      if (paraArray.length !== 5) {
        this.error = 'New paraArray error!';
      } else {
        for (var i = 0; i < paraArray.length; i++) {
          question.set(paraArray[i][0], paraArray[i][1]);
        }
        question.save();
      }
    },

    /**
     * Question New
     * paraJSON as above
     **/
    newByJSON: function(paraJSON) {
      var question = new this.Question();
      question.save(paraJSON, {
        success: function(question) {
          console.log('New object created with objectId: ' + question.id);
        },
        error: function(question, error) {
          this.error = error.description;
          alert('Failed to create new object, with error code: ' + error.description);
        }
      });
    },

    /**
     * query By Object Id
     *
     **/
    queryByObjectId: function(ObjectId) {
      var question = new this.Question();

      var query = new AV.Query(this.Question);
      query.equalTo('objectId', ObjectId);
      query.find({
        success: function(result) {
          return result;
        },
        error: function(error) {
          this.error = error.description;
        }
      });
    },

    /**
     * Query By Exam Paper Id
     * return JSON arrays
     **/
    queryByExamPaperId: function(ExamPaperId) {
      var question = new this.Question();
      var query = new AV.Query(this.Question);
      query.equalTo('ExamPaperId', ExamPaperId);
      // sort the order
      query.ascending('number');
      query.find({
        success: function(results) {
          return results;
        },
        error: function(error) {
          this.error = error.description;
        }
      });

    },

    /**
     * Query By Multiple Condition
     * Condition as Arrays [[name , value], [name , value]]
     **/
    queryByMultiCondition: function(condition) {
      var query = new AV.Query(this.Question);

      for (var i = 0; i < condition.length; i++) {
        query.equalTo(condition[i][0], condition[i][1]);
      }
      query.find({
        success: function(results) {
          return results;
        },
        error: function(error) {
          this.error = error.description;
        }
      });
    },



    /**
     * Modify Attribute By ObjectId
     * ObjectId , modifiedArray
     **/
    update: function(ObjectId, modifiedArray) {
      var query = new AV.Query(this.Question);
      query.get(ObjectId, {
          success: function(target) {

            for (var i = 0; i < modifiedArray.length; i++) {
              target.set(modifiedArray[i][0], modifiedArray[i][1]);
            }
            target.save();
        },
        error: function(error) {
          this.error = error.description;
        }
      });
  }

//   /**
//    * Modify Attribute
//    * Target (AV.Object) & modifiedArray
//    **/
//   modify: function(target, modifiedArray) {
//     for (var i = 0; i < modifiedArray.length; i++) {
//       target.set(modifiedArray[i][0], modifiedArray[i][1]);
//     }
//     target.save();
//   }
};

module.exports = Question;