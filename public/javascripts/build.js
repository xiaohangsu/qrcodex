(function() {
  //默认显示试卷的第一部分
  $('#paper_page div').first().removeClass('hidden');

  $('#paperNav li a').click(function() {
    $('#paperNav li a p').removeClass('showing');
    $(this).children().toggleClass('showing');
    $('.part').addClass('hidden');
    $('.part[data-name="' + $(this).data('name') + '"]').removeClass('hidden');
    $('#sidenav-overlay').trigger('click');
    $('body,html').animate({
      scrollTop: 0
    }, 1);
  });
})();;(function() {
  $('#paperCollapse').sideNav({
    edge: 'left'
  });
  //右侧栏弹出用户菜单
  $('.userCollapse').sideNav({
    edge: 'right'
  });

  //flash提示动画
  if ($('.flash_tips').children().length > 0) {
    $('*').click(function() {
      $('.flash_tips').removeClass().addClass('flash_tips_animate');
    });
  }
})();;(function() {
  $('.collectBtn').click(function() {
    var quesId = $(this).parent().parent().attr('ques_id');
    var status = $(this).parent().attr('status');
    if (status == 'logged_in') {
      var self = $(this);
      if ($(this)[0].innerHTML == '收藏') {
        $.ajax({
          type: 'POST',
          url: '/resource/update_my_fav',
          data: {
            quesId: quesId,
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
            quesId: quesId,
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
})();;(function() {
  $('.reviewBtn').click(function() {
    var object_id = $(this).parent().parent().attr('ques_id');
    var quesId = object_id;
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
            quesId: quesId,
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
            quesId: quesId,
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
})();;(function() {
  var counter = 61;
  //倒计时1分钟可以重新发送获取验证码短信
  function countDown() {
    if (counter == 1) {
      counter = 61;
      $('#get_verify_code').text('获取验证码');
      $('#get_verify_code').css('background-color', '#26a69a');
      $('#get_verify_code').attr('disabled', false);
      return;
    }

    counter--;
    $('#get_verify_code').text('等待 ' + counter + ' 秒后重试');
    setTimeout(countDown, 1000);
  }

  //异步发送获取验证码短信
  function getVerifyCodeAsync(phoneNumber) {
    $.ajax({
      type: 'POST',
      url: '/signin/getVerifyCode',
      data: {
        phoneNumber: phoneNumber
      },
      dataType: 'json',
      success: function(data) {
        console.log(data.result);
      },
      error: function() {
        console.log(data.result);
      }
    });
  }

  //点击获取验证码按钮
  $('#get_verify_code').click(function(event) {
    if ($(this).attr('disabled')) {
      return;
    } else {
      var phoneNumber = $('#signin_phone_number').val();
      if (phoneNumber === '' | phoneNumber.length !== 11) {
        toast('无法识别的手机号码', 2000);
        return;
      }
      $(this).css('background-color', 'grey');
      $(this).attr('disabled', true);
      getVerifyCodeAsync(phoneNumber);
      countDown();
    }
  });
})();