$(document).ready(function(){
	$('img').hide();
  $('.title').click(function(){
    $('.container').addClass('open');
  });


  $('.close').click(function(){
    // $('.container').removeClass('open');
    $('h2').hide();
    $('img').show()
  });
});
