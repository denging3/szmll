$.msgDemo = function(pdiv,mchId,checkedIds) {
    return new $.msgDemo.prototype.init( pdiv,mchId,checkedIds );
}
$.msgDemo.prototype = {
    constructor:$.msgDemo,
    init: function(pdiv,mchId,checkedIds) {
        this.mchId = mchId;
        this.pdiv = pdiv;
        this.checkedIds = checkedIds;
        var that = this;

        //初始化数据
        this.getModelTypes(this.mchId);
    },
    /*以下为java新增方法*/
    //获取图文信息模板
    getModelTypes: function(mchId){
        var that = this;
        $.ajax({
            url:"searchModelTypes",
            type:"POST",
            dataType:"json",
            async:false,
            data:{"mchId":mchId},
            success:function(result){
                if ( result != null ) {
                    // $("#js_check_cate").empty();
                    //展示模块类型
                    var msgItemHtml = '<div class="msg-item">'
                        + '<div class="msg-content demo-content">'
                            + '<div class="demo_name flex">'
                                + '<ul>'
                                    + '<li class="demo_title">模板名称</li>'
                                    + '<div class="demo_title_list"></div>'
                                + '</ul>'
                            + '</div>'
                            + '<div class="demo_info flex">'
                                + '<ul>'
                                    + '<li class="demo_title">图文消息</li>'
                                    + '<div class="demo_main_info"></div>'
                                + '</ul>'
                            + '</div>'
                            + '<div class="demo_check flex">'
                                + '<ul>'
                                    + '<li class="demo_title">预览</li>'
                                    + '<li>'
                                        + '<div class="demo_list"></div>'
                                    + '</li>'
                                + '</ul>'
                            + '</div>'
                        + '</div></div>';
                    var msgItemDom = $(msgItemHtml);

                    $.each(result,function(i,n){
                        //默认展示第一个
                        if ( i == 0 ) {
                            $(that.pdiv).find('.arrow-nav-title').append("<li class='cur-li' data-role='0'>" + n.modelType + "</li>");
                            $(msgItemDom).data('role',n.modelType).addClass('cur-item');
                            $(that.pdiv).find('.msg-contents').append(msgItemDom);
                            //展示模块名称
                            that.getModels(mchId,n.modelType);
                        }else{
                            $(that.pdiv).find('.arrow-nav-title').append("<li data-role='" + i + "'>" + n.modelType + "</li>");
                        }
                    });
                }
            },
            error: function(result){
                result = [{modelType:'运营'},{modelType:'门店'}];
                var msgItemHtml = '<div class="msg-item">'
                    + '<div class="msg-content demo-content">'
                        + '<div class="demo_name flex">'
                            + '<ul>'
                                + '<li class="demo_title">模板名称</li>'
                                + '<div class="demo_title_list"></div>'
                            + '</ul>'
                        + '</div>'
                        + '<div class="demo_info flex">'
                            + '<ul>'
                                + '<li class="demo_title">图文消息</li>'
                                + '<div class="demo_main_info"></div>'
                            + '</ul>'
                        + '</div>'
                        + '<div class="demo_check flex">'
                            + '<ul>'
                                + '<li class="demo_title">预览</li>'
                                + '<li>'
                                    + '<div class="demo_list"></div>'
                                + '</li>'
                            + '</ul>'
                        + '</div>'
                    + '</div></div>';
                var msgItemDom = $(msgItemHtml);

                $.each(result,function(i,n){
                    //默认展示第一个
                    if ( i == 0 ) {
                        $(that.pdiv).find('.arrow-nav-title').append("<li class='cur-li' data-role='0'>" + n.modelType + "</li>");
                        $(msgItemDom).data('role',n.modelType).addClass('cur-item');
                        $(that.pdiv).find('.msg-contents').append(msgItemDom);
                        //展示模块名称
                        that.getModels(mchId,n.modelType);
                    }else{
                        $(that.pdiv).find('.arrow-nav-title').append("<li data-role='" + i + "'>" + n.modelType + "</li>");
                    }
                });
            }
        });
    },
    getModels: function(mchId,modelType) {
        var titleLdiv = $(this.pdiv).find('.demo_title_list');
        var that = this;
        $.ajax({
            url:"searchModels",
            type:"POST",
            dataType:"json",
            async:false,
            data:{"mchId":mchId,"modelType": modelType},
            success:function(data){
                if ( data != null ) {
                    $.each(data,function(j,o){
                        //默认展示第一个
                        if(j==0){
                            $(titleLdiv).append("<li data-role='"+ o.modelVisit+"'><img src='"+ o.modelPicUrl+"' alt=\"\"/><p>"+ o.modelName+"</p><span></span></li >");
                            //加载图文信息
                            $.msgDemo.getPicMessages(mchId,o.modelVisit,that);
                        }else{
                            $(titleLdiv).append("<li data-role='"+ o.modelVisit+"'><img src='"+ o.modelPicUrl+"' alt=\"\"/><p>"+ o.modelName+"</p><span></span></li >");
                        }
                    });
                    $(titleLdiv).find('li').on('click',function(){
                        $.msgDemo.getPicMessages(mchId,$(this).data('role'),that);
                    });
                }
            },
            error: function(data) {
                data = [{
                    modelPicUrl: 'images/yh-1.png',
                    modelName: '优惠卷',
                    modelVisit: '235603'
                },{
                    modelPicUrl: 'images/yh-1.png',
                    modelName: '优惠卷',
                    modelVisit: '235604'
                }];
                $.each(data,function(j,o){
                    //默认展示第一个
                    if(j==0){
                        $(titleLdiv).append("<li data-role='"+ o.modelVisit+"'><img src='"+ o.modelPicUrl+"' alt=\"\"/><p>"+ o.modelName+"</p><span></span></li >");
                        //加载图文信息
                        $.msgDemo.getPicMessages(mchId,o.modelVisit,that);
                    }else{
                        $(titleLdiv).append("<li data-role='"+ o.modelVisit+"'><img src='"+ o.modelPicUrl+"' alt=\"\"/><p>"+ o.modelName+"</p><span></span></li >");
                    }
                });
                $(titleLdiv).find('li').on('click',function(){
                    $.msgDemo.getPicMessages(mchId,$(this).data('role'),that);
                });
            }
        });
    }
};
$.msgDemo.prototype.init.prototype = $.msgDemo.prototype;
$.msgDemo.msgItenIndex = 0;
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
$.msgDemo.getPicMessages = function(mchId,modelVisit,msgDemo){
    $.ajax({
        url:modelVisit,
        type:"POST",
        dataType:"json",
        async:false,
        data:{"mchId":mchId},
        success:function(obj){
            if(obj!=null){
                $(msgDemo.pdiv).find(".demo_main_info").html('');
                $.each(obj,function(i,p){
                    $(msgDemo.pdiv).find(".demo_main_info").append("<li data-list='"+ p.systemId+"' data-url='"+ p.url+"' data-msg='"+p.description+"' data-largeurl='"+ p.largePicUrl+"' data-smallurl='"+ p.picUrl+"'><span></span><img src='"+ p.picUrl+"' alt=\"\"/><p>"+ p.title+"</p></li>");
                });
                $(msgDemo.pdiv).find('.demo_main_info span').on('click',function(){
                    $.msgDemo.check_list(this,msgDemo.pdiv);
                });
                $.msgDemo.defaultChecked(msgDemo);
            }
        },
        error: function(obj) {
            obj = [{
                systemId: '5578',
                url: '#',
                largePicUrl: 'images/bacimg.png',
                picUrl: 'images/bacimg.png',
                description: '美乐乐微信推广金秋10月代金券',
                title: '美乐乐微信推广金秋10月代金券'
            },{
                systemId: '5579',
                url: '#',
                largePicUrl: 'images/bacimg.png',
                picUrl: 'images/bacimg.png',
                description: '美乐乐微信推广金秋11月代金券',
                title: '美乐乐微信推广金秋11月代金券'
            }];
            $(msgDemo.pdiv).find(".demo_main_info").html("");
            $.each(obj,function(i,p){
                $(msgDemo.pdiv).find(".demo_main_info").append("<li data-list='"+ p.systemId+"' data-url='"+ p.url+"' data-msg='"+p.description+"' data-largeurl='"+ p.largePicUrl+"' data-smallurl='"+ p.picUrl+"'><span></span><img src='"+ p.picUrl+"' alt=\"\"/><p>"+ p.title+"</p></li>");
            });

            $(msgDemo.pdiv).find('.demo_main_info span').on('click',function(){
                $.msgDemo.check_list(this,msgDemo.pdiv);
            });
            $.msgDemo.defaultChecked(msgDemo);
        }
    });
}
$.msgDemo.check_first = function(pdiv) {
    var demoListDiv = $(pdiv).find('.demo_list>div');
    $(demoListDiv).attr('class','deme_title_info');
    $(demoListDiv).eq(0).attr('class','demo_st');
}
$.msgDemo.del_list = function(clickObj,pdiv) {
    var n = $(clickObj).parent(),
        l = n.data('list');
    $(pdiv).find('.demo_info li').each(function(i){
        if ( $(this).data('list') == l ) {
            $(this).children('span').removeClass('img_check');
        }
    });
    n.remove();
    $.msgDemo.check_first();
}
$.msgDemo.check_list = function(clickObj,pdiv) {
    var msgItemIndex = $(pdiv).find('.arrow-nav-title .cur-li').attr('data-role');

    if ( $(clickObj).hasClass('img_check') == false ) {
        $(clickObj).addClass('img_check');
        var t = $(clickObj).nextAll('p').text(),
            i = $(clickObj).next('img').attr('src'),
            d = $(clickObj).parent().data('list');
        var domH = "";
        if ( $(pdiv).find('.img_check').length == 1 ) {
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
        $(pdiv).find('.demo_list').append(appendDom);

        $(appendDom).find('.close_demo').on('click',function(){
            $.msgDemo.del_list(this,pdiv);
        });
    } else {
        $(clickObj).removeClass('img_check');
        var s = $(clickObj).parent().data('list');
        $(pdiv).find('.demo_list>div').each(function(i){
            if ( $(this).data('list') == s ){
                $(this).remove();
            }
        });
    }
    $.msgDemo.check_first(pdiv);
}
$.msgDemo.defaultChecked = function(msgDemo){
    var checkedIds = String(msgDemo.checkedIds),
        pdiv = msgDemo.pdiv;
    if( checkedIds && checkedIds.length ) {
        checkedIds = ',' + checkedIds + ',';
        $(pdiv).find('.demo_info span').each(function(){
            var d = $(this).parent().data('list');
            if ( checkedIds.indexOf(',' + d + ',') != -1 ){
                $.msgDemo.check_list(this,pdiv);
            }
        })
    }
}
$.fn.extend({
    addSettingModual: function(mchId,checkedIds) {
        $.msgDemo(this,mchId,checkedIds);
    },
    addSettingModualOne: function(){
        //TODO
    },
    //获取图文信息模板
    
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
            html += '<input type="button" data-page="' + $(this).attr('id') + '" value="' + buttons[k].value + '" class="' + buttons[k].className + '" />'
        }
        html += '</div></div>';
        var htmlDom = $(html);
        $(this).append(htmlDom);
        var buttonsDom = $(htmlDom).find('input');
        //操作按钮添加回调方法
        for(var kk in buttons) {
            if ( typeof buttons[kk].cbFun == 'function' ) {
                $(buttonsDom[kk]).on('click',buttons[kk].cbFun);
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
}
/**
 * [confirmTextFeed 回复确认]
 */
function confirmTextFeed(){
    var pageId = $(this).data('page');
    if ( pageId ) {
        var text = $('#' + pageId).find('.js-editorArea').text();
        console.log(text);
        //TODO
        //提交回复内容
        
        //提交成功后提示
        $.lightBox({
            width: 290,
            title: '提示',
            html: '<p style="text-align:center;">保存成功</p>'
        });
    }
}