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
    var questions = [];
    paper_index_query.get(ExamPaperObjectId, {
      success: function(paper_index) {

        //using JSON avoid JShint error : Don't make functions within a loop.
        var fetchCallbackJSON = {
          success: function(question) {

            var ques = {
              type: question.get('type'),
              index: question.get('number'),
              answer: question.get('answer'),
              comment: question.get('comment'),
              object_id: question.id
            };
            questions.push(ques);
            if (this.currentPoint === this.QuestionNumber) {
              var category_1 = {
                name: 'listening',
                title: '听力理解',
                answers: []
              };
              var category_2 = {
                name: 'single',
                title: '单项选择',
                answers: []
              };
              var category_3 = {
                name: 'completing',
                title: '完形填空',
                answers: []
              };
              var category_4 = {
                name: 'reading',
                title: '阅读理解',
                answers: []
              };
              var category_5 = {
                name: 'filling',
                title: '综合填空',
                answers: []
              };
              var category_6 = {
                name: 'concluding',
                title: '信息归纳',
                answers: []
              };
              var category_7 = {
                name: 'writting',
                title: '作文题',
                answers: []
              };
              questions.sort(function(q1, q2) {
                if (q1.index > q2.index) {
                  return 1;
                } else {
                  return -1;
                }
              });
              for (var i = 0; i < questions.length; i++) {
                var q_JSON = questions[i];
                switch (q_JSON.type) {
                  case '听力理解':
                    category_1.answers.push(q_JSON);
                    break;
                  case '单项选择':
                    category_2.answers.push(q_JSON);
                    break;
                  case '完形填空':
                    category_3.answers.push(q_JSON);
                    break;
                  case '阅读理解':
                    category_4.answers.push(q_JSON);
                    break;
                  case '综合填空':
                    category_5.answers.push(q_JSON);
                    break;
                  case '信息归纳':
                    category_6.answers.push(q_JSON);
                    break;
                  case '作文题':
                    category_7.answers.push(q_JSON);
                    break;
                }
              }
              questions = [];
              questions.push(category_1);
              questions.push(category_2);
              questions.push(category_3);
              questions.push(category_4);
              questions.push(category_5);
              questions.push(category_6);
              questions.push(category_7);
              answerSheet.questions = questions;
              callback(answerSheet);
            }
            this.currentPoint++;
          }
        };

        this.QuestionNumber = parseInt(paper_index.get('questionNumber'));
        this.currentPoint = 1;
        for (var i = 1; i <= this.QuestionNumber; i++) {
          // if not JSON error occur here
          paper_index.get(i).fetch({
            success: function(question) {
              if (currentPoint === QuestionNumber) {
                fuck;
              }
              this.currentPoint++;
            }
          });
        }
      },
      error: function(object, error) {
        console.log(error.description);
      }
    });
  },

  getAnswers: function(ExamPaperObjectId, callback) {
    var getFormatAnswerCallback = function(answerSheet) {
      callback(answerSheet);
      answerSheet = {};
    };

    this.getPaperIndex(ExamPaperObjectId, getFormatAnswerCallback);
  }
};

module.exports = Paper_index;