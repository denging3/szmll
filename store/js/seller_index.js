$(document).ready(function(){
	$('.nav-li').on('click',function(){
		if( $(this).attr('class').indexOf('open') != -1 ){
			$(this).removeClass('open');
		}else if($(this).find('ul')[0]){
			$(this).addClass('open');
		}else{
			window.location.href = $(this).attr('data-link') + '.html';
		}
	})
})