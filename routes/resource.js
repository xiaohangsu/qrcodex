var express = require('express');
var router = express.Router();
var Question = require('../models/Question');
var config = require('../config');

/* GET subject resource. */
router.get('/admin_get_subject/:subject', function(req, res, next) {
  var subject = new Question(req.params.subject);
  subject.getAllExamPaper();
});

router.post('/add-paper/:subject', function(req, res, next) {
  var subject = new Question(req.params.subject);
  subject.newQuestionsByParaArray(req.body.ExamPaperName,
    JSON.parse(req.body.questionArray));
  console.log(subject.error);
});

module.exports = router;