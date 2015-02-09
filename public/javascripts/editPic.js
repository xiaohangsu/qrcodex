(function() {
  $('.user_pics img').click(function() {
    var newVal = $(this).attr('ref');
    $('.user_pics img').removeClass('user_pics_active');
    $('.user_pics img').addClass('user_pics_img');
    $(this).removeClass('user_pics_img');
    $(this).addClass('user_pics_active');
    $('#edit_pic_input').val(newVal);
  });
})();