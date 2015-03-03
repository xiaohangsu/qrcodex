var AV = require('avoscloud-sdk').AV;
var config = require('../config');
AV.initialize(config.avos_app_id, config.avos_app_key);
var answerSheet = {};

function Paper_index(subject) {
  this.Paper_index = AV.Object.extend(subject + '_index');
  this.current_point = 0;
  this.questionNumber = 0;
}

Paper_index.prototype = {
  /** create a new ExamPaper
   * para Exam Paper Name
   * return paper AV object
   **/
  newPaper: function(ExamPaperName) {
    var paper_index = new this.Paper_index();

    paper_index.set('ExamPaperName', ExamPaperName);
    return paper_index;
  },

  getPaperIndex: function(ExamPaperObjectId, callback) {
    var paper_index_query = new AV.Query(this.Paper_index);
    paper_index_query.get(ExamPaperObjectId, {
      success: function(paper_index) {

        //using JSON avoid JShint error : Don't make functions within a loop.
        var fetchCallbackJSON = {
          success: function(question) {
            answerSheet[question.get('number')] = {
              answer : question.get('answer'),
              comment : question.get('comment'),
              object_id : question.id
            };
            if (this.currentPoint === this.QuestionNumber) {
              callback();
            }
            this.currentPoint++;
          }
        };

        this.QuestionNumber = parseInt(paper_index.get('questionNumber'));
        this.currentPoint = 1;
        for (var i = 1; i <= this.QuestionNumber; i++) {
          // if not JSON error occur here
          paper_index.get(i).fetch(fetchCallbackJSON);
        }



      },
      error: function(object, error) {
        console.log(error.description);
      }
    });
  },

  getAnswers: function(ExamPaperObjectId, callback) {
    var getFormatAnswerCallback = function() {
      callback(JSON.stringify(answerSheet));
      answerSheet = {};

    };

    this.getPaperIndex(ExamPaperObjectId, getFormatAnswerCallback);

  }
};

module.exports = Paper_index;