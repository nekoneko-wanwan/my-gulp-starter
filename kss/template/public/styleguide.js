$(function(){
	hljs.initHighlightingOnLoad();

	var paths = window.location.pathname.split('/');
	var path = paths[paths.length - 1];
	$('.styleguide-menu').find('a[href="'+path+'"]').addClass('selected');

	// var ref = $('.styleguide-menu').find('.styleguide-menu-list').data('kss-ref');
	// $('.styleguide-menu').find('a').eq(ref).addClass('selected');
});