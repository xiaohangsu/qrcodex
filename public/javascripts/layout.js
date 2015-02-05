(function() {
  //右侧栏弹出用户菜单
  $('.button-collapse').sideNav({
    edge: 'right'
  });

  //flash提示动画
  if ($('.flash_tips').children().length > 0) {
    $('body').click(function() {
      $('.flash_tips').css({
        'transition': 'transform 1s',
        'transform': 'translate(0px, -40px)',
        '-o-transition': '-o-transform 1s',
        '-o-transform:': 'translate(0px, -40px)',
        '-ms-transition': '-ms-transform 1s',
        '-ms-transform:': 'translate(0px, -40px)',
        '-moz-transition': '-moz-transform 1s',
        '-moz-transform:': 'translate(0px, -40px)',
        '-webkit-transition': '-webkit-transform 1s',
        '-webkit-transform:': 'translate(0px, -40px)',
      });
    });
  } else {
    $('.flash_tips').css({
      'transform': 'translate(0px, 40px)',
      '-o-transform:': 'translate(0px, 40px)',
      '-ms-transform:': 'translate(0px, 40px)',
      '-moz-transform:': 'translate(0px, 40px)',
      '-webkit-transform:': 'translate(0px, 40px)',
    });
  }
})();