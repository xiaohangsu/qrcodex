var AV = require('avoscloud-sdk').AV;
var config = require('../config');
var Paper_index = require('./Paper_index');
AV.initialize(config.avos_app_id, config.avos_app_key);
/**
  * handle Callback variable
  **/
var CURRENT_POINT = 1;
var SIZE_POINT = 1;

function isSubject(subject) {
  return config.SUBJECT.some(function(item, index, array) {
    return (item === subject);
  });
}

function Question(subject) {
  if (isSubject(subject)) {

    this.Question = AV.Object.extend(subject);
    this.Subject = subject;
    this.paper_index = new Paper_index(subject);
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
  newQuestion: function(para0, para1, para2, para3, para4, paper_index) {
    var question = new this.Question();

    question.save({
      ExamPaperName: para0,
      type: para1,
      number: para2,
      content: para3,
      answer: para4
    }, {
      success: function(question) {
        paper_index.set(para2, question);
        console.log('New object created with objectId: ' + question.id);

        CURRENT_POINT ++;
        if (CURRENT_POINT === SIZE_POINT) {
          paper_index.save();
        }
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
  newQuestionsByParaArray: function(ExamPaperName, paraArray) {
    var paper_index = this.paper_index.newPaper(ExamPaperName);
    console.log(paraArray.length);
    SIZE_POINT = paraArray.length - 1;
    CURRENT_POINT = 0;
    for (var index = 1; index < paraArray.length; index++) {
      console.log(index, paraArray.length);
      this.newQuestion(ExamPaperName, paraArray[index].type,
        paraArray[index].number, paraArray[index].content,
        paraArray[index].answer, paper_index);
    }
  },

  /**
   * Question New
   * paraJSON as above
   **/
  newQuestionByJSON: function(paraJSON, paper_index) {
    var question = new this.Question();
    question.save(paraJSON, {
      success: function(question) {
        paper_index.set(paraJSON.number, paraJSON.question);
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
  queryByExamPaperName: function(ExamPaperName) {
    var question = new this.Question();
    var query = new AV.Query(this.Question);
    query.equalTo('ExamPaperName', ExamPaperName);
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
   * Get or Query all Exam Paper sort by ExamPaper Id
   * return JSON
   **/
  getAllExamPaper: function() {
    var question = new this.Question();
    var query = new AV.Query(this.Question);
    // sort the order
    query.ascending('ExamPaper');
    query.ascending('number');
    query.find({
      success: function(results) {
        console.log(results);
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