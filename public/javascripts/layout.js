(function() {
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
})();