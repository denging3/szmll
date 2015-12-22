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
        if( this.setting.closeOther && $('#'+this.id)[0] ) {
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
/**
 * [upImgBox 上传图片弹框]
 * @param  {object} boxSize   [弹框宽度,默认宽度530] {boxWidth:[number],maxWidth:[number],maxHeight:[number],minWidth:[number],minHeight:[number]}
 * @param  {string} upImgBoxId [删除图片的boxid]
 * @param  {string} boxTitle   [弹框标题，默认为“更换图片”]
 * @param  {object} boxButtons [弹框下部操作按钮，默认按钮有取消和确认提交。格式如$.lightBox]
 * 使用时需按顺序分别引入 css/jquery.Jcrop.css js/jquery.Jcrop.js 和 js/imgUploadPre.js
 */
function upImgBox(boxSize,upImgBoxId,boxTitle,boxButtons) {
    upImgBoxId = upImgBoxId || 'upImg';
    var upImgDiaId = upImgBoxId + 'Dia';
    //判断是否已打开图片选择对话框
    if ( $('#' + upImgDiaId) && $('#' + upImgDiaId)[0] ) {
        $.lightBox.showBox(upImgDiaId);
    } else {
        //新建图片选择弹框
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
                        + '<p class="p2">(建议尺寸：'+boxSize.maxWidth+'×'+boxSize.maxHeight+')</p>'
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
            boxID: upImgBoxId,
            width: boxSize.boxWidth,
            isDelwFade: false,
            title: boxTitle || '更换图片',
            html: defaultContentH,
            buttons: boxButtons || defaultBut
        });
    }
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
