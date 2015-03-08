(function() {
  $('.collectBtn').click(function() {
    var quesIndex = $(this).parent().parent().attr('ques_index');
    var status = $(this).parent().attr('status');
    if (status == 'logged_in') {
      var self = $(this);
      if ($(this)[0].innerHTML == '收藏') {
        $.ajax({
          type: 'POST',
          url: '/resource/update_my_fav',
          data: {
            quesIndex: quesIndex,
            operation: '+'
          },
          success: function() {
            $(self).text('已收藏');
            $(self).addClass('BtnActive');
          }
        });
      } else {
        $.ajax({
          type: 'POST',
          url: '/resource/update_my_fav',
          data: {
            quesIndex: quesIndex,
            operation: '-'
          },
          success: function() {
            $(self).text('收藏');
            $(self).removeClass('BtnActive');
          }
        });
      }
    } else {
      alert('登陆后才可收藏');
      $('.userCollapse').trigger('click');
      return;
    }
  });
})();