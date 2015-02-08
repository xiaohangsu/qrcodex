(function() {
  $('.user_pics img').click(function() {
    var newVal = $(this).attr('ref');
    $('.user_pics img').removeClass('user_pics_active');
    $('.user_pics img').addClass('user_pics_img');
    $(this).removeClass('user_pics_img');
    $(this).addClass('user_pics_active');
    $('#edit_pic_input').val(newVal);
  });
})();;(function() {
  //右侧栏弹出用户菜单
  $('.button-collapse').sideNav({
    edge: 'right'
  });

  //flash提示动画
  if ($('.flash_tips').children().length > 0) {
    $('*').click(function() {
      $('.flash_tips').removeClass().addClass('flash_tips_animate');
    });
  }
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