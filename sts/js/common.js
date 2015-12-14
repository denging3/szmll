var u = 'url(images/menu.png)';
$(window).resize(function () {
    $.fn.setsideBarHeigh('#sidebar', 111);
});
$(document).ready(function () {
    /*显示/隐藏下拉菜单*/
    $.fn.showList('#sysInfo', [{'name': '商家信息', 'url': 'javascript:;'}, {
        'name': '帐号管理',
        'url': 'javascript:;'
    }, {'name': '第三方接入', 'url': 'javascript:;'}]);

    /*
     *arguments 左边导航栏传递列表数据格式
     *u 设置为变量，为导航菜单雪碧图路径
     */
    $.fn.sideBar('#sidebar', [{
        'name': '商家信息',
        'links': 'index',
        'bg': u,
        'list': ''
    },
        {
            'name': '账号管理',
            'links': 'operation',
            'bg': u + ' 0px -15px',
            'list': ''
        },
        {
            'name': '第三方接入',
            'links': 'ec',
            'bg': u + ' 0px -29px',
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
            }
            ]
        }]);

});

/*
 *导航菜单
 *obj 前台只需要<div id="sidebar" class="clearfix"></div>将id值作为参数，会在该div下创建菜单栏
 *_data 将导航菜单以json数据保存为参数传递，自动生成一级，二级，三级菜单
 */
$.fn.extend({
    sideBar: function (obj, _data) {
        if (_data.length > 0) {
            $(obj).append('<ul class="first_lev" id="first_lev"></ul>');
            for (var i = 0, ii = _data.length; i < ii; i++) {
                $('#first_lev').append('<li class="fir_li" data-link=' + _data[i].links + '><a style="background:' + _data[i].bg + ' ;"></a><span>' + _data[i].name + '</span><a class="arrow"></a></li>');
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
            $.fn.dropDown('.first_lev li', '.second_lev');
            $.fn.setsideBarHeigh('#sidebar', 111);
        }
    },

    /*
     *展开下级菜单
     *obj 点击的对象
     *target 显示的对象
     */
    dropDown: function (obj, target) {
        $(obj).on('click', function () {
            var id = $(this).data('link');
            $(this).siblings().find('.arrow').css('-webkit-transform','rotate(0deg)');
            $(this).find('.arrow').css('-webkit-transform','rotate(90deg)');
            $(target).css('display', 'none');
            $('#' + id).css('display', 'block');
            if ($('#section')) {
                $.fn.setSectionMargin('#sidebar', '#section', 165);
            }
        })
    },
	
	/*设置左边栏的高度*/
    setsideBarHeigh: function (obj, val) {
        var h = $(window).height() - val;
        var ch = $(obj).height();
        if (ch < h) {
            $('.first_lev,.second_lev').css('height', h + 'px');
        };
    },
    
    /*设置target的左边距*/
    setSectionMargin: function (obj, target, first_left, sec_left) {
        if ($(obj).width() > first_left) {
            $(target).css('margin-left', sec_left + 'px')
        } else {
            $(target).css('margin-left', first_left + 'px');
        }
    },

    /*
     *显示页头系统设置显示/隐藏下拉单功能
     *obj 要实现的目标id
     *data 显示/隐藏下拉菜单的链接列表
     */
    showList: function (obj, data) {
        $(obj).on('mouseover', function () {
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
            $(obj).find('.sys_list').append(list);
        }
    },

});

$('.fir_li').on('click',function(){
    console.log(111)
    $('.arrow').css('-webkit-transform','rotate(0deg)');
    $(this).find('.arrow').css('-webkit-transform','rotate(90deg)');
})

/**
 * 漂浮弹窗
 * setting对象
 * { 
 *     boxID:{string},//必填参数 表示弹出对话框的id为boxID + 'Dia'
 *     width:{number},//div.data-content的宽度
 *     closeOther: {boolean},//是否关闭之前弹框，默认关闭之前全部弹框
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
            closeOther: true
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
                //删除dom
                $(that.dom).remove();
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
$.lightBox.closeBox = function(curObj){
    var diaObj = $.lightBox.getCurDia(curObj)
    $(diaObj).fadeOut();
    setTimeout(function(){
        $(diaObj).find('.fix').detach();
        $(diaObj).remove();
    },500);
}
$.lightBox.closeALL = function(){
    $('.data-dia').fadeOut();
    setTimeout(function(){
        $('.fix').detach();
        $('.data-dia').remove();
    },500);
}
/**
 * [upImgBox 上传图片弹框]
 * @param  {object} boxSize   [弹框宽度,默认宽度530] {boxWidth:[number],maxWidth:[number],maxHeight:[number],minWidth:[number],minHeight:[number]}
 * @param  {string} boxTitle   [弹框标题，默认为“更换图片”]
 * @param  {object} boxButtons [弹框下部操作按钮，默认按钮有取消和确认提交。格式如$.lightBox]
 * 使用时需按顺序分别引入 css/jquery.Jcrop.css js/jquery.Jcrop.js 和 js/imgUploadPre.js
 */
function upImgBox(boxSize,boxTitle,boxButtons) {
    //设置大小
    var boxSize = $.extend({
        boxWidth: 530,
        maxWidth: 290,
        maxHeight: 200,
        minWidth: 210,
        minHeight: 140
    },boxSize);
    var boxSizeString = '({maxWidth:'+ boxSize.maxWidth 
        +',maxHeight:' + boxSize.maxHeight + 
        ',minWidth:' + boxSize.minWidth + 
        ',minHeight:' + boxSize.minHeight + '})';
    
    //默认的弹框内容
    var defaultContentH = '<div class="img-block block1">'
        + '<form name="imgUpForm" method="post" enctype="multipart/form-data">'
            + '<div id="imgDragPane" style="width:'+boxSize.maxWidth+'px;height:'+(boxSize.maxHeight+30)+'px;">'
                + '<div id="imgDragContainer" style="width:'+boxSize.maxWidth+'px;height:'+boxSize.maxHeight+'px;">'
                    + '<p class="p1"><b>+</b>&nbsp;上传图片</p>'
                    + '<p class="p2">(建议尺寸：300×200)</p>'
            + '</div></div>'
            + '<span class="file-btn" onclick="filepath.click()"style="width:'+(boxSize.maxWidth-2)+'px;"><b>+</b>上传本地图片</span>'
            + '<input type="hidden" name="upfile" id="upfile" />'
            + '<input type="file" id="filepath" style="display:none" onchange="previewImage(this,\'upfile\',eval('+boxSizeString+'))">'
            + '<input type="hidden" id="imgLeft" name="imgLeft" />'
            + '<input type="hidden" id="imgTop" name="imgTop" />'
            + '<input type="hidden" id="imgW" name="imgW" />'
            + '<input type="hidden" id="imgH" name="imgH">'
            + '<input type="hidden" name="cutW" value="'+boxSize.minWidth+'">'
            + '<input type="hidden" name="cutH" value="'+boxSize.minHeight+'">'
            + '<span class="file-tips">支持图片类型jpg、jpeg、png</span>'
        + '</form></div>'
        + '<div class="img-block block2">'
            + '<div class="img-fi-preview">'
                + '<div id="preview-pane">'
                    + '<div class="preview-container" style="width:'+boxSize.minWidth+'px;height:'+boxSize.minHeight+'px;overflow:hidden;">'
                        + ' <img id="imgPre" class="jcrop-preview" />'
            + '</div></div></div>'
            + '<span class="label">预览效果</span>'
        + '</div>';
    var defaultBut = [{
        value: '取消',
        className: 'dia-close cancel-button'
    },{
        value: '确认',
        className: 'bright-button',
        callbackFun: imgUpLoad
    }];
    $.lightBox({
        boxID: 'upImg',
        width: boxSize.boxWidth,
        title: boxTitle || '更换图片',
        html: defaultContentH,
        buttons: boxButtons || defaultBut
    });
}
function imgUpLoad(){
    if( !$('#upfile').val() ) {
        alert('还未选择更换图片哟！');
        return;
    }
    var imgPreDom = $('#imgPre')[0];
    $('#imgTop').val(parseFloat(imgPreDom.style.marginTop));
    $('#imgLeft').val(parseFloat(imgPreDom.style.marginLeft));
    $('#imgW').val(imgPreDom.width);
    $('#imgH').val(imgPreDom.height);

    document.imgUpForm.submit();
}
function dialog(obj) {
    $('.data-dia').prepend("<div class='fix'></div>");
    var r = $(obj).data('role');
    var d = $("#" + r + "");
    d.fadeIn();
    $('.data-dia').css('display', 'flex');
    $('.fix,.close_log').on('click', function () {
        d.fadeOut();
        setTimeout(function () {
            $('.fix').detach();
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

/*微信第三方所有方法*/

/*微信第三方所有方法*/
