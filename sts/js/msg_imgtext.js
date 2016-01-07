/**
 * [msgDemo 图文消息模块初始话封装]
 * @param  {dom} pdiv       [图文编辑模块所在html的父容器]
 * @param  {string} mchId      [当前登录标识，用以请求图文展示模版、模块消息参数]
 * @param  {object} checkedMsg [规则图文条目信息]
 * checkedMsg:{index:当前编辑图文在规则包含所有图文中的索引,picMessages:当前规则对应下标的的图文的数组}
 */
$.msgDemo = function(pdiv,mchId,checkedMsg) {
    return new $.msgDemo.prototype.init( pdiv,mchId,checkedMsg );
}
$.msgDemo.prototype = {
    constructor:$.msgDemo,
    init: function(pdiv,mchId,checkedMsg) {
        this.mchId = mchId;
        this.pdiv = pdiv;
        this.checkedMsg = checkedMsg;
        this.newCheckedMsg = {};
        objDeepCopy(this.newCheckedMsg,checkedMsg);
        var that = this;

        //初始化数据
        this.getModelTypes(this.mchId);
        this.initCheckedPreview();
        
        return this.newCheckedMsg;
    },

    /**
     * [getModelTypes 获取图文消息模块。运营/门店]
     */
    getModelTypes: function(mchId){
        var that = this;
        $.ajax({
            url:"sys/menu/searchModelTypes",
            type:"POST",
            dataType:"json",
            async:false,
            data:{"mchId":mchId},
            success:function(result){
                if ( result != null ) {
                    $.each(result,function(i,n){
                        //默认展示第一个
                        if ( i == 0 ) {
                            $(that.pdiv).find('.arrow-nav-title').append("<li class='cur-li' data-role='0'>" + n.modelType + "</li>");
                            
                            // 加载模块对应模版信息
                            that.getModels(mchId,n.modelType);
                        }else{
                            $(that.pdiv).find('.arrow-nav-title').append("<li data-role='" + i + "'>" + n.modelType + "</li>");
                        }
                    });

                    //绑定模块运营、门店点击事件
                    $(that.pdiv).find('.arrow-nav li').on('click',function() {
                        //模块部分运营、门店样式改变
                        $(this).siblings().removeClass('cur-li');
                        $(this).addClass('cur-li');

                        var index = $(this).attr('data-role'),
                            mType = $(this).text();
                        $(that.pdiv).find('.arrow-nav').attr('class','arrow-nav arrow-nav-'+index);
                        
                        //加载点击模块对应模版信息
                        that.getModels(mchId,mType);
                    });
                }
            },
            error: function(result){
                result = [{modelType:'运营'},{modelType:'门店'}];
                $.each(result,function(i,n){
                    //默认展示第一个
                    if ( i == 0 ) {
                        $(that.pdiv).find('.arrow-nav-title').append("<li class='cur-li' data-role='0'>" + n.modelType + "</li>");
                        
                        //加载模块对应模版信息
                        that.getModels(mchId,n.modelType);
                    }else{
                        $(that.pdiv).find('.arrow-nav-title').append("<li data-role='" + i + "'>" + n.modelType + "</li>");
                    }

                    //绑定模块运营、门店点击事件
                    $(that.pdiv).find('.arrow-nav li').on('click',function() {
                        //模块部分运营、门店样式改变
                        $(this).siblings().removeClass('cur-li');
                        $(this).addClass('cur-li');

                        var index = $(this).attr('data-role'),
                            mType = $(this).text();
                        $(that.pdiv).find('.arrow-nav').attr('class','arrow-nav arrow-nav-'+index);
                        
                        //加载点击模块对应模版信息
                        that.getModels(mchId,mType);
                        
                    });
                });
            }
        });
    },
    /**
     * [getModels 初始模版信息，如多个优惠卷]
     * @param  {string} modelType [模块信息如运营、门店]
     */
    getModels: function(mchId,modelType) {
        var titleLdiv = $(this.pdiv).find('.demo_title_list');
        $(titleLdiv).html('');

        var that = this;
        $.ajax({
            url:"sys/menu/searchModels",
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
                            
                            //加载该模版对应的图文条目
                            $.msgDemo.getPicMessages(mchId,o.modelVisit,that);
                        }else{
                            $(titleLdiv).append("<li data-role='"+ o.modelVisit+"'><img src='"+ o.modelPicUrl+"' alt=\"\"/><p>"+ o.modelName+"</p><span></span></li >");
                        }
                    });
                    //绑定点击模版--某优惠卷加载图文条目时间
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
                        
                        //加载该模版对应的图文条目
                        $.msgDemo.getPicMessages(mchId,o.modelVisit,that);
                    }else{
                        $(titleLdiv).append("<li data-role='"+ o.modelVisit+"'><img src='"+ o.modelPicUrl+"' alt=\"\"/><p>"+ o.modelName+"</p><span></span></li >");
                    }
                });
                //绑定点击模版--某优惠卷加载图文条目时间
                $(titleLdiv).find('li').on('click',function(){
                    $.msgDemo.getPicMessages(mchId,$(this).data('role'),that);
                });
            }
        });
    },
    initCheckedPreview: function(){
        $(this.pdiv).find('.demo_list').html('');
        var picMessages = this.newCheckedMsg.picMessages;
        var demoListDiv = $(this.pdiv).find('.demo_list');
        var that = this;
        for(var i=0,ii=picMessages.length;i<ii;i++){
            if(i==0) {
                //第一条加载大图的样式z
                $(demoListDiv).append("<div class='demo_st' data-list='" + picMessages[i].datalist + "' data-srcurl='" + picMessages[i].url + "' data-largeurl='" + picMessages[i].largePicUrl + "' data-smallurl='" + picMessages[i].smallPicUrl + "' data-msg='" + picMessages[i].msg + "'> <a class=\"close_demo\" href=\"javascript:;\"></a> <p>"+picMessages[i].title+"</p> <img src='" + picMessages[i].largePicUrl + "' alt=''> </div>");
            }else{
                //小图样式
                $(demoListDiv).append("<div class='deme_title_info' data-list='" + picMessages[i].datalist + "' data-srcurl='" + picMessages[i].url + "' data-largeurl='" + picMessages[i].largePicUrl + "' data-smallurl='" + picMessages[i].smallPicUrl + "' data-msg='" + picMessages[i].msg + "'> <a class=\"close_demo\" href=\"javascript:;\"></a> <p>"+picMessages[i].title+"</p> <img src='" + picMessages[i].smallPicUrl + "' alt=''> </div>");
            }
        }
        $(demoListDiv).find('.close_demo').on('click',function(){
            $.msgDemo.del_list(this,that);
        });
    }
};
$.msgDemo.prototype.init.prototype = $.msgDemo.prototype;
/**
 * [getDemoChecked 获取图文编辑中已选择的图文条目]
 * @param  {dom} pdiv [图文编辑模块的父容器]
 * @return {array}      [已选择的图文条目的对象数组]
 */
$.msgDemo.getDemoChecked = function(pdiv) {
    var checkLists= $(pdiv).find('.demo_list>div');
    var checkedInfos = [],
        o = {};
    $(checkLists).each(function(){
        o = {
            "datalist": $(this).data('list'),
            "largePicUrl": $(this).data('largeurl'),
            "msg": $(this).data('msg'),
            "smallPicUrl": $(this).data('smallurl'),
            "title": $(this).find('p').text(),
            "url": $(this).data('srcurl')
        };
        checkedInfos.push(o);
    });
    return checkedInfos;
}
/**
 * [getPicMessages 加载模版对应的图文条目]
 * @param  {string} mchId      [登录标识]
 * @param  {string} modelVisit [模版标识]
 * @param  {object} msgDemo    [msgDemo对象]
 */
$.msgDemo.getPicMessages = function(mchId,modelVisit,msgDemo){
    //清空条目信息和已选择条码信息
    $(msgDemo.pdiv).find('.demo_main_info').html('');

    $.ajax({
        url:modelVisit,
        type:"POST",
        dataType:"json",
        async:false,
        data:{"mchId":mchId},
        success:function(obj){
            if ( obj != null ) {
                $.each(obj,function(i,p){
                    $(msgDemo.pdiv).find(".demo_main_info").append("<li data-list='"+ p.systemId+"' data-url='"+ p.url+"' data-msg='"+p.description+"' data-largeurl='"+ p.largePicUrl+"' data-smallurl='"+ p.picUrl+"'><span></span><img src='"+ p.picUrl+"' alt=\"\"/><p>"+ p.title+"</p></li>");
                });
                $(msgDemo.pdiv).find('.demo_main_info span').on('click',function(){
                    $.msgDemo.check_list(this,msgDemo);
                });

                //加载默认选中的图文条目
                $.msgDemo.defaultChecked(msgDemo);
            }
        },
        error: function(obj) {
            obj = [{
                systemId: '5578',
                url: '#',
                largePicUrl: 'images/bacimg.png',
                picUrl: 'images/bacimg.png',
                description: '这是第三条规则说明',
                title: '这是第三条规则说明'
            },{
                systemId: '5581',
                url: '#',
                largePicUrl: 'images/bacimg.png',
                picUrl: 'images/bacimg.png',
                description: '这是第si条规则说明',
                title: '这是第si条规则说明'
            }];
            $.each(obj,function(i,p){
                $(msgDemo.pdiv).find(".demo_main_info").append("<li data-list='"+ p.systemId+"' data-url='"+ p.url+"' data-msg='"+p.description+"' data-largeurl='"+ p.largePicUrl+"' data-smallurl='"+ p.picUrl+"'><span></span><img src='"+ p.picUrl+"' alt=\"\"/><p>"+ p.title+"</p></li>");
            });

            $(msgDemo.pdiv).find('.demo_main_info span').on('click',function(){
                $.msgDemo.check_list(this,msgDemo);
            });

            //加载默认选中的图文条目的勾选样式
            $.msgDemo.defaultChecked(msgDemo);
        }
    });
}
//图文消息首个选中大图样式展示
$.msgDemo.check_first = function(pdiv) {
    var demoListDiv = $(pdiv).find('.demo_list>div');
    $(demoListDiv).attr('class','deme_title_info');
    var demoListDivFir = $(demoListDiv).eq(0);
    $(demoListDivFir).attr('class','demo_st');
    $(demoListDivFir).find('img').attr('src',$(demoListDivFir).data('largeurl'));
}
//图文消息删除选中
$.msgDemo.del_list = function(clickObj,msgDemo) {
    var pdiv = msgDemo.pdiv,
        picMessages = msgDemo.newCheckedMsg.picMessages;
    var n = $(clickObj).parent(),
        l = n.data('list');
    $(pdiv).find('.demo_info li').each(function(i){
        if ( $(this).data('list') == l ) {
            $(this).children('span').removeClass('img_check');
        }
    });
    for ( var kk=0;kk<picMessages.length;kk++){
        if ( l == picMessages[kk].datalist ) {
            picMessages.splice(kk,1);
            msgDemo.newCheckedMsg.picMessages = picMessages;
            break;
        }
    }
    n.remove();
    $.msgDemo.check_first(pdiv);
}
//图文消息选中
$.msgDemo.check_list = function(clickObj,msgDemo) {
    var pdiv = msgDemo.pdiv,
        picMessages = msgDemo.newCheckedMsg.picMessages;
    var msgItemIndex = $(pdiv).find('.arrow-nav-title .cur-li').attr('data-role');

    if ( $(clickObj).hasClass('img_check') == false ) {
        //验证是否已选中10条
        var MAX_CHECK_NUM = 10;
        if ( picMessages && picMessages.length >= MAX_CHECK_NUM ) {
            $.lightBox({
                width:200,
                boxID:'tips',
                closeOther:false,
                html:'<p style="text-align:center;">最多只能添加十条信息!</p>',
                buttons:null
            });
            return;
        }
        $(clickObj).addClass('img_check');
        var clickPobj = $(clickObj).parent();
        var p = {
            "datalist": $(clickPobj).data('list'),
            "largePicUrl": $(clickPobj).data('largeurl'),
            "msg": $(clickPobj).data('msg'),
            "smallPicUrl": $(clickPobj).data('smallurl'),
            "title": $(clickObj).nextAll('p').text(),
            "url": $(clickPobj).data('url')
        };
        var domH = "";
        if ( $(pdiv).find('.img_check').length == 1 ) {
            domH = "<div class='demo_st' data-list='" + p.datalist + "' data-srcurl='" + p.url + "' data-largeurl='" + p.largePicUrl + "' data-smallurl='" + p.smallPicUrl + "' data-msg='" + p.msg + "'> <a class=\"close_demo\" href=\"javascript:;\"></a> <p>"+p.title+"</p> <img src='" + p.largePicUrl + "' alt=''> </div>";
        } else {
            domH = "<div class='deme_title_info' data-list='" + p.datalist + "' data-srcurl='" + p.url + "' data-largeurl='" + p.largePicUrl + "' data-smallurl='" + p.smallPicUrl + "' data-msg='" + p.msg + "'> <a class=\"close_demo\" href=\"javascript:;\"></a> <p>"+p.title+"</p> <img src='" + p.smallPicUrl + "' alt=''> </div>";
        }
        var appendDom = $(domH);
        $(pdiv).find('.demo_list').append(appendDom);

        $(appendDom).find('.close_demo').on('click',function(){
            $.msgDemo.del_list(this,msgDemo);
        });
        //添加已选择的数据
        picMessages.push(p);
        msgDemo.newCheckedMsg.picMessages = picMessages;
    } else {
        $(clickObj).removeClass('img_check');
        var s = $(clickObj).parent().data('list');
        $(pdiv).find('.demo_list>div').each(function(i){
            if ( $(this).data('list') == s ){
                $(this).remove();
            }
        });
        //删除数组存储
        for ( var kk=0;kk<picMessages.length;kk++){
            if ( s == picMessages[kk].datalist ) {
                picMessages.splice(kk,1);
                msgDemo.newCheckedMsg.picMessages = picMessages;
                break;
            }
        }

    }
    $.msgDemo.check_first(pdiv);
}
/**
 * [defaultChecked 根据传入对象多选框选中样式]
 * @param  {object} msgDemo [msgDemo对象，成员一pdiv：表示当前图文模块的父级容器
 * 成员二checkedMsg:{index:当前编辑图文在规则包含所有图文中的索引,picMessages:当前规则下标INDEX对应的图文的数组}]
 */
$.msgDemo.defaultChecked = function(msgDemo){
    if ( msgDemo.newCheckedMsg ) {
        var checkedMsgArray = msgDemo.newCheckedMsg.picMessages,
            pdiv = msgDemo.pdiv,
            checkedIds = ',';
        if( checkedMsgArray && checkedMsgArray.length ) {
            for(var kk in checkedMsgArray){
                checkedIds += checkedMsgArray[kk].datalist + ',';
            }
            $(pdiv).find('.demo_info span').each(function(){
                var d = $(this).parent().data('list');
                if ( checkedIds.indexOf(',' + d + ',') != -1 ){
                    $(this).addClass('img_check');
                }
            })
        }  
    }
}
//清除所有选中
$.msgDemo.clearAll = function(pdiv){
    $(pdiv).find('.close_demo').click();
}
$.fn.extend({
    // bindNavEvent: function() {
    //     //为各模块导航添加事件
    //     var that = this;
    //     $(this).find('.arrow-nav li').on('click',function() {
    //         $(this).siblings().removeClass('cur-li');
    //         $(this).addClass('cur-li');

    //         var index = $(this).attr('data-role');
    //         $(that).find('.arrow-nav').attr('class','arrow-nav arrow-nav-'+index);
    //         $(that).find('.msg-item').removeClass('cur-item').eq(index).addClass('cur-item');

    //     });
    // },
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
            var text = $(this).val() || $(this).text();
            if ( text.length > MAX_INPUT_WORD ) {
                if( $(this).val() ) {
                    $(this).val(text.slice(0,MAX_INPUT_WORD));
                } else {
                    $(this).text(text.slice(0,MAX_INPUT_WORD));
                }
                $(leftWordDom).text(0);
            } else {
                $(leftWordDom).text( MAX_INPUT_WORD - text.length );
            }
        });
    }
});

function getVarType(o){
    var _t;
    return ((_t = typeof(o)) == "object" ? o==null && "null" || Object.prototype.toString.call(o).slice(8,-1):_t).toLowerCase();
}
//对象深拷贝
function objDeepCopy(destination,source){
    for ( var p in source ) {
        if( getVarType(source[p]) == "array" || getVarType(source[p]) == "object" ) {
            destination[p] = getVarType(source[p]) == "array" ? [] : {};
            arguments.callee(destination[p],source[p]);
        } else {
            destination[p]=source[p];
        }
    }
}