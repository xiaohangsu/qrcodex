(function() {
  $('.reviewBtn').click(function() {
    var object_id = $(this).parent().parent().attr('ques_id'),
      quesIndex = $(this).parent().parent().attr('ques_index');
    var status = $(this).parent().attr('status');
    if (status == 'logged_in') {
      var self = $(this);
      if ($(this)[0].innerHTML == '点评') {
        $.ajax({
          type: 'POST',
          url: '/resource/add_question_comment',
          data: {
            subject: 'ENGLISH',
            objectId: object_id
          }
        });
        $.ajax({
          type: 'POST',
          url: '/resource/update_my_review',
          data: {
            quesIndex: quesIndex,
            operation: '+'
          },
          success: function() {
            $(self).text('点评(+1)');
            $(self).addClass('BtnActive');
          }
        });
      } else {
        $.ajax({
          type: 'POST',
          url: '/resource/subtract_question_comment',
          data: {
            subject: 'ENGLISH',
            objectId: object_id
          }
        });
        $.ajax({
          type: 'POST',
          url: '/resource/update_my_review',
          data: {
            quesIndex: quesIndex,
            operation: '-'
          },
          success: function() {
            $(self).text('点评');
            $(self).removeClass('BtnActive');
          }
        });
      }
    } else {
      alert('登陆后才能点评');
      $('.userCollapse').trigger('click');
      return;
    }
  });
})();