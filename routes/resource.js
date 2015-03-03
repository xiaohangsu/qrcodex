var express = require('express');
var router = express.Router();
var Question = require('../models/Question');
var config = require('../config');
var Paper_index = require('../models/Paper_index');
/* GET subject resource. */
router.get('/admin_get_subject/:subject', function(req, res, next) {
  var subject = new Question(req.params.subject);
  subject.getAllExamPaper();
});

router.post('/add-paper/:subject', function(req, res, next) {
  // todo 添加试卷没有 先判断有无该试卷 & 没有返回响应
  var subject = new Question(req.params.subject);
  subject.newQuestionsByParaArray(req.body.ExamPaperName,
    JSON.parse(req.body.questionArray));
});

/**
* req.query 2 TWO params
* subject= (subject)
* & objectId=(ExamPaperId)
* url/get_paper_answer?subject=subject&object_id=object_id
**/
router.get('/get_paper_answer/', function(req, res, next) {
  var paper_index = new Paper_index(req.query.subject);

  // callback
  /**
  * AnswerSheet = { 0 : {
                                        answer : answer,
                                        comment : comment,
                                        objectId : question_ObjectId
                                     },
  *                            1 : {
                                        answer : answer,
                                        comment : comment,
                                        objectId : question_ObjectId
                                     },
  *                                                         .....}
  **/
  var getAnswers = function(AnswerSheet) {
    console.log(AnswerSheet);
    return AnswerSheet;
  };

  paper_index.getAnswers(req.query.objectId, getAnswers);

});

module.exports = router;