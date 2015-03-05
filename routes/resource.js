var express = require('express');
var router = express.Router();
var Question = require('../models/Question');
var config = require('../config');
var Paper_index = require('../models/Paper_index');
var User = require('../models/User');
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
router.post('/get_paper_answer', function(req, res, next) {
  console.log(req.body);
  var paper_index = new Paper_index(req.body.subject);
  var getAnswersCallback = function(AnswerSheet) {
    res.send(AnswerSheet);
  };

  paper_index.getAnswers(req.body.objectId, getAnswersCallback);
});

/**
 * req.query 2 TWO params
 * subject= (subject)
 * & objectId=(QuestionId)
 * url/add_question_comment?subject=subject&object_id=object_id
 **/
router.post('/add_question_comment', function(req, res, next) {
  var subject = new Question(req.body.subject);
  subject.addComment(req.body.objectId);
});


/**
 * req.query 2 TWO params
 * subject= (subject)
 * & objectId=(QuestionId)
 * url/subtract_question_comment?subject=subject&object_id=object_id
 **/
router.post('/subtract_question_comment', function(req, res, next) {
  var subject = new Question(req.body.subject);
  subject.subtractComment(req.body.objectId);
});

router.post('/update_my_fav', function(req, res, next) {
  var user = new User();
  var userId = req.session.user.objectId,
    quesIndex = req.body.quesIndex,
    operation = req.body.operation;
  var callback = function(target) {
    req.session.user.myFav = target.get('myFav');
    console.log(req.session.user);
    res.send({
      info: "success"
    });
  };
  user.updateMyFav(userId, quesIndex, operation, callback);
});

router.post('/update_my_review', function(req, res, next) {
  var user = new User();
  var userId = req.session.user.objectId,
    quesIndex = req.body.quesIndex,
    operation = req.body.operation;
  var callback = function(target) {
    req.session.user.myReview = target.get('myReview');
    console.log(req.session.user);
    res.send({
      info: "success"
    });
  };
  user.updateMyReview(userId, quesIndex, operation, callback);
});

module.exports = router;