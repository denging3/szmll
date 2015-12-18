
$(window).resize(function () {
    $('#sidebar').setsideBarHeigh( 111);
    $('#sts_sidebar').setsideBarHeigh(111);
});
$(document).ready(function () {
	var setting = {
	"msg":"1",
	"commonIco":"../common/images/common.png",
	"sysIco":"images/menu.png",
	"common":[{
            'name': '首页',
            'links': 'index',
            'list': ''
        },
        {
            'name': '运营',
            'links': 'operation',
            'list': [{
                'name': '运营模块',
                'links': 'Coupons',
                'list': [{'name': '优惠券',  'href': '#'}]
            }
            ]
        },
        {
            'name': '电商',
            'links': 'ec',
            'list': [{
                'name': '电商1',
                'links': 'ec1',
                'list': [{'name': '优惠券1', 'href': '#'}, {
                    'name': '优惠券3',
                    'href': '#'
                }]
            }
            ]
        },
        {
            'name': '门店',
            'links': 'store',
            'list': [{
		                'name': '门店1',
		                'links': 'store1',
		                'list': [{'name': '优惠券1', 'href': '#'}, {'name': '优惠券3','href': '#'
		                   		 }]
	                 }, {
	                    'name': '门店2',
	                    'links': 'store2',
	                    'list': [{'name': '优惠券2', 'href': '#'}]
	                }, {
	                    'name': '门店3',
	                    'links': 'store3',
	                    'list': ''
	                }]
        },
        {
            'name': '客流',
            'links': 'custom',
            'list': [{
	                'name': '客户',
	                'links': 'youhuiquan',
	                'list': [{'name': '优惠券1',  'href': '#'}, {'name': '优惠券3','href': '#'}]
	                },
	                {'name': '管理',
                    'links': 'kehuguanli',
                    'list': [{'name': '优惠券2',  'href': '#'}]
	                }]
         }],
	"sys":[{
            'name': '商家信息',
            'links': 'index',
            'list': []
        },
          {
            'name': '账号管理',
            'links': 'operation',
            'list': []
          },
          {
            'name': '第三方接入',
            'links': 'ec',
            'list': [{
                'name': '微信接口',
                'links': '',
                'list': ''
            	},
                {
                    'name': '微信菜单',
                    'links': '',
                    'list': ''
                },
                {
                    'name': '微回复',
                    'links': '',
                    'list': ''
                }]
            }],
	"rightNav":[{'name': '商家信息', 'url': 'javascript:;'}, {'name': '帐号管理','url': 'javascript:;'}, {'name': '第三方接入', 'url': 'javascript:;'}]
}
	
	/*
	 *	$.fn.sideBarInit(url);
	 * 
	 * 参数
	 *  	url  请求数据地址
	 * 返回数据data
	 * 		data.msg  0 没数据  1 成功
	 * 		data.common 后台数据
	 *      data.sys   系统导航
	 *      data.rightNav 右顶角列表
	 *      data.commonIco 后台导航图标
	 *      data.sysIco  系统导航图标
	 */
	
     $('#sysInfo').showList(setting.rightNav);
    
    if($('#sidebar').length>0){
        $('#sidebar').setSectionMargin('#section', 80, 220);
        /*
         *arguments 左边导航栏传递列表数据格式
         *u 设置为变量，为导航菜单雪碧图路径
         */
        $('#sidebar').sideBar(setting.common,setting.commonIco );
    }else{
        /*显示/隐藏下拉菜单*/
        $('#sidebar').setSectionMargin('#section', 165, 165);
        /*
         *arguments 左边导航栏传递列表数据格式
         *u 设置为变量，为导航菜单雪碧图路径
         */
        $('#sts_sidebar').Sts_sideBar(setting.sys,setting.sysIco);
    }
});



/*
 *导航菜单
 *_data 将导航菜单以json数据保存为参数传递，自动生成一级，二级，三级菜单
 */

$.fn.extend({
	sideBarInit:function(u){
		var setting = {
			"msg":"1",
			"commonIco":"../common/images/common.png",
			"sysIco":"images/menu.png",
			"common":[],
			"sys":[],
			"rightNav":[]
		}
		$.ajax({
			type:"post",
			url:u,
			async:true,
			success:function(result){
				var oresult = JSON.parse(result);  
				var oData =$.extend(setting, oresult);
				if(oData.msg == 1){	
					if($('#sidebar').length >0 ){
					   $('#sidebar').sideBar(oData.common,oData.commonIco);
					   $('#sysInfo').showList( oData.rightNav);
					   $('#sidebar').setSectionMargin('#section', 80, 220);
					}else{
					   $('#sts_sidebar').Sts_sideBar(oData.sys,oData.sysIco);
					   $('#sysInfo').showList( oData.rightNav);
					   $('#sts_sidebar').setSectionMargin('#section', 165, 165);
					}
				}else{
					console.log('没有数据');
				}
			}
		});
	},
    sideBar: function ( _data,_picUrl) {
        if (_data.length > 0) {
            $(this).append('<ul class="first_lev" id="first_lev"></ul>');
            var L = 0;
            for (var i = 0, ii = _data.length; i < ii; i++) {
                $('#first_lev').append('<li class="fir_li" data-link=' + _data[i].links + '><a style="background:url(' + _picUrl + ')0 '+ i*(-32)+'px;"></a><span>' + _data[i].name + '</span></li>');
                if (_data[i].list.length > 0) {
                    var html;
                    html = '<ul class="second_lev close" id=' + _data[i].links + '>';
                    for (var k = 0, kk = _data[i].list.length; k < kk; k++) {
                        html += '<li class="sec_li" data-link="' + _data[i].list[k].links + '"><span>' + _data[i].list[k].name + '</span><a class="arrow"></a>';
                        if (_data[i].list[k].list.length > 0) {
                            if (k == 0) {
                                html += '<ul class="third_lev" id="' + _data[i].list[k].links + '">';
                            } else {
                                html += '<ul class="third_lev close" id="' + _data[i].list[k].links + '">';
                            }
                            for (var y = 0, yy = _data[i].list[k].list.length; y < yy; y++) {	
                                html += '<li class="thir_li"><span style="background:url(' + _picUrl + ') -50px '+ L*(-14) +'px;"></span><a href="' + _data[i].list[k].list[y].href + '">' + _data[i].list[k].list[y].name + '</a></li>';
                                L++;
                            }
                            html += '</ul>';
                        }
                    }
                    html += '</ul>';
                    $(this).append(html);
                }
            }
            $('.first_lev li').dropDown('.second_lev');
            $('.second_lev li').dropDownArr('.third_lev');
            $(this).setsideBarHeigh(105);
        }
    },

    /*
     *展开一级菜单
     *target 显示的对象
     */
    dropDown: function (target) {
        $(this).on('click', function () {
            var id = $(this).data('link');
            $(target).removeClass('close').addClass('close');
            $('#' + id).removeClass('close').addClass('open');
            if ($('#section')) {
                $('#sidebar').setSectionMargin('#section', 80, 220);
            }
        })
    },
    
     /*
     *展开二级菜单
     *target 显示的对象
     */
    dropDownArr: function (target) {
        $(this).on('click', function () {
            var id = $(this).data('link');
            $(this).parent().find('.arrow').css('transform','rotate(0deg)');
            $(this).find('.arrow').css('transform','rotate(90deg)');
            $(this).parent().find(target).removeClass('close').addClass('close');
            $('#' + id).removeClass('close').addClass('open');
            if ($('#section')) {
                $('#sidebar').setSectionMargin('#section', 80, 220);
            }
        })
    },

    /*设置左边栏的高度*/
    setsideBarHeigh: function (val) {
        var h = $(window).height() - val;
        var ch = $(this).height();
        if (ch < h) {
            $('.first_lev,.second_lev').css('height', h + 'px');
        }
    },

    /*设置target的左边距*/
    setSectionMargin: function (target, first_left, sec_left) {
        if ($(this).width() > first_left) {
            $(target).css('margin-left', sec_left + 'px')
        } else {
            $(target).css('margin-left', first_left + 'px');
        }
    },

    /*
     *显示页头系统设置显示/隐藏下拉单功能
     *data 显示/隐藏下拉菜单的链接列表
     */
    showList: function (data) {
        $(this).on('mouseover', function () {
            $(this).find('.sys_tips').show();
        }).on('mouseout', function () {
            $(this).find('.sys_tips').hide();
        })
        if (data.length > 0) {
            var list = '';
            for (var i = 0, ii = data.length; i < ii; i++) {
                list += '<li><a href="' + data[i].url + '" target="blank">' + data[i].name + '</a></li>'
            }
            ;
            $(this).find('.sys_list').append(list);
        }
    },
    /*
     *显示页头系统设置显示/隐藏下拉单功能
     *data 显示/隐藏下拉菜单的链接列表
     */
    Sts_showList: function (data) {
        $(this).on('mouseover', function () {
            $(this).find('.sys_tips').show();
        }).on('mouseout', function () {
            $(this).find('.sys_tips').hide();
        })
        if (data.length > 0) {
            var list = '';
            for (var i = 0, ii = data.length; i < ii; i++) {
                list += '<li><a href="' + data[i].url + '" target="blank">' + data[i].name + '</a></li>'
            }
            ;
            $(this).find('.sys_list').append(list);
        }
    },
    /*
     *展开下级菜单
     *obj 点击的对象
     *target 显示的对象
     */
    Sts_dropDown: function (target) {
        $(this).on('click', function () {
            var id = $(this).data('link');
            $(this).siblings().find('.arrow').css('-webkit-transform','rotate(0deg)');
            $(this).find('.arrow').css('-webkit-transform','rotate(90deg)');
            $(target).css('display', 'none');
            $('#' + id).css('display', 'block');
            if ($('#section')) {
                $('#sts_sidebar').setSectionMargin('#section', 165,165);
            }
        })
    },
    Sts_sideBar: function ( _data,_picUrl) {
        if (_data.length > 0) {
            $(this).append('<ul class="first_lev" id="first_lev"></ul>');
            for (var i = 0, ii = _data.length; i < ii; i++) {
                $('#first_lev').append('<li class="fir_li" data-link=' + _data[i].links + '><a style="background:url(' + _picUrl + ') 0 '+ i*(-15)+'px;"></a><span>' + _data[i].name + '</span><a class="arrow"></a></li>');
                if (_data[i].list.length > 0) {
                    var html;
                    html = '<ul class="second_lev" id=' + _data[i].links + ' style="display:none;">';
                    for (var k = 0, kk = _data[i].list.length; k < kk; k++) {
                        html += '<li class="sec_li" data-link="' + _data[i].list[k].links + '"><span>' + _data[i].list[k].name + '</span>';
                    }
                    html += '</ul>';
                    $('#first_lev').append(html);
                }
            }
            $('.first_lev li').Sts_dropDown('.second_lev');
            $('#sts_sidebar').setsideBarHeigh(105);
        }
    },
});

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
        if( this.setting.closeOther && $('.data-dia')[0] ) {
            $('.data-dia').remove();
        }
        //添加弹框dom
        this.id = this.setting.boxID + 'Dia';
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
        $('.data-dia').remove();
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


//------------drag----------------
var event = document.addEventListener();
$('.drag_list li').mousedown(function () {
    console.log(event);
    $(this).css('background', '#333');
});
$('.drag_list li').mousemove(function () {
    console.log($(this))
});
$('.drag_list li').mouseup(function () {
    $(this).css('background', '#fff');
});

