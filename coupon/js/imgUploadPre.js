//图片上传预览    IE是用了滤镜。
function previewImage(file,fileInput,boxSize) {
    var MAXWIDTH  = boxSize.maxWidth,MINWIDTH = boxSize.minWidth;
    var MAXHEIGHT = boxSize.maxHeight,MINHEIGHT = boxSize.minHeight;
    var fileSuffixs = 'image/jpg,image/jpeg,image/png';
    var div = document.getElementById('imgDragContainer');
    if (file.files && file.files[0]) {
        //验证选择的文件类型
        var fileType = file.files[0].type;
        if ( fileSuffixs.indexOf(fileType) == -1 ) {
            alert('仅支持图片类型jpg、jpeg、png');
            return;
        }
        div.innerHTML = '<div id="imgContainerInner">';
        var innerDiv = document.getElementById('imgContainerInner');

        innerDiv.innerHTML ='<img id="imgDrag" alt="Jcrop Image">';
        var img = document.getElementById('imgDrag'),
            imgPre = document.getElementById('imgPre');
        img.onload = function(){
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            var rectPre = clacImgZoomParam2(MINWIDTH, MINHEIGHT, img.offsetWidth, img.offsetHeight);
            img.width  =  rect.width;
            img.height =  rect.height;
            imgPre.width = rectPre.width;
            imgPre.height = rectPre.height;
            imgContainerInner.style.marginLeft = rect.left+'px';
            imgContainerInner.style.marginTop = rect.top+'px';

            //添加拖拽框裁剪扩展
            var dragRect = clacImgZoomParam3(rect.width,rect.height,(MINWIDTH/MINHEIGHT));
            jQuery(function($){

                var jcrop_api,
                    boundx,
                    boundy,
                    $preview = $('#preview-pane'),
                    $pcnt = $('#preview-pane .preview-container'),
                    $pimg = $('#preview-pane .preview-container img'),
                    xsize = $pcnt.width(),
                    ysize = $pcnt.height();
                $('#imgDrag').Jcrop({
                    bgFade:     true,
                    bgOpacity: .5,
                    allowSelect: false,
                    allowResize: false,
                    onSelect: updatePreview,
                    aspectRatio: xsize / ysize,
                    setSelect: [ dragRect.left, dragRect.top, dragRect.width, dragRect.height]
                },function(){
                    var bounds = this.getBounds();
                    boundx = bounds[0];
                    boundy = bounds[1];
                    jcrop_api = this;
                    // $preview.appendTo('');
                });

                //更新裁剪预览框中图片
                function updatePreview(c){
                    if (parseInt(c.w) > 0){
                        var rx = xsize / c.w;
                        var ry = ysize / c.h;

                        $pimg.css({
                          // width: Math.round(rx * boundx) + 'px',
                          // height: Math.round(ry * boundy) + 'px',
                          marginLeft: '-' + Math.round(rx * c.x) + 'px',
                          marginTop: '-' + Math.round(ry * c.y) + 'px'
                        });
                    }
                };
            });
        }
        var reader = new FileReader();
        reader.onload = function(evt){
            img.src = evt.target.result;
            imgPre.src = evt.target.result;
        }
        reader.readAsDataURL(file.files[0]);
    } else {
        //兼容IE
        //TODO
        var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
        file.select();
        var src = document.selection.createRange().text;
        div.innerHTML = '<img id="imgDrag">';
        var img = document.getElementById('imgDrag');
        img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
        var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
        status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height);
        div.innerHTML = "<div id=divhead style='width:"+rect.width+"px;height:"+rect.height+"px;margin-top:"+rect.top+"px;"+sFilter+src+"\"'></div>";
    }
    $('#' + fileInput).val(file.value);
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
    console.log(tempHeight+ '...' + tempWidth);
    return clacImgZoomParam(realWidth,realHeight,tempWidth,tempHeight);
}