var $ = jQuery = require('jquery');
require('./bootstrap_custom.js');
var Handlebars = require('handlebars');

$(function(){
	var topoffset = 50;

	if('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then(function() {
        console.log('Service Worker Active');
      })
  }

	$.getJSON('/data/pets.json', function(data) {
		$('.loader').fadeOut(1000);
		var slideshowTemplate = $('#slideshow-template').html();
		var slideshowScript = Handlebars.compile(slideshowTemplate);

		var gamesTemplate = $('#games-template').html();
		var gamesScript = Handlebars.compile(gamesTemplate);

		var streamingTemplate = $('#streaming-template').html();
		var streamingScript = Handlebars.compile(streamingTemplate);
		
		$('.loader').fadeOut(1000);
		$('#slideshow-content').append(slideshowScript(data));
		$('#games-content').append(gamesScript(data));
		$('#streaming-content').append(streamingScript(data));
		
		//Replace img
		$('#slideshow .item img').each(function(){
			var imgSrc = $(this).attr('src');
			$(this).parent().css({'background-image': 'url('+ imgSrc + ')'});
			$(this).remove();
		});

		//activate carouse
		$('.carousel').carousel({
			pause: false
		});
	});

	$('.reload').click(function() {
    window.location.reload();
 	 });
	
	$('.navbar-fixed-top').on('activate.bs.scrollspy', function(){
		var hash = $(this).find('li.active a').attr('href');

		if (hash !== '#slideshow') {
			$('header nav').addClass('inbody');
		} else {
			$('header nav').removeClass('inbody');
		}
	});

	$(document).on('click','.openpetmodal', function(){
		$('.modal-heroname').html($(this).data('heroname'));
		$('.modal-herotype').html($(this).data('herotype'));
		$('.modal-heroinfo').html($(this).data('heroinfo'));
		$('.modal-heroimage').attr('src','images/game_images/'+$(this).data('heroimage') + ('.jpg'));
		$('.modal-heroimage').attr('alt',$(this).data('heroname') + 'photo');
	});

  //Use smooth scrolling when clicking on navigation
  $('.navbar a').click(function() {
    if (location.pathname.replace(/^\//,'') ===
      this.pathname.replace(/^\//,'') &&
      location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top-topoffset+2
        }, 500);
        return false;
      } //target.length
    } //click function
  }); //smooth scrolling

	$('body').scrollspy({
		target: 'header .navbar',
		offset: topoffset
	});
});//page ready