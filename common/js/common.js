$(window).resize(function () {
    setSectionLeft('#sidebar > ul li.show ul',80,220);
    setSectionLeft('#sidebar > ul li.show ul',165,165);
});

$(document).ready(function () {
	var rightNav =[{
		'name':'系统',
		'links':'settings',
		'class':'menu_ico',
		'href':'javascript:;',
		'list':[{'name': '商家信息', 'href': 'javascript:;', 'class':''}, {'name': '帐号管理','href': 'javascript:;','class':''}, {'name': '第三方接入', 'href': 'javascript:;','class':''}]
		
	}];
	 var menus = [{
            'name': '首页',
            'links': 'index',
            'class':'menu_1',
            'href':'javascript:;',
            'list':''
        },
        {
            'name': '运营',
            'links': 'operation',
            'class':'menu_2',
            'href':'javascript:;',
            'list': [{
                'name': '运营模块',
                'href':'javascript:;',
                'links': 'Coupons',
                'list': [{'name': '优惠券',  'href': '#' , 'class':'menu_1_1_1','list':''}]
            }]
        },
        {
            'name': '电商',
            'links': 'ec',
            'class':'menu_3',
            'href':'javascript:;',
            'list': [{
                'name': '电商1',
                'links': 'ec1',
                'list': [{'name': '优惠券1', 'href': '#', 'class':'menu_1_1_1'  }, {
                    'name': '优惠券3',
                    'href': '#', 'class':'menu_1_1_1'
                }]
            }
            ]
        },
        {
            'name': '门店',
            'links': 'store',
            'class':'menu_4',
            'href':'javascript:;',
            'list': [{
		                'name': '门店1',
		                'links': 'store1',
		                'href':'javascript:;',
		                'list': [{'name': '优惠券1', 'href': '#','list':'', 'class':'menu_1_1_1'}, {'name': '优惠券3','href': '#', 'class':'menu_1_1_1'
		                   		 }]
	                 }, {
	                    'name': '门店2',
	                    'links': 'store2',
	                    'href':'javascript:;',
	                    'list': [{'name': '优惠券2', 'href': '#', 'class':'menu_1_1_1'}]
	                }, {
	                    'name': '门店3',
	                    'links': 'store3',
	                    'href':'javascript:;'
	                }]
        },
        {
            'name': '客流',
            'links': 'custom',
            'class':'menu_5',
            'href':'javascript:;',
            'list': [{
	                'name': '客户',
	                'links': 'youhuiquan',
	                'href':'javascript:;',
	                'list': [{'name': '优惠券1',  'href': '#', 'class':'menu_1_1_1'}, {'name': '优惠券3','href': '#', 'class':'menu_1_1_1'}]
	                },
	                {'name': '管理',
                    'links': 'kehuguanli',
                    'href':'javascript:;',
                    'list': [{'name': '优惠券2',  'href': '#', 'class':'menu_1_1_1'}]
	                }]
         }];
	var sys = [{
            'name': '商家信息',
            'links': 'index',
            'class':'menu_1',
            'href':'javascript:;',
            'list': []
        },
          {
            'name': '账号管理',
            'links': 'operation',
            'class':'menu_2',
            'href':'javascript:;',
            'list': [{'name': '微信接口','links': '','list': ''},{'name': '微信菜单','links': '','list': '' },{'name': '微回复','links': '','list': ''}]
          },
          {
            'name': '第三方接入',
            'links': 'ec',
            'class':'menu_3',
            'href':'javascript:;',
            'list': [{'name': '微信接口','links': '','list': ''}, {'name': '微信菜单', 'links': '','list': ''},{'name': '微回复','links': '','list': ''}]
            }]
	
	
	/*
	 * obj:菜单函数实例化
	 * data:数据结构：
	 * [{
	 * 	'name':'',
	 *  'links':'',
	 *  'class':'',
	 *  'href':'',
	 *  'list':[{...},{...},{...}]
	 * },{...}]
	 */
    $.ajax({
        type:"post",
        url:durl,
        async:true,
        success:function(data){
            var odata = JSON.parse(data);
            var os = new menuTree();
                os.init({
                    "targetId":"sysInfo",
                    "data":odata.rightNav,
                    "url":'',
                    "action":"hover"});
            if($('#sidebar').length>0){
                 var menu = new menuTree();
                 menu.init({
                    "targetId":"sidebar",
                    "data":odata.menus,
                    "url":'',
                    "action":"click",
                    "callBack":function(){
                        setSectionLeft('#sidebar > ul > li.show >ul',80,220);
                    }
                 });
                 setSectionLeft('#sidebar > ul > li.show >ul',80,220);
            }else{
                 var menu = new menuTree();
                 menu.init({
                    "targetId":"sts_sidebar",
                    "data":odata.sys,
                    "url":'',
                    "action":"click"
                 });
                 setSectionLeft('#sidebar > ul > li.show >ul',165,165);
            }
        }
    });
});

/*
 *[menuTree 生成导航菜单]
 * @param  {object} setting
 *   {
 *    targetId: ID值,必须有
 * 	      data: 直接传入菜单数据，
 *         url： ajax请求数据的接口，
 *      action: 打开下级菜单的方式，默认'click'，滑动打开则是'hover'
 *   }
 */
function menuTree(){
				this.html = '';
				this.obj = null ;
				this.config = {
					'data':'',
					'url':'',
					'action':'click',
					'callBack':null
				}
			}
			menuTree.prototype.init = function(setting){
				var _config = $.extend(this.config,setting);
				this.obj = $('#'+_config.targetId);
				if(_config.url != '' && _config.url != null && _config.url != 'undefined'){
					this.getData(_config.url);
				}else{
					this.forTree(_config.data);
				}
				this.obj.append(this.html);	
				_config.action == 'click' ?this.menuClick(_config.callBack):this.menuHover(_config.callBack);;
				this.setsideBarHeigh(_config.targetId,80);
				
			}
			menuTree.prototype.forTree = function(data){
				this.html += '<ul><i></i>';
				for(var i=0,ii=data.length;i<ii;i++){
					if(typeof data[i].url == 'undefined'){
						this.html += '<li><span class="' + data[i].class+ '"></span><a href="javascript:;">'+ data[i].name+'</a><i class="arrow"></i>';
					}else{
						this.html += '<li><span class="' + data[i].class+ '"></span><a hreft="'+  data[i].url +'">'+ data[i].name+'</a><i class="arrow"></i>';
					}
					if(data[i].list != null && data[i].list.length >0){
						this.forTree(data[i].list);
					}
					this.html +='</li>';
				}
				this.html +='</ul>';
			}
			menuTree.prototype.getData = function(durl){
				$.ajax({
					type:"post",
					url:durl,
					async:true,
					success:function(result){
						var oresult = JSON.parse(result);
						this.forTree(oresult);
					}
				});
			}
			menuTree.prototype.menuClick = function(callback){
				var menuEls = this.obj.find('li');
				for(var i=0,ii=menuEls.length;i<ii;i++){
					menuEls[i].onclick=function() {	
						$(this).siblings('li').removeClass('show');
						this.className+=(this.className.length>0? " ": "") + "show";
						//TODO
						callback();
					}
				}
			}
			menuTree.prototype.menuHover = function(){
				var menuEls = this.obj.find('li');
				for(var i=0,ii=menuEls.length;i<ii;i++){
					menuEls[i].onmouseover=function() {
						this.className+=(this.className.length>0? " ": "") + "show";
					}
					menuEls[i].onmouseout=function() {
						this.className=this.className.replace(new RegExp("( ?|^)show\\b"), "");
					}
				}
			}
			menuTree.prototype.setsideBarHeigh = function(obj,val){
				var h = $(window).height() - val;
		        var ch = $('#'+obj).height();
		        if (ch < h) {
		            $('#'+obj).css('height', h + 'px');
		        }
			}

 
 /*根据sideBar的宽度设置section的左边距*/
 function setSectionLeft(obj,smallLeft,largeLeft){
 	if($(obj).css('display') == 'block'){
		$('#section').css('margin-left', ''+ largeLeft +'px');
	}else{
		$('#section').css('margin-left',''+ smallLeft +'px');
	}
 }
/**
 * 漂浮弹窗
 * setting对象
 * { 
 *     boxID:{string},//必填参数 表示弹出对话框的id为boxID + 'Dia'
 *     width:{number},//div.data-content的宽度
 *     closeOther: {boolean},//是否关闭之前弹框，默认关闭之前全部弹框
 *     isDelwFade: {boolean},//关闭弹框时是否删除弹框dom，默认true默认删除
 *     title:{string},//弹框标题
 *     html:{string},//插入到div.data-content .dia-main的html内容，
 *     buttons:{arrgy} [{value: '确认',className: 'dia-close',callbackFun: {function}},{...}...]//操作按钮
 *     buttons参数可传入null使用默认按钮，[]传入无按钮,     
 * }
 * 打开新弹窗时会先关闭已有弹窗
 */
$.lightBox = function(setting){
    return new $.lightBox.prototype.init( setting );
}
$.lightBox.prototype = {
    constructor:$.lightBox,
    init: function(setting){
        // $.lightBox.list = $.lightBox.list || {};
        // for(var k in $.lightBox.list ){
        //     if( !$.lightBox.list[k].isHide )$.lightBox.list[k].close();
        // }
        // TODO 扩展多层弹框
        this.setting = $.extend( {
            width: 760,
            closeOther: true,
            isDelwFade: true
        },setting  );
        this.setting.buttons = this.setting.buttons || ([{value: '确定', className: 'dia-close bright-button'}]);
        //默认删除之前弹框
        this.id = this.setting.boxID + 'Dia';
        if( this.setting.closeOther && $('.data-dia')[0] ) {
            $('#'+this.id).remove();
        }
        //添加弹框dom
        var h = this.createDiaHTML();
        $('body').append(h);
        this.dom = $('#' + this.id);
        var btnIDpr = '#' + this.id + '_btn';
        for(var kk in this.setting.buttons){
            if ( typeof this.setting.buttons[kk].callbackFun == 'function' ){
                $(btnIDpr + kk).on('click',this.setting.buttons[kk].callbackFun);
                $(btnIDpr + kk)[0].lightBox = this;
            }
        }

        //展现关闭弹框
        this.dom.fadeIn();
        this.dom.css('display', 'flex');
        var that = this;
        $(this.dom).find('.fix,.dia-close').on('click',function(){
            that.dom.fadeOut();
            setTimeout(function(){
                $(that.dom).find('.fix').detach();

                if ( that.setting.isDelwFade ) {
                    $(that.dom).remove();
                }
            },500);
        });

        //TODO radio增加点击效果
        $(this.dom).find('.radio-input').on('click',function(){
            $('.data-dia .radio-input').removeClass('check');
            // $('.data-dia input[name=status]').attr('checked',false);
            $(this).addClass('check');
            // $(this).siblings().attr('checked',true);
        });
        //返回弹窗dom
        return this.dom;
    },
    close: function(){
        this.dom.fadeOut();
        setTimeout(function(){
            $(this.dom).find('.fix').detach();
        },500);
    },
    createDiaHTML: function(){
        var h = '<div class="data-dia" id="' + this.id + '">'
            + '<div class="fix"></div>'
            + '<div class="data-content" style="width:' + this.setting.width +'px;color: #666;">';
        if ( this.setting.title ) {
            h += '<div class="dia-header">'
                + '<span class="dia-title">' + this.setting.title + '</span>'
                + '<a class="dia-close dia-cha" href="javascript:;" title="关闭">×</a></div>';
        }
        h += '<div class="dia-main clearfix">'
            + this.setting.html
            + '</div>';
        if ( this.setting.buttons ) {
            h += '<div class="dia-footer">';
            for(var k in this.setting.buttons) {
                if ( k != 0 ){
                    h += '&emsp;'
                }
                h += '<input type="button" id="' + this.id + '_btn' + k + '" class="' + this.setting.buttons[k].className + '" value="' + this.setting.buttons[k].value + '" />';
            }
            h += '</div>'
        }
        h += '</div></div>';
        return h;
    }
}
$.lightBox.prototype.init.prototype = $.lightBox.prototype;
$.lightBox.getCurDia = function(curDom){
    var tempDom = curDom;
    if ( tempDom && tempDom[0] ) {
        var tempClassname = $(tempDom).attr('class');
        while ( !tempClassname || tempClassname.indexOf('data-dia') == -1 ) {
            tempDom = $(tempDom).parent();
            if ( $(tempDom)[0] === document.body ) {
                return null;
            }
            tempClassname = $(tempDom).attr('class');
        }
        return tempDom;
    } else {
        return null;
    }
}
$.lightBox.showBox = function(lightBoxId){
    $('#' + lightBoxId).prepend('<div class="fix"></div>');
    $('#' + lightBoxId).fadeIn();
    $('#' + lightBoxId).css('display','flex');
}
$.lightBox.closeBox = function(thisLightBox){
    var diaObj = thisLightBox.dom;
    $(diaObj).fadeOut();
    setTimeout(function(){
        $(diaObj).find('.fix').detach();
        if ( thisLightBox.setting.isDelwFade ) {
            $(diaObj).remove();
        }
    },500);
}
$.lightBox.closeALL = function(){
    $('.data-dia').fadeOut();
    setTimeout(function(){
        $('.fix').detach();
        $('#'+this.id).remove();
    },500);
}

function dialog(obj) {
    var r = $(obj).data('role');
    var d = $("#" + r + "");
    d.prepend("<div class='fix'></div>");
    d.fadeIn();
    d.css('display', 'flex');
    $('#'+r+' .fix,#'+r+' .close_log').on('click', function () {
        d.fadeOut();
        setTimeout(function () {
            $('#'+r+' .fix').detach();
        }, 500)
    });
}


