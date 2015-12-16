$.msgDemo = function(pdiv,checkedIds) {
    return new $.msgDemo.prototype.init( pdiv,checkedIds );
}
$.msgDemo.prototype = {
    constructor:$.msgDemo,
    init: function(pdiv,checkedIds) {
        this.pdiv = pdiv;
        var that = this;

        //TODO待扩展
        // $(this.pdiv).find('.demo_title_list li').on('click',function(){
        //     that.fsaf(this);
        // });
        $(this.pdiv).find('.demo_info span').on('click',function(){
            that.check_list(this);
        });
        this.defaultChecked(checkedIds);
    },
    check_first: function() {
        var demoListDiv = $(this.pdiv).find('.demo_list>div');
        $(demoListDiv).attr('class','deme_title_info');
        $(demoListDiv).eq(0).attr('class','demo_st');
    },
    del_list: function(clickObj) {
        var n = $(clickObj).parent(),
            l = n.data('list');
        $(this.pdiv).find('.demo_info li').each(function(i){
            if ( $(this).data('list') == l ) {
                $(this).children('span').removeClass('img_check');
            }
        });
        n.remove();
        this.check_first();
    },
    check_list: function(clickObj) {
        if ( $(clickObj).hasClass('img_check') == false ) {
            $(clickObj).addClass('img_check');
            var t = $(clickObj).nextAll('p').text(),
                i = $(clickObj).next('img').attr('src'),
                d = $(clickObj).parent().data('list');
            var domH = "";
            if ( $(this.pdiv).find('.img_check').length == 1 ) {
                domH = "<div class='demo_st' data-list='" + d + "'>" +
                    "<a class='close_demo' href='javascript:;'></a>" +
                    "<p>" + t + "</p>" +
                    "<img src=" + i + " alt=''/>" +
                    "</div>";
            } else {
                domH = "<div class='deme_title_info' data-list='" + d + "'>"+
                    "<a class='close_demo' href='javascript:;'></a>" +
                    "<p>" + t + "</p>" +
                    "<img src=" + i + " alt=''/>" +
                    "</div>";
            }
            var appendDom = $(domH);
            $(this.pdiv).find('.demo_list').append(appendDom);

            var that = this;
            $(appendDom).find('.close_demo').on('click',function(){
                that.del_list(this);
            });
        } else {
            $(clickObj).removeClass('img_check');
            var s = $(clickObj).parent().data('list');
            $(this.pdiv).find('.demo_list>div').each(function(i){
                if ( $(this).data('list') == s ){
                    $(this).remove();
                }
            });
        }
        this.check_first();
    },
    defaultChecked: function(checkedIds){
        var that = this;
        if( checkedIds && checkedIds.length ) {

            checkedIds = ',' + checkedIds + ',';
            $(this.pdiv).find('.demo_info span').each(function(){
                var d = $(this).parent().data('list');
                if ( checkedIds.indexOf(',' + d + ',') != -1 ){
                    that.check_list(this);
                }
            })
        }
    },
    /*以下为java新增方法*/
    fsaf:function(clickObj){
        // console.log(this)
    }
}
$.msgDemo.prototype.init.prototype = $.msgDemo.prototype;
$.msgDemo.getDemoChecked = function(pdiv) {
    var checkSpans = $(pdiv).find('.demo_info span');
    var checkedInfos = [],t,i,d;
    $(checkSpans).each(function(){
        if ( $(this).hasClass('img_check') == true ) {
            t = $(this).nextAll('p').text();
            i = $(this).next('img').attr('src');
            d = $(this).parent().data('list');
            checkedInfos.push({msgID:d,imgSrc:i,desc:t,msgType: 'msg'})
        }
    });
    return checkedInfos;
}
$.fn.extend({
    addSettingModual: function() {
        //添加各模块内容 this为当前添加dom的父级节点
        var divs = $(this).find('.msg-item');
        $(divs).each( function() {
            var dataRole = $(this).attr('data-role');
            //TODO
            //获取数据加载模块
            $(this).load('page/msg_imgtext.html',function(){
                $.msgDemo(this);
            });
        });
    },
    addSettingModualOne: function(){
        $(this).load('page/msg_imgtext.html',function(){
            $.msgDemo(this);
        });
    },
    bindNavEvent: function() {
        //为各模块导航添加事件
        var that = this;
        $(this).find('.arrow-nav li').on('click',function() {
            $(this).siblings().removeClass('cur-li');
            $(this).addClass('cur-li');

            var index = $(this).attr('data-role');
            $(that).find('.arrow-nav').attr('class','arrow-nav arrow-nav-'+index);
            $(that).find('.msg-item').removeClass('cur-item').eq(index).addClass('cur-item');
        });
    },
    addFooterOper: function(buttons){
        //添加操作按钮
        //buttons 为对象数组
        //[{value: '删除回复',className: 'cancel-button',cbFun: {function...}},{value: '确  认',className: 'bright-button'}]
        //默认buttons值
        var defaultBtn = [{
            value: '删除回复',className: 'cancel-button',cbFun: delFeed
        },{
            value: '确  认',className: 'bright-button',cbFun: confirmFeed }];
        buttons = buttons || defaultBtn;
        var html = '<div class="feed-footer"><div class="feed-oper">';
        for(var k in buttons) {
            if ( k != 0 ) {
                html += '&emsp;'
            }
            html += '<input type="button" id="feedOperBtn_' + k + '" value="' + buttons[k].value + '" class="' + buttons[k].className + '" />'
        }
        html += '</div></div>';
        $(this).append(html);
        //操作按钮添加回调方法
        for(var kk in buttons) {
            if ( typeof buttons[kk].cbFun == 'function' ) {
                $('#feedOperBtn_' + kk).on('click',buttons[kk].cbFun);
            }
        }
    },
    bindwordValid: function(maxWords){
        //文字输入框字数验证
        ////验证文字输入
        var MAX_INPUT_WORD = maxWords || 600;
        var pdiv = $(this);
        var leftWordDom = $(this).find('.js-left-word'),
            editorAreaDom =$(this).find('.js-editorArea');
        $(leftWordDom).text( MAX_INPUT_WORD - $(editorAreaDom).text().length );
        $(editorAreaDom).bind('input',function(){
            var text = this.innerText;
            if ( text.length > MAX_INPUT_WORD ) {
                $(this).text(text.slice(0,MAX_INPUT_WORD));
                $(leftWordDom).text(0);
            } else {
                $(leftWordDom).text( MAX_INPUT_WORD - text.length );
            }
        });
    }
});
/**
 * [delFeed 删除回复]
 */
function delFeed(){
    //TODO
    //待完善删除回复
}
/**
 * [confirmFeed 回复确认]
 */
function confirmFeed(){
    //TODO
    //待完善确认回复
    $.lightBox({
        width: 290,
        title: '提示',
        html: '<p style="text-align:center;">保存成功</p>'
    });
}