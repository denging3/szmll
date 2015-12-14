$(document).ready(function(){
	//设置左菜单高度
	var HEADHEIGHT = 80;
	$('#sidebar').css('height',$(window).height()-HEADHEIGHT);
	//左菜单点击链接
	$('.nav-li').on('click',function(){
		if( $(this).attr('class').indexOf('open') != -1 ){
			$(this).removeClass('open');
		}else if($(this).find('ul')[0]){
			$(this).addClass('open');
		}else{
			window.location.href = $(this).attr('data-link') + '.html';
		}
	});

	//单选按钮选择效果
	// if( $('.radio-input')[0] ) {
	// 	$('.radio-input').on('click',function(){
	//         $('input[name=status]').attr('checked',false);
	//         $('.radio-input').removeClass('check');
	//         $(this).addClass('check');
	//         $(this).siblings().attr('checked',true);
	//     });
	// }
});