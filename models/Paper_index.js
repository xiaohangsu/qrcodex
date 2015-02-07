var AV = require('avoscloud-sdk').AV;
var config = require('../config');
AV.initialize(config.avos_app_id, config.avos_app_key);

function Paper_index(subject) {
  this.Paper_index = AV.Object.extend(subject + '_index');
}

Paper_index.prototype = {
  /** create a new ExamPaper
  * para Exam Paper Name
  * return paper AV object
  **/
  newPaper : function(ExamPaperName) {
    var paper_index = new this.Paper_index();

    paper_index.set('ExamPaperName', ExamPaperName);
    return paper_index;
  }
};

module.exports = Paper_index;