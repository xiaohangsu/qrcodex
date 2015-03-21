(function() {
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

  $(".favReviewPiont").click(function(){
    $("html,body").animate({scrollTop:$('#' + this.getAttribute('data-name')).offset().top},1000);
  });
})();