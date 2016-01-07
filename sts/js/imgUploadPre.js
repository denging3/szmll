//图片上传预览    IE是用了滤镜。
function previewImage(file,boxSize) {
    var MAXWIDTH  = boxSize.maxWidth,MINWIDTH = boxSize.minWidth;
    var MAXHEIGHT = boxSize.maxHeight,MINHEIGHT = boxSize.minHeight;
    var fileSuffixs = 'image/jpg,image/jpeg,image/png';
    var pDiv = $('#' + boxSize.boxId );
    var imgContain = $(pDiv).find('.js-imgDragContainer');
    var imgContainInner = $('<div class="js-imgContainInner">');
    $(imgContain).html(imgContainInner);
    var imgDrag = $('<img class="js-imgDrag" id="js_' + boxSize.boxId + '_imgDrag">');
    $(imgContainInner).html(imgDrag);
    var imgPre = $('<img class="js-imgpre jcrop-preview" />');
    $(pDiv).find('.preview-pane .preview-container').html(imgPre);
    var imgDom = $(imgDrag)[0];
    var rect,rectPre,dragRect;

    if (file.files && file.files[0]) {
        //验证选中文件类型
        if ( fileSuffixs.indexOf(file.files[0].type) == -1 ) {
            file.value = '';
            alert('仅支持图片类型jpg、jpeg、png');
            return;
        }

        imgDom.onload = function(){
            rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, imgDom.offsetWidth, imgDom.offsetHeight);
            rectPre = clacImgZoomParam2(MINWIDTH, MINHEIGHT, imgDom.offsetWidth, imgDom.offsetHeight);
            dragRect = clacImgZoomParam3(rect.width,rect.height,(MINWIDTH/MINHEIGHT));

            imgDom.width  =  rect.width;
            imgDom.height =  rect.height;
            $(imgPre).css({width: (rectPre.width + 'px') ,height: (rectPre.height + 'px')});
            $(imgContainInner).css({'margin-left': (rect.left + 'px'),'margin-top': (rect.top + 'px')});
            // $(pDiv).find('.preview-pane').css({right: -(30 + MINWIDTH + rect.left) + 'px',top: -(31 + rect.top) + 'px'});

            //添加拖拽框裁剪扩展
            jQuery(function($) {

                var jcrop_api,
                    boundx,
                    boundy,
                    $preview = $(pDiv).find('.preview-pane'),
                    $pcnt = $(pDiv).find('.preview-pane .preview-container'),
                    $pimg = $(pDiv).find('.preview-pane .preview-container img'),
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
                    // $preview.appendTo(jcrop_api.ui.holder);
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
            // if ( !$(imgPre)[0] ) {
            //     var preContainH = '<div class="preview-pane">'
            //             + '<div class="preview-container" style="width:'+ MINWIDTH +'px;height:'+ MINHEIGHT +'px;overflow:hidden;">'
            //                 + ' <img class="js-imgpre jcrop-preview" />'
            //             + '</div></div>';
            //     $(pDiv).find('.img-fi-preview').html(preContainH);
            //     imgPre = $(pDiv).find('.js-imgpre');
            // }
            $(imgPre).attr('src', evt.target.result);
        }
        reader.readAsDataURL(file.files[0]);
    } else {
        //兼容IE 使用滤镜预览本地图片
        file.select();
        file.blur();
        if ( document.selection && document.selection.createRange ) {
            var src = document.selection.createRange().text;
            //验证选中文件类型
            if ( src && fileSuffixs.indexOf(src.substr(src.lastIndexOf('.') + 1)) == -1 ) {
                file.value = '';
                alert('仅支持图片类型jpg、jpeg、png');
                return;
            }

            $(imgDom).css("filter","progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=image)");
            imgDom.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
            
            rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, imgDom.offsetWidth, imgDom.offsetHeight);
            rectPre = clacImgZoomParam2(MINWIDTH, MINHEIGHT, imgDom.offsetWidth, imgDom.offsetHeight);
            dragRect = clacImgZoomParam3(rect.width,rect.height,(MINWIDTH/MINHEIGHT));

            imgDom.width = rect.width;
            imgDom.height = rect.height;
            imgDom.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').sizingMethod = "scale";
            $(imgDom).css({"width":rect.width+"px","height":rect.height+"px"});
            $(imgContainInner).css({'margin-left': (rect.left + 'px'),'margin-top': (rect.top + 'px')});

            $(imgPre).css({width: (rectPre.width + 'px') ,height: (rectPre.height + 'px')});
            $(imgPre).css({"filter":"progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\"" + src + "\")"});
            // $(pDiv).find('.preview-pane').css({right: -(30 + MINWIDTH + rect.left) + 'px',top: -(31 + rect.top) + 'px'});

            doJcrop(imgDrag,dragRect,src,pDiv);
        }
    }
}
function doJcrop(imgDrag,dragRect,src,pDiv){
    //添加拖拽框裁剪扩展
    jQuery(function($) {

        var jcrop_api,
            boundx,
            boundy,
            $preview = $(pDiv).find('.preview-pane'),
            $pcnt = $(pDiv).find('.preview-pane .preview-container'),
            $pimg = $(pDiv).find('.preview-pane .preview-container img'),
            xsize = $pcnt.width(),
            ysize = $pcnt.height();

        jcrop_api = $.Jcrop('#'+$(imgDrag).attr('id'),{
            bgFade:     true,
            bgOpacity: .5,
            onSelect: updatePreviewIE,
            onChange: updatePreviewIE,
            aspectRatio: xsize / ysize,

            setSelect: [ dragRect.left, dragRect.top, dragRect.width, dragRect.height]
        });
        var bounds = jcrop_api.getBounds();
        boundx = bounds[0];
        boundy = bounds[1];
        $('.jcrop-holder div img').css("filter","progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale src='" + src + "')");
        $('.jcrop-holder .js-imgDrag').css("filter","progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale src='" + src + "') alpha(opacity=50)");
        
        //更新裁剪预览框中图片
        function updatePreviewIE(c){
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
        var defaultContentH = '<div class="imgup-block imgup-block1" style="width:' + boxSize.maxWidth + 'px;">'
            + '<form method="post" enctype="multipart/form-data">'
                + '<div class="js-imgDragPane img-drag-pane" style="width:'+boxSize.maxWidth+'px;height:'+(boxSize.maxHeight+30)+'px;">'
                    + '<div class="js-imgDragContainer img-drag-container" style="width:'+boxSize.maxWidth+'px;height:'+boxSize.maxHeight+'px;">'
                        + '<p class="p1">(建议尺寸：'+boxSize.maxWidth+'×'+boxSize.maxHeight+')</p>'
                + '</div></div>'
                + '<span class="file-btn" onclick="document.getElementById(\'' + upImgBoxId + 'Filepath\').click()" style="width:'+(boxSize.maxWidth-2)+'px;"><b>+</b>上传本地图片</span>'
                + '<input type="file" name="' + upImgBoxId + 'Filepath" id="' + upImgBoxId + 'Filepath" accept="image/gif, image/jpeg, image/png" style="display: inline-block; width: '+(boxSize.maxWidth-2)+'px; height: 32px; position: absolute; bottom:18px; filter:alpha(opacity=0);opacity: 0;" onchange="previewImage(this,eval('+boxSizeString+'))">'
                // + '<span class="file-btn" onclick="' + upImgBoxId + 'Filepath.click()"style="width:'+(boxSize.maxWidth-2)+'px;"><b>+</b>上传本地图片</span>'
                // + '<input type="file" name="' + upImgBoxId + 'Filepath" id="' + upImgBoxId + 'Filepath" style="display:none" onchange="previewImage(this,eval('+boxSizeString+'))">'
                + '<span class="file-tips">支持图片类型jpg、jpeg、png</span>'
            + '</form></div>'
            + '<div class="imgup-block imgup-block2" style="width:' + (boxSize.minWidth+2) + 'px;">'
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
        cutH: boxSize.minHeight
    };
    //TODO
    //裁剪需要的信息参见res中
    //注意上传图片的<input type="file" />元素的name、id如下
    var fileInputId = $(upFile).attr('id');

    console.log(res);
    return res;
}