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
})();