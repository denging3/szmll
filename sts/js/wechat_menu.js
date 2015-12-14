$('.js_addMenuBox').on('click',function(){
	$('.parent_menu_list>.current').removeClass('current');
	$('.parent_menu_list>.child_current').removeClass('child_current');
	var html;
	html = '<li class="parent_menu_item grid_item current"><a class="parent_menu_link">+<span>添加菜单</span></a><div class="child_menu_box"><ul class="child_menu_list"><li class="js_addMenuBox2"><a class="js_subView "><span class="child_menu_innder">+</span></a></li></ul><span class="arrowl arrow_out"></span><span class="arrowl arrow_in"></span></div></li>';
	$(this).before(html);
	setClass();
	resetCurrent();
});

$('.parent_menu_list').on('click','.js_addMenuBox2',function(){
	$('.current').removeClass('current').addClass('child_current');
	var html;
	html = '<li class="current select4a"><a class="js_subView"><span class="child_menu_innder"><span class="js_title">子菜单名称</span></span></a></li>';
	$(this).before(html);
	resetChildCurrent(this);
})




function setClass(){
	var listLi = $('.parent_menu_list>li');
	var listLeng = listLi.length;
	var sizeOf = '';
	if(listLeng == 1){
		sizeOf = 'sizeof1';
	}else if(listLeng == 2){
		sizeOf = 'sizeof2';
		$('.js_addMenuTips').remove();
	}else{
		sizeOf = 'sizeof3';
	}
	for(var i=0;i<listLeng;i++){
		$(listLi[i]).removeClass('sizeof1 sizeof2 sizeof3').addClass(sizeOf);
	}
}

function resetChildCurrent(){
	$('.js_addMenuBox2').prevAll().on('click',function(){
		$('.current').removeClass('current').addClass('child_current');
		$(this).addClass('current');
		return false
	})
}
function resetCurrent(){
	$('.js_addMenuBox').prevAll().on('click',function(){
		$('.current').removeClass('current');
		$('.child_current').removeClass('child_current');
		$(this).addClass('current');
	})
}



/*function chatMenu(obj){
	this.L = '';
	this.sizeof  = 'sizeof1';
	this.current = 'cureent';
}
chatMenu.prototype {
	on:function(){
		
	},
	addList:function(){
		
	},
	setClass:function(){
		
	}
}*/
