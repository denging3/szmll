/*初始化配置*/
    var IsDrag = 'off';
	initMenuList();
	initMenuData();
	setClass();
	binSetImgPop();
	binParentClick();
	binChildClick();
	resetCurrent();
	resetChildCurrent();

$(document).one('click',function(){
	binSetImgPop();
})

/*添加父级菜单*/
function binParentClick(){
	$('.js_addMenuBox').unbind('click').on('click',function(){
		updateCacheData();
		$('.parent_menu_list>.current').removeClass('current');
		$('.parent_menu_list>.child_current').removeClass('child_current');
		var liId ='menu_'+$('.parent_menu_list>li').length;
		var pL = $('.parent_menu_list>li').length;
		var html = '<li class="parent_menu_item grid_item current" id='+ liId +'>'
					+'<a class="parent_menu_link"><i class="menu_ico_dot"></i><i class="sort_gray"></i>'
						+'<span class="js_title">菜单名称</span>'
					+'</a>'
					+'<div class="child_menu_box">'
						+'<ul class="child_menu_list" id="child_'+ liId +'">'
							+'<li class="js_addMenuBox2" data-role="delParentMenuBox">'
								+'<a href="javascript:void(0);" class="js_subView ">'
									+'<span class="child_menu_innder"><i class="addmenu_gray sub_addmenu"></i></span>'
								+'</a>'
							+'</li>'
						+'</ul>'
						+'<span class="arrowl arrow_out"></span><span class="arrowl arrow_in"></span>'
					+'</div>'
				+'</li>';		
		$(this).before(html);
		setClass();
		resetCurrent();
		delDisabled('#js_saveBtn',pL,0);
		delDisabled('#js_stortable',pL,1);
		binChildClick();
		saveCacheData(liId,'p');
		dataInSetting(liId);
		//从后端获取key值
		$('#'+liId).data('cacheData').key = getMenuKey();

		/*$('#js_appImgPop').on('click',function(e){
			$('#settingInfo').find('.setting_info').load('sys/ntpl/toInformationPage');
			//取图文消息
			//getModelTypes();
			dialogset(this);
		})*/
		
		$('.editor_inner,#js_fault_tips,#wechat_publis_tips,.frm_msg').css('display','none');
		$('#js_status_1,#wechat_edite_tips').css('display','block').attr('data-id',liId);
		$('#js_rightBox,#js_status_1').attr('data-id',liId);
		$('#js_menuTitle1,#js_menuTitle2').html('菜单名称');
		$('#input_title').val('菜单名称');
	});
}

function binSetImgPop(){
	$('#js_appImgPop').unbind('click').on('click',function(e){
		var This = this;
		$('#settingInfo').find('.setting_info').load('sys/ntpl/toInformationPage',function(){
			//取图文消息
			getModelTypes();
		});
		dialogset(this);
	})
}

/* 添加子菜单 */
function binChildClick(){
	$('.js_addMenuBox2').unbind('blick').on('click',function(e){
		e.stopImmediatePropagation();
		updateCacheData();
		var pId = $(this).parents('.parent_menu_item').attr('id');
		if(pId){
			var cacheData = $('#'+pId).data('cacheData');
			if(cacheData.url != '' || cacheData.picMessage.length >0 || cacheData.message.msg != '' ){
				dialogadd(this,pId);
				return false;
			}
		}
		addChild(this);
		return false;
	})
}

function addChild(obj){
		$('.current').removeClass('current').addClass('child_current');
		var pId = $(obj).parents('li').attr('id');
		var liId = Date.parse(new Date())+ '_childmenu_'+pId+ '_' + $(obj).prevAll().length;
		var cL = $('.child_menu_list li').length;
		var html = '<li class="current" id="'+ liId +'">'
				+'<a href="javascript:void(0);"  class="js_subView">'
					+'<span class="child_menu_innder">'
						+'<span class="js_title">子菜单名称</span>'
					+'</span>'
				+'</a>'
			 +'</li>';			 
		$(obj).before(html);
		resetChildCurrent();
		delDisabled('#js_stortable',cL,1);	
		saveCacheData(liId);
		dataInSetting(liId);
		//从后端获取key值
	    $('#'+liId).data('cacheData').key = getMenuKey();
		
		$('#'+pId).find('.menu_ico_dot').css('display','inline-block');
		$('.editor_inner,#wechat_publis_tips,#js_fault_tips,.frm_msg').css('display','none');
		$('#js_status_1,#wechat_edite_tips').css('display','block');
		$('#js_rightBox,#js_status_1').attr('data-id',liId);
		$('#js_menuTitle1,#js_menuTitle2').html('子菜单名称');
		$('#input_title').val('子菜单名称');
}

/* 重置菜单的宽度 */
function setClass(){
	var listLi = $('.parent_menu_list>li');
	var listLeng = listLi.length;
	var sizeOf = '';
	if(listLeng == 1){
		sizeOf = 'sizeof1';
		$('.js_addMenuTips').html('添加菜单');
	}else if(listLeng == 2){
		sizeOf = 'sizeof2';
		$('.js_addMenuTips').html('');
	}else{
		sizeOf = 'sizeof3';
	}
	for(var i=0;i<listLeng;i++){
		$(listLi[i]).removeClass('sizeof1 sizeof2 sizeof3').addClass(sizeOf);
	}
}

/* 当子菜单点击时，触发焦点样式的更改，以及同步右边设置菜单的值 */

function resetChildCurrent(){
	$('.js_addMenuBox2').prevAll().unbind('click').on('click',function(e){
		if(IsDrag == 'off'){
			updateCacheData();
			var liId = $(this).attr('id');
			var menuTitle =  $(this).find('.js_title').html();
			$('.current').removeClass('current').addClass('child_current');
			$(this).addClass('current');
			$('.frm_msg,.editor_inner,#js_fault_tips,.msg_tab>.preview_list,#wechat_publis_tips').css('display','none');
			$('.msg_tab>.jsMsgSendTab,#wechat_edite_tips,#js_status_1').css('display','block');	
			$('#js_rightBox,#js_status_1').attr('data-id',liId);
			$('#js_menuTitle1').html(menuTitle);
			$('#input_title').val(menuTitle);
			$('#js_menuTitle2').html('子菜单名称');	
			dataInSetting(liId);
			e.stopImmediatePropagation();
			return false;
		}	
	})
}

function resetCurrent(){
	$('.js_addMenuBox').prevAll().unbind('click').on('click',function(e){
		if(IsDrag == 'off'){
			updateCacheData();
			var liId = $(this).attr('id');
			var menuTitle =  $(this).find('.js_title').html();
			var liLength = $(this).find('ul>li').length;
			$('.current').removeClass('current');
			$(this).addClass('current');
			$('.child_current').removeClass('child_current');
			$('#js_fault_tips,.editor_inner,.frm_msg,#wechat_publis_tips').css('display','none');
			$('#wechat_edite_tips').css('display','block');
			$('#js_rightBox').attr('data-id',liId);
			if(liLength>1){
				$('#js_status_3').css('display','block').attr('data-id',liId);
				$('#js_menuTitle3').html(menuTitle);
				$('#input_title2').val(menuTitle);
				$('#js_menuTitle4').html('菜单名称');
			}else{
				$('#js_status_1').css('display','block').attr('data-id',liId);
				$('#js_menuTitle1').html(menuTitle);
				$('#input_title').val(menuTitle);
				$('#js_menuTitle2').html('菜单名称');
			}
			dataInSetting(liId);
			e.stopImmediatePropagation();
			
		}else{
			$('.current').removeClass('current');
			$('.child_current').removeClass('child_current');
			$(this).addClass('child_current');	
		}
	})
}

/*去除disabled*/
function delDisabled(obj,objnum,bnum){
	if(objnum >bnum){
		$(obj).removeAttr('disabled');
	}
}

/*检查是否输入,并更改菜单名称*/
function checkLength(obj,maxlen,target,text){
	var val = $(obj).val();
	var vLeng = len(val);
	var liId = $('#js_rightBox').attr('data-id');
	var menuTitle = $('#'+liId+'>a').find('.js_title');
	var target = $(target);
	$('.frm_msg').css('display','none');
	if(vLeng == 0){
		$('.js_titlenoTips').css('display','block');
		menuTitle.html(text);
		target.html(text);
	}else if(vLeng > maxlen){
		$('.js_titleEorTips').css('display','block');
		subVal = subStringChar(val,maxlen);
		menuTitle.html(subVal);
		target.html(subVal);
	}else{
		menuTitle.html(val);
		target.html(val);
	}
}
$('#input_title2').on('keyup',function(){
	checkLength(this,8,'#js_menuTitle3','菜单名称');
});
$('#input_title').on('keyup',function(){
	checkLength(this,16,'#js_menuTitle1','子菜单名称');
});


/* 删除li菜单 */
$('#jsDelBt').on('click',function(){
	$('.editor_inner').css('display','none');
	var liId = $('#js_rightBox').attr('data-id');
	var oO = $('#'+liId).parents('li');
	var pL = $('.parent_menu_item').length;
	var cL = $('.child_menu_list li').length;
	$('#'+liId).remove();
	var oL = oO.find('li').length;
	setClass();
	$('#js_status_1').css('display','none');
	if(oL<2){
		oO.find('.menu_ico_dot').css('display','none');
	}	
	if(pL<2){
		$('#js_status_2').css('display','block');	
		$('#js_stortable').attr('disabled','disabled');
		$('#js_saveBtn').attr('disabled','disabled');	
	}else{
		$('#js_status_5').css('display','block');
	}
	if(cL<4){
		$('#js_stortable').attr('disabled','disabled');
	}
})

/* 触发排序事件 */
$('#js_stortable').on('click',function(){
	updateCacheData();
	joinData();
	initMenuData();
	$('#js_stortable,.setting_btn,.menu_ico_dot').css('display','none');
	$('#js_saveSort,.sort_gray').css('display','inline-block');
	$('.current').removeClass('current')
	$('.editor_inner').css('display','none');
	$('#js_status_4').css('display','block');
	$('.parent_menu_item').each(function(i,value){
		if($(this).find('li').length < 2){
			$(this).find('.child_menu_box').remove();
		}
	})
	$('.js_addMenuBox,.js_addMenuBox2').remove();
	setClass();
	IsDrag = 'on';
	if(IsDrag == 'on'){
		$( "#parent_menu" ).sortable({
	   	axis:"x",
        cursor: "move",
        cursorAt: {left:40,bottom:5},
        items :">li",  
        opacity: 0.8,    
	    });
	    $('.parent_menu_list>li').each(function(i,value){
			var pId = $(this).attr('id');
			var cId =$('#'+pId).find('ul').attr('id');
			$("#"+cId).sortable({
			  revert:true,
		   	  axis:"y",
	          cursor: "move",
	          cursorAt: {left:40,bottom:5},
	          items :"li",             
	          opacity: 0.8,                      
	         });		
		 });
	}
})

/*提示消息*/
$('#js_status_2,#wechat_edite_tips').css('display','block');
	$('#js_status_1').on('click',function(){
		$('#js_fault_tips').css('display','none');
	})

/*跳出弹窗*/
$('#js_delBtn').on('click',function(){
	dialogs(this,
		'400px',
		'确认信息',
		'删除确认',
		'删除后“一级导航”菜单下设置的内容将被删除',
		'views/images/warn_ico.png');
})
$('#js_delBtn2').on('click',function(){
	dialogs(this,
		'400px',
		'确认信息',
		'删除确认',
		'删除后菜单下设置的内容将被删除',
		'views/images/warn_ico.png');
})

/*保存数据时做检测,检测不通过跳回到第一条为空的数据*/
$('#js_saveBtn').on('click',function(){
	joinData();
	var msgImg = $('.js_appmsgArea').find('.preview_list');
	var msgText = $.trim($('.js_editorArea').html());
	var msgUrl = $('#urlText').val();
	if($('#js_status_3').length>0){	
	   if(!checkIsNull()){
	   		return false;
	   }
	}
	else{
		if(msgImg.length < 1 && msgText.length < 1 && msgUrl == ''){
			$('#js_fault_tips').css('display','inline-block');
			return false;
		}else {
			return checkIsNull();
		}
	}
	dialogs(this,
	'470px',
	'发布确认',
	'发布成功后会覆盖原版本，且将在12小时内对所有用户生效，确认发布?',
	'&nbsp;');
})

function checkIsNull(){
	var cacheData = $('#menuBoxData').data().menus;
	var isNull = true;
		for(var i=0;i<cacheData.length;i++){
			 if(cacheData[i].subMenus.length > 0){
				for(var k=0;k<cacheData[i].subMenus.length;k++){
					if(cacheData[i].subMenus[k].message.msg == '' && cacheData[i].subMenus[k].picMessage.length < 1 && cacheData[i].subMenus[k].url == ''){
						$('#'+cacheData[i].listId).click();
						$('#'+cacheData[i].subMenus[k].listId).click();
						$('#js_fault_tips').css('display','inline-block');
						isNull=false;
						return false;
					}
				}
			}else{
				if(cacheData[i].message.msg == '' && cacheData[i].picMessage.length < 1 && cacheData[i].url == ''){
						$('#'+cacheData[i].listId).click();
						$('#js_fault_tips').css('display','inline-block');
						isNull = false;
						return false;
					}
			}
		}
	return isNull;
}

$('#js_appmsgPop').on('click',function(){
	//$('#settingInfoImg').find('.setting_info').load('page/information.html');
	$('#settingInfoImg').find('.setting_info').load('sys/ntpl/toInformationPage',function(){
		//取图文链接
		getPicModelTypes();
	});
	dialogset(this);
	$('#'+$(this).data('role')).find('.demo_title_img').html('图文链接');
})

$('#js_previewInfo').on('click',function(){
	joinData();
	dialogset(this);
})

function dialogs(obj,wd,title,tip_titile,tip_content,src){
	$('.data-dia').prepend("<div class='fix'></div>");
	var r = $(obj).data('role');
    var d = $("#" + r + "");
    d.find('.tips_title').html(title);
    d.find('.tips_info_title').html(tip_titile);
    d.find('.tips_info_cont').html(tip_content);
    d.find('.data-content').css('width',wd);
    if(src){
   	 	d.find('img').attr('src',src);
   	 	d.find('img').css('display','inline-block');
    }else{
     	d.find('img').css('display','none');
    }
    d.fadeIn();
    d.css('display', 'flex');
    $('.fix,.close_log,.cancel,.confirm').on('click',function () {
        d.fadeOut();
        setTimeout(function(){
        	$('.fix').detach();
        },500)
    });
}

function dialogset(obj){
	$('.data-dia').prepend("<div class='fix'></div>");
	var r = $(obj).data('role');
    var d = $("#" + r + ""); 
    d.fadeIn();
    d.css('display', 'flex');
    $('.close_log,.cancel,.confirm').on('click',function () {
        d.fadeOut();
        setTimeout(function(){
        	$('.fix').detach();
        	d.find('.setting_info').html('');
        },500)
      
    });
}

function dialogadd(obj,pid){
	$('.data-dia').prepend("<div class='fix'></div>");
	var r = $(obj).data('role');
    var d = $("#" + r + ""); 
    d.fadeIn();
    d.css('display', 'flex');
    $('.close_log,.cancel').on('click',function(){
        d.fadeOut();
        setTimeout(function(){
        	$('.fix').detach();
        	d.find('.setting_info').html('');
        },500)
    });
    $('#jsAddChild').on('click',function(e){
        var pData = $('#'+pid).data('cacheData');
        pData.url = '';
		if(pData.picMessage != 'undefined'){
			pData.picMessage.length = 0;
		}
        pData.message.msg = '';
        d.fadeOut();
      	addChild(obj);
      	setTimeout(function(){
        	$('.fix').detach();
        	d.find('.setting_info').html('');
        },500)
      	$('#jsAddChild').unbind('click');
    });
}

function dialogSuccess(text){
	var html = '<p id="success_tips">'+text+'</p>';
	$('body').append(html);
	setTimeout(function(){
		$('#success_tips').remove()
	},2000);
}

/*设置图文消息后同步预览*/
$('#js_settingInfo').on('click',function(){
	var pId = $(this).parents('.data-dia').attr('id');
	var orignHtml = $('#'+pId).find('.demo_list').html();
	if($.trim(orignHtml).length != 0){
		var preHtml = '<div class="preview_list">';
		preHtml += orignHtml;
		preHtml +='<a href="javascript:;" class="js_delPreview">删除</a></div>';
		$('.msg_tab .js_appmsgArea').css('display','block');
		$('.msg_tab .jsMsgSendTab').css('display','none');
		$('.js_appmsgArea').append(preHtml);
		$('.js_delPreview').unbind('click').on('click',function(){
			$(this).parents('.preview_list').remove();
			$('.msg_tab .jsMsgSendTab').css('display','block');
		})
	}else{
		return false;
	}
	
})

/*设置图文链接回显页面*/
$('#js_settingInfoImg').on('click',function(){
   var url =	$('#settingInfoImg .img_check').parent('li').data('url');
   $('#urlText').val(url);
})

/*保存数据拼接JSON*/
$('#js_saveInfo').on('click',function(){
	joinData();
	//保存菜单数据
	var isSaved = false;
	var menus = JSON.stringify($('#menuBoxData').data());
	$.ajax({
		url:"sys/insertMenu",
		async:false,
		dataType:"json",
		data:{"jsonStr":menus},
		type:"POST",
		success:function(data){
			if(data.code==0){
				isSaved = true;
				dialogSuccess('发布成功！');
				$('	#wechat_edite_tips').css('display','none');
				$('	#wechat_publis_tips').css('display','block');
			}else{
				dialogSuccess('发布失败！'+data.msg);
			}
		}
	});
})


$('#js_saveSort').on('click',function(){
	IsDrag = 'off';
	joinData();
	initMenuList();
	initMenuData();
	binChildClick();
	setClass();
	binParentClick();
	resetCurrent();
	resetChildCurrent();
	$('#js_stortable,.setting_btn,#js_status_5').css('display','block');
	$('.editor_inner,#js_saveSort').css('display','none');
	$( "#parent_menu" ).sortable('destroy');
	dialogSuccess('排序保存成功！');
})

/*保存拼接数据*/
function joinData(){
	updateCacheData();
	var parentList =  $('.parent_menu_list>li:not(.js_addMenuBox)');
	var menuList = {
		"menus":[],
		"mchId":"111"
	}
	for(var i=0,ii=parentList.length;i<ii;i++){
		var childList = $(parentList[i]).find('li:not(.js_addMenuBox2)');
		var pdata = $(parentList[i]).data('cacheData');
		 	pdata.subMenus = [];
			for(var k=0;k<childList.length;k++){
				var cdata =  $(childList[k]).data('cacheData');
				pdata.subMenus.push(cdata);
			} 
		menuList.menus.push(pdata);
	}
	$('#menuBoxData').data(menuList);
	var datas= $('#menuBoxData').data();
}

/*写入菜单数据到菜单缓存中*/
function saveCacheData(obj,p){
	var cacheData = {
		"name":"",
		"listId":obj,
		"type":"click",
		"key":"",
		"url":"",
		"morp":"",
		"message":{"msg":""},
		"picMessage":[]
	};
	if(p && p == 'p'){
		cacheData.subMenus = [];
	}
	$('#'+obj).data('cacheData',cacheData);
}


/*更新菜单数据到菜单缓存中*/
function updateCacheData(){
	  var updateId = $('#js_rightBox').attr('data-id');
	  if(updateId && IsDrag == 'off'){
	  	    var originTextId = $('#js_rightBox div[data-id="'+updateId+'"]').attr('id');
		  	var originText = $('#' + originTextId);
		  	var cacheData = $('#'+updateId).data('cacheData');
		  	if(cacheData){
		  		var menuTitles = originText.find('.js_menu_name').val();
			  	cacheData.name = menuTitles;
			  	cacheData.listId = updateId;
				if(originTextId != 'js_status_3'){
				  	var menuType = originText.find('.frm_vertical_pt .selected').data('menutype');
				  	cacheData.type = menuType;			
				  	if(menuType == 'click'){
				  		var menuMorP = originText.find('.js_tab_navs .selected').data('type');
				  		cacheData.morp = menuMorP;
						if(cacheData.picMessage != "undefined"){
							cacheData.picMessage.length = 0;
						}
				  		if(menuMorP == 0){
				  		 	var picMessage = originText.find('.js_appmsgArea .preview_list > div');
						  	var menuPicM =[];
						  	for(var i=0,ii=picMessage.length;i<ii;i++){
						  		var picObj = {};
								var oPicMessage = $(picMessage[i]);
						  	    picObj.largePicUrl = $(picMessage[i]).find('p').parent().data('largeurl');
						  	    picObj.smallPicUrl = oPicMessage.data('smallurl');
								picObj.msg = oPicMessage.data('msg');
								picObj.url = oPicMessage.data('srcul');
						  	    picObj.title = $(picMessage[i]).find('p').html();
						  	    menuPicM.push(picObj);
						  }
					        cacheData.picMessage = menuPicM;
				  		}else{
				  			var menuText = originText.find('.js_textArea .js_editorArea').html();
				  			cacheData.message.msg = menuText;
				  		}
				  	}else{
				  		var menuUrl = originText.find('#urlText').val();
				  		cacheData.url = menuUrl;
				  	}
				}
		  	}
		  	console.log(cacheData);
	  }  
}

/*写入预览数据到预览图中*/
$('#js_previewInfo').on('click',function(){
	var menuBoxList = $('#menuBoxData').data();
	var pMenuList = menuBoxList.menus;
	var html ='<ul class="pre_menu_list" >';
			for(var i=0,ii=pMenuList.length;i<ii;i++){
				html +='<li class="pre_list_item" id="'+ pMenuList[i].listId+'">'
				      +'<a href="javascript:;">'
				      +'<i class="menu_ico_dot"></i>'+ pMenuList[i].name+'</a>';
					if(pMenuList[i].subMenus.length > 0){
						var subMenuList = pMenuList[i].subMenus;					
						html+='<div class="sub_pre_menu">'
							+'<ul class="sub_pre_menu_list">';
							for(var k=0,kk=subMenuList.length;k<kk;k++){
								html+='<li class="sub_list_item" id="'+subMenuList[k].listId+'">'
									 +'<a href="javascript:;">'+ subMenuList[k].name+'</a>'
									 +'</li>';
							}
						html+='</ul>'
								+'<span class="arrowl arrow_out"></span>'
								+'<span class="arrowl arrow_in"></span>'
								+'</div>';
					}
				html+='</li>';	
			}		
			html+='</ul>';
	$('.pre_footer').html(html);
	resetPreCurrent();
})

/*写入数据到设置图中*/
function dataInSetting(obj){
	var originData = $('#'+obj).data('cacheData');
	if(originData){
		var targetSet = $('#js_rightBox');
		if(originData.type == 'click'){
			targetSet.find('.frm_vertical_pt label').removeClass('selected');
			targetSet.find('.frm_vertical_pt label[data-menutype="click"]').addClass('selected');
			targetSet.find('#edit').css('display','block');
			targetSet.find('#url').css('display','none');
			targetSet.find('#urlText').val('');
			if(originData.morp == 0){
				targetSet.find('.tab_appmsg').addClass('selected');
				targetSet.find('.tab_text').removeClass('selected');
				targetSet.find('#js_tabInfo').css('display','block');
				targetSet.find('#js_tabText').css('display','none');
				targetSet.find('.js_textArea .js_editorArea').html('');
				if(originData.picMessage.length > 0){
					targetSet.find('.jsMsgSendTab').css('display','none');
					$('.preview_list').remove();
					var html ='<div class="preview_list">'
								+'<div class="demo_st"  data-srcul="'+originData.picMessage[0].url+'" data-largeurl="'+originData.picMessage[0].largePicUrl+'" data-smallurl="'+originData.picMessage[0].smallPicUrl+'" data-msg="'+originData.picMessage[0].msg+'">'
								+'<a class="close_demo" href="javascript:;"></a>'
								+'<p>'+ originData.picMessage[0].title+'</p>'
								+'<img src="'+ originData.picMessage[0].largePicUrl +'" alt="">'
								+'</div>';
								for(var i=1;i<originData.picMessage.length;i++){
									html+='<div class="deme_title_info"  data-srcul="'+ originData.picMessage[i].url +'" data-largeurl="'+ originData.picMessage[i].largePicUrl +'" data-smallurl="'+ originData.picMessage[i].smallPicUrl +'" data-msg="'+ originData.picMessage[i].msg +'">'
										+'<a class="close_demo" href="javascript:;"></a>'
										+'<p>'+ originData.picMessage[i].title +'</p>'
										+'<img src="'+ originData.picMessage[i].largePicUrl +'" alt="">'
										+'</div>';
								}
							html+='<a href="javascript:;" class="js_delPreview">删除</a></div>';	
				    targetSet.find('.js_appmsgArea').append(html);
				    $('.js_delPreview').unbind('click').on('click',function(){
						$(this).parents('.preview_list').remove();
						$('.msg_tab .jsMsgSendTab').css('display','block');
					})
				}else{
					targetSet.find('.jsMsgSendTab').css('display','block');
					targetSet.find('.preview_list').remove();
				}
				
			}else if(originData.morp == 1){
				targetSet.find('.tab_appmsg').removeClass('selected');
				targetSet.find('.tab_text').addClass('selected');
				targetSet.find('#js_tabInfo').css('display','none');
				targetSet.find('#js_tabText').css('display','block');
				targetSet.find('.js_textArea .js_editorArea').html(originData.message.msg);
			}
		}else{
			targetSet.find('.frm_vertical_pt label').removeClass('selected');
			targetSet.find('.frm_vertical_pt label[data-menutype="view"]').addClass('selected');
			targetSet.find('#edit').css('display','none');
			targetSet.find('#url').css('display','block');
			targetSet.find('#urlText').val(originData.url);
		}
	}
}

/*初始化菜单缓存数据*/
function initMenuData(){
	var initData = $('#menuBoxData').data();
	if(initData){
		var pData = initData.menus;
		if(pData.length > 0){
			for(var i=0,ii=pData.length;i<ii;i++){
			var cacheData = pData[i];
			$('#'+pData[i].listId).data('cacheData',cacheData);
					if(pData[i].subMenus.length >0){
						for(var k=0,kk=pData[i].subMenus.length;k<kk;k++){
							var cData = pData[i].subMenus[k];
							$('#'+pData[i].subMenus[k].listId).data('cacheData',cData);
						}
					}
			}
		}
	}
}

/*初始化菜单列表*/
function initMenuList(){
	var initData = $('#menuBoxData').data();
	if(initData){
		var pData = initData.menus;
		if(pData.length>0){
			var html='';
			for(var i=0,ii=pData.length;i<ii;i++){
				var cacheData = pData[i];
				$('#'+pData[i].listId).data('cacheData',cacheData);
				html += '<li class="parent_menu_item grid_item" id="'+ pData[i].listId +'">'
						+'<a class="parent_menu_link"><i class="menu_ico_dot"></i><i class="sort_gray"></i>'
						+'<span class="js_title">'+ pData[i].name+'</span>'
						+'</a>'
							+'<div class="child_menu_box">'
							+'<ul class="child_menu_list" id="child_'+ pData[i].listId +'">';
							if(pData[i].subMenus.length >0){
								for(var k=0,kk=pData[i].subMenus.length;k<kk;k++){
									html+='<li class="current" id="'+ pData[i].subMenus[k].listId+'">'
									+'<a href="javascript:void(0);" class="js_subView">'
									+'<span class="child_menu_innder"><span class="js_title">'+pData[i].subMenus[k].name+'</span></span>'
									+'</a>'
									+'</li>';
								}
							}
							html+='<li class="js_addMenuBox2" data-role="delParentMenuBox">'
								+'<a href="javascript:void(0);" class="js_subView ">'
								+'<span class="child_menu_innder">'
								+'<i class="addmenu_gray sub_addmenu"></i>'
								+'</span>'
								+'</a>'
								+'</li>'
							+'</ul>'
							+'<span class="arrowl arrow_out"></span><span class="arrowl arrow_in"></span>'
							+'</div>'
						+'</li>';
			}
		html += '<li class="js_addMenuBox parent_menu_item no_extra sizeof1" >'
					+'<a class="parent_menu_link"><i class="addmenu_gray"></i><span class="js_addMenuTips">添加按钮</span></a>'
				+'</li>';
			$('#parent_menu').html(html);
		}		
		$('.sort_gray').css('display','none');
		var pL = $('.parent_menu_list>li').length;
		delDisabled('#js_saveBtn',pL,0);
		delDisabled('#js_stortable',pL,1);
		for(var j=0;j<pData.length;j++){
			if(pData[j].subMenus.length>0){
				$('#'+pData[j].listId).find('.menu_ico_dot').css('display','inline-block');
			}
		}
	}
	
}

/*设置预览图点击样式*/
function resetPreCurrent(){
	$('#preViewPhone').find('.show_list').html('');
	$('.pre_list_item').on('click',function(){
		if($(this).find('.sub_list_item').length>0){
			$('.pre_phone .open').removeClass('open');
			$(this).find('.sub_pre_menu').addClass('open');					
			$('.sub_list_item').on('click',function(e){
				$('.pre_phone .open').removeClass('open');
				setPreCont(this);
				e.stopImmediatePropagation();
				return false;
			})
		}else{
			setPreCont(this);
		}
		
	})
}

/*添加预览手机内容*/
function setPreCont(obj){
	var subId = $(obj).attr('id');
	var cachData = $('#'+subId).data('cacheData');
	var html ='	<li class="show_item clearfix">'
		+'<img src="views/images/warn_ico.png" />'
		+'<div class="show_content">'
		+'<div class="preview_list">';
	if(cachData.morp == 0){
		if(cachData.picMessage.length >0){
			html+='<div class="demo_st clearfix" data-list="1">'
			+'<a class="close_demo" href="javascript:;"></a>'
			+'<p>'+ cachData.picMessage[0].title+'</p>'
			+'<img src="'+ cachData.picMessage[0].largePicUrl +'" alt="">'
			+'</div>';
			for(var i=1;i<cachData.picMessage.length;i++){
				html += '<div class="deme_title_info" data-list="1">'
				+'<a class="close_demo" href="javascript:;"></a>'
				+'<p>'+cachData.picMessage[0].title+'</p>'
				+'<img src="'+cachData.picMessage[i].smallPicUrl+'" alt="">'
				+'</div>';
			}
			html +='</div></div></li>';
			$('#preViewPhone').find('.show_list').append(html);
		}else{
			return false;
		}
	}else{
		html += cachData.message.msg;
		html +='</div></div></li>';
		$('#preViewPhone').find('.show_list').append(html);
	}
}

/*设置cookies方法*/
function setCookie(key,val,t){   
	var oDate = new Date();
	oDate.setDate(oDate.getDate()+t);
	document.cookie = key + '=' + val + ';expires=' +oDate.toGMTString();
} 
function getCookie(key){   
	var arr = document.cookie.split('; ');
	for(var i=0;i<arr.length; i++){
		arrkey = arr[i].split('=');
		if(arrkey[0] == key){
			return decodeURI(arrkey[1]);
		}
	}
}
function removeCookie(key){  
	setCookie(key,'',-1);
}
//setCookie('menuList',JSON.stringify(menuList));
//console.log(menuList);
//var menuL =JSON.parse(getCookie('menuList'));
//alert(menuL.button_list[0].name);

/*检查字符串与汉字长度*/
function len(val){
  return val.replace(/[^\x00-\xff]/g, "xx").length; 
}

/*截取中英文字符串，根据字符长度来计算*/
function subStringChar(str, len) {
        var newLength = 0;
        var newStr = "";
        var chineseRegex = /[^\x00-\xff]/g;
        var singleChar = "";
        var strLength = str.replace(chineseRegex,"**").length;
        for(var i = 0;i < strLength;i++) {
                singleChar = str.charAt(i).toString();
                if(singleChar.match(chineseRegex) != null) {
                      newLength += 2;
                }else{
                      newLength++;
                }
                if(newLength > len) {
                      break;
                }
                newStr += singleChar;
        }
        return newStr;
}
