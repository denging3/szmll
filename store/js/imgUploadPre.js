//图片上传预览    IE是用了滤镜。
function previewImage(file,boxSize) {
    var MAXWIDTH  = boxSize.maxWidth,MINWIDTH = boxSize.minWidth;
    var MAXHEIGHT = boxSize.maxHeight,MINHEIGHT = boxSize.minHeight;
    var fileSuffixs = 'image/jpg,image/jpeg,image/png';
    var pDiv = $('#' + boxSize.boxId );
    var imgContain = $(pDiv).find('.js-imgDragContainer');
    if (file.files && file.files[0]) {
        //验证选择的文件类型
        var fileType = file.files[0].type;
        if ( fileSuffixs.indexOf(fileType) == -1 ) {
            alert('仅支持图片类型jpg、jpeg、png');
            return;
        }
        var imgContainInner = $('<div class="js-imgContainInner">');
        $(imgContain).html(imgContainInner);
        var imgDrag = $('<img class="js-imgDrag" alt="jcrop Image">');
        $(imgContainInner).html(imgDrag);

        var imgDom = $(imgDrag)[0],
            imgPre = $(pDiv).find('.js-imgpre');
        imgDom.onload = function(){
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, imgDom.offsetWidth, imgDom.offsetHeight);
            var rectPre = clacImgZoomParam2(MINWIDTH, MINHEIGHT, imgDom.offsetWidth, imgDom.offsetHeight);
            imgDom.width  =  rect.width;
            imgDom.height =  rect.height;
            $(imgPre).css({width: (rectPre.width + 'px') ,height: (rectPre.height + 'px')});
            $(imgContainInner).css({'margin-left': (rect.left + 'px'),'margin-top': (rect.top + 'px')});
            $(pDiv).find('.preview-pane').css({right: -(30 + MINWIDTH + rect.left) + 'px',top: -(rect.top) + 'px'});

            //添加拖拽框裁剪扩展
            var dragRect = clacImgZoomParam3(rect.width,rect.height,(MINWIDTH/MINHEIGHT));
            jQuery(function($) {

                var jcrop_api,
                    boundx,
                    boundy,
                    $preview = $('.preview-pane'),
                    $pcnt = $('.preview-pane .preview-container'),
                    $pimg = $('.preview-pane .preview-container img'),
                    xsize = $pcnt.width(),
                    ysize = $pcnt.height();
                $(imgDrag).Jcrop({
                    bgFade:     true,
                    bgOpacity: .5,
                    // allowSelect: false,
                    // allowResize: false,
                    onSelect: updatePreview,
                    onChange: updatePreview,
                    aspectRatio: xsize / ysize,

                    setSelect: [ dragRect.left, dragRect.top, dragRect.width, dragRect.height]
                },function(){
                    var bounds = this.getBounds();
                    boundx = bounds[0];
                    boundy = bounds[1];
                    jcrop_api = this;
                    $preview.appendTo(jcrop_api.ui.holder);
                });

                //更新裁剪预览框中图片
                function updatePreview(c){
                    if (parseInt(c.w) > 0){
                        var rx = xsize / c.w;
                        var ry = ysize / c.h;

                        $pimg.css({
                          width: Math.round(rx * boundx) + 'px',
                          height: Math.round(ry * boundy) + 'px',
                          marginLeft: '-' + Math.round(rx * c.x) + 'px',
                          marginTop: '-' + Math.round(ry * c.y) + 'px'
                        });
                    }
                };
            });
        }
        var reader = new FileReader();
        reader.onload = function(evt){
            imgDom.src = evt.target.result;

            if ( !$(imgPre)[0] ) {
                var preContainH = '<div class="preview-pane">'
                        + '<div class="preview-container" style="width:'+ MINWIDTH +'px;height:'+ MINHEIGHT +'px;overflow:hidden;">'
                            + ' <img class="js-imgpre jcrop-preview" />'
                        + '</div></div>';
                $(pDiv).find('.img-fi-preview').html(preContainH);
                imgPre = $(pDiv).find('.js-imgpre');
            }
            $(imgPre).attr('src', evt.target.result);
        }
        reader.readAsDataURL(file.files[0]);
    } else {
        //兼容IE
        //TODO
        // var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
        // file.select();
        // var src = document.selection.createRange().text;
        // div.innerHTML = '<img id="imgDrag">';
        // var img = document.getElementById('imgDrag');
        // img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
        // var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
        // status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height);
        // div.innerHTML = "<div id=divhead style='width:"+rect.width+"px;height:"+rect.height+"px;margin-top:"+rect.top+"px;"+sFilter+src+"\"'></div>";
    }
}
/**
 * [clacImgZoomParam 上传预览图片给定最大宽高计算图片展示宽高及margin] 
 * @param  {[type]} maxWidth  [最大宽度值]
 * @param  {[type]} maxHeight [最大高度值]
 * @param  {[type]} width     [图片本身宽度值]
 * @param  {[type]} height    [图片本身高度值]
 * @return {[type]}           [预展示图片的宽高，margin值]
 */
function clacImgZoomParam( maxWidth, maxHeight, width, height ){
    var param = {top:0, left:0, width:width, height:height};
    if( width>maxWidth || height>maxHeight )
    {
        rateWidth = width / maxWidth;
        rateHeight = height / maxHeight;
         
        if( rateWidth > rateHeight )
        {
            param.width =  maxWidth;
            param.height = Math.round(height / rateWidth);
        }else
        {
            param.width = Math.round(width / rateHeight);
            param.height = maxHeight;
        }
    }
     
    param.left = Math.round((maxWidth - param.width) / 2);
    param.top = Math.round((maxHeight - param.height) / 2);
    return param;
}

/**
 * [clacImgZoomParam2 上传预览图片给定最小宽高计算图片展示宽高及margin] 
 * @param  {[type]} maxWidth  [最小宽度值]
 * @param  {[type]} maxHeight [最小高度值]
 * @param  {[type]} width     [图片本身宽度值]
 * @param  {[type]} height    [图片本身高度值]
 * @return {[type]}           [预展示图片的宽高，margin值]
 */
function clacImgZoomParam2( minWidth, minHeight, width, height ) {
    var param = {top:0, left:0, width:width, height:height};
    var rateWidth = width / minWidth,
        rateHeight = height / minHeight;
    if( rateWidth > rateHeight ) {
        param.width =  Math.round(width / rateHeight);
        param.height = minHeight;
    } else {
        param.width = minWidth;
        param.height = Math.round(height / rateWidth);
    }
    return param;
}
/**
 * [clacImgZoomParam3 计算裁剪框大小]
 */
function clacImgZoomParam3(realWidth,realHeight,rate) {
    var rRate = realWidth / realHeight;
    var tempWidth = 0,tempHeight = 0;
    if ( rRate > rate ) {
        tempHeight = realHeight;
        tempWidth = rate * tempHeight;
    } else {
        tempWidth = realWidth;
        tempHeight = tempWidth / rate;
    }
    return clacImgZoomParam(realWidth,realHeight,tempWidth,tempHeight);
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
            minHeight: 140,
            boxId: upImgDiaId
        },boxSize);
        var boxSizeString = '({maxWidth:'+ boxSize.maxWidth +
            ',maxHeight:' + boxSize.maxHeight +
            ',minWidth:' + boxSize.minWidth +
            ',minHeight:' + boxSize.minHeight +
            ',boxId:\'' + boxSize.boxId + '\'})';
        //默认的弹框内容
        var defaultContentH = '<div class="imgup-block imgup-block1">'
            + '<form method="post" enctype="multipart/form-data">'
                + '<div class="js-imgDragPane img-drag-pane" style="width:'+boxSize.maxWidth+'px;height:'+(boxSize.maxHeight+30)+'px;">'
                    + '<div class="js-imgDragContainer img-drag-container" style="width:'+boxSize.maxWidth+'px;height:'+boxSize.maxHeight+'px;">'
                        + '<p class="p1">(建议尺寸：'+boxSize.maxWidth+'×'+boxSize.maxHeight+')</p>'
                + '</div></div>'
                + '<span class="file-btn" onclick="' + upImgBoxId + 'Filepath.click()"style="width:'+(boxSize.maxWidth-2)+'px;"><b></b>上传本地图片</span>'
                + '<input type="file" name="' + upImgBoxId + 'Filepath" id="' + upImgBoxId + 'Filepath" style="display:none" onchange="previewImage(this,eval('+boxSizeString+'))">'
                // + '<input type="hidden" id="imgLeft" name="imgLeft" />'
                // + '<input type="hidden" id="imgTop" name="imgTop" />'
                // + '<input type="hidden" id="imgW" name="imgW" />'
                // + '<input type="hidden" id="imgH" name="imgH">'
                // + '<input type="hidden" id="cutW" name="cutW" value="'+boxSize.minWidth+'">'
                // + '<input type="hidden" id="cutH" name="cutH" value="'+boxSize.minHeight+'">'
                + '<span class="file-tips">支持图片类型jpg、jpeg、png</span>'
            + '</form></div>'
            + '<div class="imgup-block imgup-block2">'
                + '<div class="img-fi-preview" style="width:'+boxSize.minWidth+'px;height:'+boxSize.minHeight+'px;">'
                    + '<div class="preview-pane">'
                        + '<div class="preview-container" style="width:'+boxSize.minWidth+'px;height:'+boxSize.minHeight+'px;overflow:hidden;">'
                            + ' <img class="js-imgpre jcrop-preview" />'
                + '</div></div></div>'
                + '<span class="label">预览效果</span>'
            + '</div>';
        var defaultBut = [{
            value: '取消',
            className: 'dia-close cancel-button'
        },{
            value: '确认',
            className: 'bright-button',
            callbackFun: function() {
                imgUpLoad(boxSize);
            }
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
/**
 * [imgUpLoad 上传图片处理]
 * @param {object} boxSize [存放弹窗对话框相应的信息,必须包含当前图片选择框的domID，裁剪框大小]
 * imgLeft：图片预览左偏移；mgTop：图片预览上偏移
 * imgW：图片预览时宽度；mgH：图片预览时高度
 * cutW：裁剪框宽度；cutH：裁剪框高度
 */
function imgUpLoad(boxSize){
    var upFile = $('#' + boxSize.boxId).find('input[type=file]');
    if( !$(upFile).val() ) {
        alert('还未选择更换图片哟！');
        return;
    }
    var imgPreDom = $('#' + boxSize.boxId).find('.js-imgpre')[0];

    var res = {imgTop: parseFloat(imgPreDom.style.marginTop),
        imgLeft: parseFloat(imgPreDom.style.marginLeft),
        imgW: parseFloat(imgPreDom.style.width),
        imgH: parseFloat(imgPreDom.style.height),
        cutW: boxSize.minWidth,
        cutH: boxSize.minHeight,
        imgSrc: imgPreDom.src
    };
    //TODO
    //裁剪需要的信息参见res中
    //注意上传图片的<input type="file" />元素的name、id如下
    var fileInputId = $(upFile).attr('id');

    console.log(res);
    return res;
}