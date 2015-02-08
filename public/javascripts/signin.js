(function() {
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