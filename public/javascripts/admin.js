(function() {
  var questionBlankItem = $('.question-blank-item');
  var subject = '';
  /**
   * get all data form input
   * format the data
   * return a format Array json
   **/
  function formatExamPaperData() {
    var examPaperName = $('#paper-name-input').val();
    var questionArray = [];
    $('.question-blank-item').each(function(index, element) {
      questionArray.push({
        'type': $(this).find('input')[0].value,
        'number': $(this).find('input')[1].value,
        'content': $(this).find('textarea')[0].value,
        'answer': $(this).find('textarea')[1].value
      });

    });

    console.log({
      'subject': subject,
      'ExamPaperName': examPaperName,
      'questionArray': JSON.stringify(questionArray)
    });

    return {
      'subject': subject,
      'ExamPaperName': examPaperName,
      'questionArray': JSON.stringify(questionArray)
    };
  }



  $('#select-subject').change(function() {
    subject = this.value;
    $('#admin-add-right-form').removeAttr('style');
    $.get('/resource/admin_get_subject/' + subject, function(data, status) {});
  });

  $('#add-paper').click(function() {
    if ($('#add-paper').hasClass('red')) {
      if (confirm('该操作将删除本试卷所有内容，确认？')) {
        $('#submit').attr('disabled', 'disabled');
        $('#paper-name-input').removeAttr('disabled');
        $('#add-paper>i').toggleClass('mdi-content-clear');
        $('#add-paper>i').toggleClass('mdi-content-add');
        $('#add-paper').toggleClass('red');
        $('#add-paper').toggleClass('blue');
        $('.question-blank-item').remove();
      }
    } else if ($('#add-paper').hasClass('blue')) {
      $('#submit').removeAttr('disabled');
      $('#paper-name-input').attr('disabled', 'disabled');
      $('#add-paper>i').toggleClass('mdi-content-add');
      $('#add-paper>i').toggleClass('mdi-content-clear');
      $('#add-paper').toggleClass('blue');
      $('#add-paper').toggleClass('red');
    }

  });

  $('#add-question').click(function() {
    var newQuestionClone = questionBlankItem.clone().removeAttr('style');
    $('table>.input-field').append(questionBlankItem.clone().removeAttr('style'));
  });

  $('#reduce-question').click(function() {
    $('.question-blank-item:last').remove();
  });

  $('#submit').click(function() {
    console.log(formatExamPaperData());
    $.post('/resource/add-paper/' + subject, formatExamPaperData(),
      function(Data, status) {
        console.log(data, status);
      });
  });

})();