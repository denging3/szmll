/* ======================================
* copyRight: meilele
* fileName: we_feedback.js
* createTime: 2015/12/15
* author: dengyun@meilele
* version: 1.0
* modify: {}
* description: 系统-微回复页面涉及js
======================================== */
var MCHID = '111';
!function(){
    var pageQuery = window.location.search.substr(1).split('&');
    var pageParam = ( /page=/.test(pageQuery[0]) ) ? ( pageQuery[0].replace('page=','') ) : '1-1-0';
    window._pageConf ={
        '1-0-0': {
            pageIndex: '1-0-0',
            defaultFunc: function() {
                goPage(window._pageConf['1-1-0']);
            }
        },
        '1-1-0': {
            pageIndex: '1-1-0',
            defaultFunc: function() {
                goPage(window._pageConf['1-1-2']);
            }
        },
        '1-1-1': {
            pageIndex: '1-1-1',
            display: [{curIndex:0,dataUrl:['1-0-0','2-0-0','3-0-0']},
                {curIndex:0,dataUrl:['1-1-0','1-2-0','1-3-0']},
                {curIndex:0,dataUrl:['1-1-1','1-1-2']}],
            pageLoad: 'page/msg_imgtext_kinds.html',
            callFunc: function() {
                // $("#js-page1-1-1").addSettingModual(MCHID);
                // $("#js-page1-1-1").bindNavEvent();
                $.msgDemo($("#js-page1-1-1"),MCHID,{index:0,picMessages:[]});
                $("#js-page1-1-1").addFooterOper(null);
            }

        },
        '1-1-2': {
            pageIndex: '1-1-2',
            display: [{curIndex:0,dataUrl:['1-0-0','2-0-0','3-0-0']},
                {curIndex:0,dataUrl:['1-1-0','1-2-0','1-3-0']},
                {curIndex:1,dataUrl:['1-1-1','1-1-2']}],
            pageLoad: 'page/msg_text.html',
            callFunc: function(){
                $("#js-page1-1-2").addFooterOper(null);
                $('#js-page1-1-2').bindwordValid();
            }
        },
        '1-2-0': {
            pageIndex: '1-2-0',
            display: [{curIndex:0,dataUrl:['1-0-0','2-0-0','3-0-0']},
                {curIndex:1,dataUrl:['1-1-0','1-2-0','1-3-0']},
                {}],
            pageLoad: 'page/param_feedback.html',
            callFunc: function(){
                $('#js-page1-2-0').find('.js-add-rule').on('click',addQrRule);
            }
        },
        '1-3-0': {
            pageIndex: '1-3-0',
            display: [{curIndex:0,dataUrl:['1-0-0','2-0-0','3-0-0']},
                {curIndex:2,dataUrl:['1-1-0','1-2-0','1-3-0']},
                {}],
            pageLoad: 'page/param_feedback.html',
            callFunc: function(){
                $('#js-page1-3-0').find('.js-add-rule').on('click',function(){
                    addQrRule('mllConcern');
                });
            }
        },
        '2-0-0': {
            pageIndex: '2-0-0',
            defaultFunc: function(){
                goPage(window._pageConf['2-0-2'],[{selector:'#js-page2-0-2 .js-editorArea',value: '这是一个初始化实例aaaa',domType: 'text'}]);
            }
        },
        '2-0-1': {
            pageIndex: '2-0-1',
            display: [{curIndex:1,dataUrl:['1-0-0','2-0-0','3-0-0']},
                {},
                {curIndex:0,dataUrl:['2-0-1','2-0-2']}],
            pageLoad: 'page/msg_imgtext_kinds.html',
            callFunc: function() {
                // $("#js-page2-0-1").addSettingModual(MCHID);
                // $("#js-page2-0-1").bindNavEvent();
                $.msgDemo($("#js-page2-0-1"),MCHID);
                $("#js-page2-0-1").addFooterOper(null);
            }
        },
        '2-0-2': {
            pageIndex: '2-0-2',
            display: [{curIndex:1,dataUrl:['1-0-0','2-0-0','3-0-0']},
                {},
                {curIndex:1,dataUrl:['2-0-1','2-0-2']}],
            pageLoad: 'page/msg_text.html',
            callFunc: function(){
                //添加操作按钮
                $("#js-page2-0-2").addFooterOper([{
                        value: '删除回复',className: 'cancel-button',cbFun: delFeed
                    },{
                        value: '确  认',className: 'bright-button',cbFun: confirmTextFeed }]);

                //绑定验证事件
                $('#js-page2-0-2').bindwordValid();
            },
            initFunc: function(){
                return [{selector:'#js-page2-0-2 .js-editorArea',value: '这是另一个实例',domType: 'text'}]
            }
        },
        '3-0-0': {
            pageIndex: '3-0-0',
            display: [{curIndex:2,dataUrl:['1-0-0','2-0-0','3-0-0']},{},{}],
            pageLoad: 'page/keyword_feedback.html',
            callFunc: function(){
                $('#js-page3-0-0').find('.js-add-rule').on('click',addRule);
            }
        }
    };
    var curConf = window._pageConf[pageParam];
    goPage(curConf);

    $('.sec-header li').on('click',function(){
        var pageParam = $(this).attr('data-role');
        goPage(window._pageConf[pageParam]);
    });

    //添加规则弹框填充图文公共模块
    $('.js-main1').load('page/msg_imgtext_kinds.html');
    $('.js-main2').load('page/msg_text.html',function(){
        $(this).bindwordValid();
    });
    $('.addTextMsg').load('page/msg_text.html');
    $('.addMsgItem').load('page/msg_imgtext_kinds.html');
}();
/**
 * [goPage 微回复导航页面跳转]
 * @param  {object} curPage : {pageIndex:{string}当前导航位置；display：对象数组表示当前页面各级导航信息；pageLoad: 加载的html路径；callFunc: 加载完成后调用方法；}
 * @param  {array}  initValue [初始化值的方法]
 * initValue参数格式：[{selector:'#js-page2-2-2 .js-editorArea',value: '这是一个初始化实例',domType: 'text'},{}...]
 */
function goPage(curPage,initValue){
    //当page配置中存在默认执行函数时则执行该方法
    //用于获取参数跳转到其他页面
    if( curPage.defaultFunc ) {
        curPage.defaultFunc();
        return;
    }
    //无初始值且page配置中存在initFunc时调用方法设置初始值
    if ( !initValue && curPage.initFunc ) {
        initValue = curPage.initFunc();
    }

    var display = curPage.display;
    for ( var k in display ) {
        if ( display[k].dataUrl ) {
            $('.tab-menu-' + k).show();
            $('.tab-menu-' + k).find('li').removeClass('current')
            $('.tab-menu-' + k).find('li').eq(display[k].curIndex).addClass('current');
            $('.tab-menu-' + k).find('li').each(function(i){
                $(this).attr('data-role',display[k].dataUrl[i]);  
            });
        } else {
            $('.tab-menu-' + k).hide();
        }
    }
    
    if ( !$('#js-page'+curPage.pageIndex).text() ) {
        if ( initValue && initValue.length ) {
            if ( curPage.callFunc ) {
                $( '#js-page' + curPage.pageIndex ).load(curPage.pageLoad,function() {
                    initVals(initValue);
                    curPage.callFunc();
                });
            } else {
                $( '#js-page' + curPage.pageIndex ).load(curPage.pageLoad,function() {
                    initVals(initValue);
                });
            }
        } else {
            if ( curPage.callFunc ) {
                $( '#js-page' + curPage.pageIndex ).load(curPage.pageLoad,curPage.callFunc);
            } else {
                $( '#js-page' + curPage.pageIndex ).load(curPage.pageLoad);
            }
        }
    } else {
        if ( initValue && initValue.length ) {
            initVals(initValue);
        }
    }

    $('.sec-main .page-content').hide();
    $('#js-page'+curPage.pageIndex).show();
}
/**
 * [initVals 初始化元素值]
 * @param  {array} initValue [初始化值对象数组。对象的项分别是dom的选择表达式，dom的值，dom类型若为text则dom.text()修改值，为input则dom.val()修改值]
 * initValue参数格式：[{selector:'#js-page2-2-2 .js-editorArea',value: '这是一个初始化实例',domType: 'text'},{}...]
 */
function initVals(initValue) {
    for ( var kk in initValue ) {
        if ( $(initValue[kk].selector)[0] ) {
            if ( initValue[kk].domType == 'input' ) {
                $(initValue[kk].selector).val(initValue[kk].value);
            } else {
                $(initValue[kk].selector).text(initValue[kk].value);
            }
        }
    }
}

/**
 * [addQrRule 添加二维码规则弹窗展示]
 * 步骤：
 * 1、清除编辑二维码过的数据
 * 2、展示添加规则框
 * 3、点击二维码选择按钮事件
 * 4、图文模块加载切换事件
 */
function addQrRule(editType){
    //初始化选定规则
    window.__chosedQR = [];

    $.lightBox({
        width: 975,
        boxID: 'addQrRule',
        title: '添加规则',
        html: $('.addQrRule').html(),
        buttons: [{
            value: '取  消',
            className: 'dia-close cancel-button'
        },{
            value: '确  认',
            className: 'bright-button',
            callbackFun: function(){
                if ( editType && editType == 'mllConcern' ) {
                    addQrCommitMllConcern(this,checkedMsg);
                } else {
                    console.log('confrim...........................');
                    console.log(checkedMsg);
                    addQrCommit(this,checkedMsg);
                }
            }
        }]
    });

    //选择二维码事件
    if ( editType && editType == 'mllConcern' ) {
        $.screenQREvent(window.__chosedQR);
    } else {
        $.choQREvent(window.__chosedQR);
    }
    
    //图文模块添加事件
    var checkedMsg = $.msgDemo($('#addQrRuleDia'),MCHID,{index:0,picMessages:[]});

    $('.data-dia .radio-wefeed').on('click',function(){
        $('.data-dia .radio-wefeed').removeClass('radio-current');
        var index = $(this).attr('data-role');
        $('.data-dia .rule-main').children().hide().eq(index).show();
        $(this).addClass('radio-current');
    });
}
/**
 * [editQrRule 编辑规则弹框展示]
 * @param  {[string]} ruleInfo [表示当前规则信息，各数据项以'|'分隔，依次是规则ID|规则名|配置qrid..]
 * @return {[type]}          [description]
 */
function editQrRule(id,editType){
    //TODO
    //根据已配置id获取qr信息
    //以下模拟请求复制给window.__chosedQR

    var editBox = $.lightBox({
        width: 975,
        boxID: 'addQrRule',
        title: '编辑规则',
        html: $('.addQrRule').html(),
        buttons: [{
            value: '取  消',
            className: 'dia-close cancel-button'
        },{
            value: '确  认',
            className: 'bright-button',
            callbackFun: function(){
                var checkedMsg = $.msgDemo.getDemoChecked('#addQrRuleDia');
                if ( editType && editType == 'mllConcern' ) {
                    addQrCommitMllConcern(this,checkedMsg);
                } else {
                    console.log('confrim...........................');
                    console.log(checkedMsg);
                    addQrCommit(this,checkedMsg);
                }
            }
        }]
    });
    //根据已配置id获取qr信息
    if ( editType && editType == 'mllConcern' ) {
        qrBoxAjaxDataMllConcern(id);
    } else {
        qrBoxAjaxData(id);
    }
    //编辑框内容跟新
    $('#addQrRuleDia .radio-wefeed').each(function(){
        if ( $(this).data('role') == 1 ) {
            $(this).siblings().removeClass('radio-current');
            $(this).addClass('radio-current');
            $('#addQrRuleDia .rule-main').children().hide().eq(1).show();
        }
    });

    $('.data-dia .radio-wefeed').on('click',function(){
        $('.data-dia .radio-wefeed').removeClass('radio-current');
        var index = $(this).attr('data-role');
        $('.data-dia .rule-main').children().hide().eq(index).show();
        $(this).addClass('radio-current');
    });
}
/**
 * [qrBoxAjaxData ajax请求数据，规则编辑弹窗数据信息]
 * @param  {number} id         [规则id]
 */
function qrBoxAjaxData(id){
    $.ajax({
        url:"sys/reply/searchParamAttById",
        data:{"id":id},
        dataType:"json",
        type:"POST",
        async:false,
        success:function(data){
            if(data!=null||data!=''){
                // 规则名
                $('#addQrRuleDia .js-rulename').val(data.ruleName);
                //选择二维码事件
                //根据有参关注还是美乐乐有参关注绑定二维码选择事件
                window.__chosedQR = createArrayQrs(data);
                $.choQREvent(window.__chosedQR);
                // 文本消息
                if(data.message!=null&&data.message!='undefined'){
                    $('#addQrRuleDia .js-editorArea').text(data.message.msg);
                }
                //morp判断标志 0表示图文信息，1表示文字信息
                $('#addQrRuleDia .radio-wefeed').each(function(){
                    if ( $(this).data('role') == data.morp ) {
                        $(this).siblings().removeClass('radio-current');
                        $(this).addClass('radio-current');
                        $('#addQrRuleDia .rule-main').children().hide().eq(data.morp).show();
                    }
                });
                if(data.picMessage!=null&&data.picMessage!='undefined'){
                    $.msgDemo($('#addQrRuleDia'),'111',{picMessages:data.picMessage});
                }
            }
        },
        error:function(){
            window.__chosedQR = [
                {id:1,desc:'2003宇宙大爆炸'},
                {id:5,desc:'2099去可可西里看看海'}
            ];
            $.choQREvent(window.__chosedQR);
            $.msgDemo($('#addQrRuleDia'),'111',{picMessages:[]});
        }
    });
}
/**
 * [qrBoxAjaxDataMllConcern 美乐乐有参关注，ajax请求数据，规则编辑弹窗数据信息]
 * @param  {number} id         [规则id]
 */
function qrBoxAjaxDataMllConcern(id){
    //TODO JIANGCHENG
    $.ajax({
        url:"sys/reply/searchParamAttById",
        data:{"id":id},
        dataType:"json",
        type:"POST",
        async:false,
        success:function(data){
            if(data!=null||data!=''){
                // 规则名
                $('#addQrRuleDia .js-rulename').val(data.ruleName);
                //选择二维码事件
                //根据有参关注还是美乐乐有参关注绑定二维码选择事件
                window.__chosedQR = data.qrCode;
                $.screenQREvent(window.__chosedQR);
                // 文本消息
                if(data.message!=null&&data.message!='undefined'){
                    $('#addQrRuleDia .js-editorArea').text(data.message.msg);
                }
                //morp判断标志 0表示图文信息，1表示文字信息
                $('#addQrRuleDia .radio-wefeed').each(function(){
                    if ( $(this).data('role') == data.morp ) {
                        $(this).siblings().removeClass('radio-current');
                        $(this).addClass('radio-current');
                        $('#addQrRuleDia .rule-main').children().hide().eq(data.morp).show();
                    }
                });
                if(data.picMessage!=null&&data.picMessage!='undefined'){
                    $.msgDemo($('#addQrRuleDia'),'111',{picMessages:data.picMessage});
                }
            }
        }
    });
}
/**
 * [addQrCommit 有参关注规则编辑添加提交]
 * @param {bom} comfirmBtn [确认按钮]
 * @param {obj} checkedMsg [图文编辑对象]
 */
function addQrCommit(comfirmBtn,checkedMsg){
    // 规则名
    var ruleName = $.trim($('#addQrRuleDia .js-rulename').val());
    // 已选择的二维代码串，逗号分隔
    var qrcodeStr = $('#addQrRuleDia .js-cho-qr input[name=qrCode]').val();
    //已选择的二维码的场景id
    var qrcodeKeys = $('#addQrRuleDia .js-cho-qr input[name=qrKeys]').val();
    //勾选的图文消息对象数组
    var picMessages = checkedMsg.picMessages;
    // 文本消息
    var textmsg = $('#addQrRuleDia .js-editorArea').text();
    //morp判断标志 0表示图文信息，1表示文字信息
    var morp = $('#addQrRuleDia .radio-current').data('role');
    if(ruleName==''){
        alert('规则名称不能为空！！');
        return;
    }else if(ruleName.length>60){
        alert('规则名称不能超过60个字符！！');
        return;
    }
    if(qrcodeStr==null||qrcodeStr=="undefined"|| $.trim(qrcodeStr)==''){
        alert('请选择二维码！！');
        return;
    }
    var paramAtt = new Object();
    paramAtt.replyType="1";
    paramAtt.morp=morp;
    paramAtt.ruleName=ruleName;
    paramAtt.qrCode=qrcodeStr;
    paramAtt.message={"msg":textmsg};
    paramAtt.picMessage=picMessages;
    paramAtt.key=qrcodeKeys;
    // if(window.__chosedQR.desc.length>0){
    //     paramAtt.qrName=window.__chosedQR.desc.join(',');
    // }
    if(window.__chosedQR.length>0){
        var qrCodeNames = getSreenIds(window.__chosedQR,'qrCodeName');
        if ( qrCodeNames && qrCodeNames.length > 0 ) {
            var descs = qrCodeNames.join(',');
            paramAtt.qrName=descs;
        }
    }
    var jsonStr = JSON.stringify(paramAtt);
    $.ajax({
        url:"sys/reply/ntpl/insertParamAtt",
        async:false,
        data:{"jsonStr":jsonStr},
        dataType:"json",
        type:"POST",
        success:function(response){
            if (response.code==0) {
                alert("保存成功！");
                $.lightBox.closeBox($(comfirmBtn)[0].lightBox);
                var pageNum=$("input[name='page']").val();
                $('#js-page1-2-0').load("sys/reply/ntpl/searchParamAtt?page="+pageNum,function(){
                    $('#js-page1-2-0').find('.js-add-rule').on('click',addQrRule);
                });
            } else {
                alert( "保存失败！");
            }
        }
    });
}
//美乐乐有参关注提交
function addQrCommitMllConcern(comfirmBtn,checkedMsg){
    //TODO JIANGCHENG
    // 规则名
    var ruleName = $.trim($('#addQrRuleDia .js-rulename').val());
    // 已选择的二维代码串，逗号分隔
    var qrcodeStr = $('#addQrRuleDia .js-cho-qr input[name=qrCode]').val();
    //已选择的二维码的场景id
    var qrcodeKeys = $('#addQrRuleDia .js-cho-qr input[name=qrKeys]').val();
    //勾选的图文消息对象数组
    var picMessages = checkedMsg.picMessages;
    // 文本消息
    var textmsg = $('#addQrRuleDia .js-editorArea').text();
    //morp判断标志 0表示图文信息，1表示文字信息
    var morp = $('#addQrRuleDia .radio-current').data('role');
    if(ruleName==''){
        alert('规则名称不能为空！！');
        return;
    }else if(ruleName.length>60){
        alert('规则名称不能超过60个字符！！');
        return;
    }
    if(qrcodeStr==null||qrcodeStr=="undefined"|| $.trim(qrcodeStr)==''){
        alert('请选择二维码！！');
        return;
    }
    var paramAtt = new Object();
    paramAtt.replyType="1";
    paramAtt.morp=morp;
    paramAtt.ruleName=ruleName;
    paramAtt.qrCode=qrcodeStr;
    paramAtt.message={"msg":textmsg};
    paramAtt.picMessage=picMessages;
    paramAtt.key=qrcodeKeys;
    if(window.__chosedQR.length>0){
        var qrCodeNames = getSreenIds(window.__chosedQR,'qrCodeName');
        if ( qrCodeNames && qrCodeNames.length > 0 ) {
            var descs = qrCodeNames.join(',');
            paramAtt.qrName=descs;
        }
    }
    var jsonStr = JSON.stringify(paramAtt);
    $.ajax({
        url:"sys/reply/ntpl/insertParamAtt",
        async:false,
        data:{"jsonStr":jsonStr},
        dataType:"json",
        type:"POST",
        success:function(response){
            if (response.code==0) {
                alert("保存成功！");
                $.lightBox.closeBox($(comfirmBtn)[0].lightBox);
                var pageNum=$("input[name='page']").val();
                $('#js-page1-2-0').load("sys/reply/ntpl/searchParamAtt?page="+pageNum,function(){
                    $('#js-page1-2-0').find('.js-add-rule').on('click',addQrRule);
                });
            } else {
                alert( "保存失败！");
            }
        }
    });
}
/**
 * [createArrayQrs 返回的data数据构造window.__chosedQR]
 * @param  {object} data [包含qrCode,qrName,key项的对象]
 * @return {array}      [返回window.__chosedQR]
 */
function createArrayQrs(data){
    var resArray = [];
    var qrCodeIds = ( !data.qrCode ) ? data.qrCode.split(',') : [],
        qrCodeNames = ( !data.qrName ) ? data.qrName.split(',') : [],
        qrSenceIds = ( !data.key ) ? data.key.split(',') : [];
    var qrCodeIdsLen = qrCodeIds.length,
        qrCodeNamesLen = qrCodeNames.length,
        qrSenceIdsLen = qrSenceIds.length;
    var tempQrCode = {};
    for ( var kk in qrCodeIds ) {
        tempQrCode.id = qrCodeIds[kk];
        tempQrCode.qrCodeName = ( kk < qrCodeNamesLen ) ? qrCodeNames[kk] : '';
        tempQrCode.qrSenceId = ( kk < qrSenceIdsLen ) ? qrSenceIds[kk] : '';
        resArray.push(tempQrCode);
    }
    return resArray;
}
/**
 * [delKeywordFeedback 确认删除规则]
 * @param  {number} qrRuleId [规则id]
 */
function delKeywordFeedback(keywordFeedbackId){
    $.lightBox({
        width: 390,
        title: '删除确认',
        boxID: 'delKeyWordFB',
        html: '<p style="text-align:center;">是否确认删除？</p>',
        buttons: [{
            value: '取  消',
            className: 'dia-close cancel-button'
        },{
            value: '确  认',
            className: 'bright-button',
            callbackFun: function(){
                //TODO
                //待完善删除二维码规则
                // window.location.reload();
                var thisBtn = this;
                $.post("sys/reply/ntpl/deleteKwdRp?id=" + keywordFeedbackId , function (response) {
                    if (response.msg == "SUCCESS") {
                        var pageNum=$("input[name='page1']").val();
                        $("#js-page3-0-0").load("sys/reply/ntpl/searchKwdRp?page="+pageNum,function(){
                            $('#js-page3-0-0').find('.js-add-rule1').on('click',addRule);
                        });
                        /*$("#keyWordFeedbackForm").attr("action", "${action}");
                         $("#keyWordFeedbackForm").submit();*/
                        var thisLightBox = $(thisBtn)[0].lightBox,
                            thisLBdom = thisLightBox.dom;
                        $.lightBox.closeBox(thisLightBox);
                    } else {
                        alert("操作失败！");
                    }
                });
            }
        }]
    });
}

/**
 * [delKeywordFeedback 确认删除规则]
 * @param  {number} qrRuleId [规则id]
 */
function delParamAtt(paramAttId){
    $.lightBox({
        width: 390,
        title: '删除确认',
        boxID: 'delParamAtt',
        html: '<p style="text-align:center;">是否确认删除？</p>',
        buttons: [{
            value: '取  消',
            className: 'dia-close cancel-button'
        },{
            value: '确  认',
            className: 'bright-button',
            callbackFun: function(){
                var that = this;
                $.lightBox.closeBox($(that)[0].lightBox);
                //TODO
                //待完善删除二维码规则
                $.post("sys/reply/ntpl/deleteParamAtt?id=" + paramAttId , function (response) {
                    if (response.msg == "SUCCESS") {
                        var pageNum=$("input[name='page']").val();
                        $("#js-page1-2-0").load("sys/reply/ntpl/searchParamAtt?page="+pageNum,function(){
                            $('#js-page1-2-0').find('.js-add-rule').on('click',addQrRule);
                        });
                        $.lightBox.closeBox($(that)[0].lightBox);
                    } else {
                        alert("操作失败！");
                    }
                });

            }
        }]
    });
}
/**
 * [delQrRule 确认删除规则]
 * @param  {number} qrRuleId [规则id]
 */
function delQrRule(qrRuleId){
    $.lightBox({
        width: 390,
        title: '删除确认',
        html: '<p style="text-align:center;">是否确认删除该回复设置？</p>',
        buttons: [{
            value: '取  消',
            className: 'dia-close cancel-button'
        },{
            value: '确  认',
            className: 'bright-button',
            callbackFun: function(){
                //TODO
                //待完善删除二维码规则
                // window.location.reload();
                var that = this;
                $.lightBox.closeBox($(that)[0].lightBox);
            }
        }]
    });
}

function addRule(){
    $.lightBox({
        width: 930,
        boxID: 'addRule',
        title: '添加规则',
        html: $('.addRule').html(),
        buttons: [{
            value: '取  消',
            className: 'dia-close cancel-button',
        },{
            value: '确  定',
            className: 'bright-button',
            callbackFun: function() {
                //TODO
                //添加规则。数据交互
                //window.location.reload();
            }
        }]
    });
    // 绑定事件
    $('#addRuleDia .js-rulename').blur(function(){
        alert($(this).val());
        //TODO
    });
    $('#addRuleDia .js-keywords-tr').bindwordValid(30);
}
function editRule(id){
        var lightBD = $.lightBox({
            width: 930,
            boxID: 'addRule',
            title: '编辑规则',
            html: $('.addRule').html(),
            buttons: [{
                value: '取  消',
                className: 'dia-close cancel-button',
            },{
                value: '确  定',
                className: 'bright-button',
                callbackFun: function() {
                    //TODO
                    //编辑规则
                    //window.location.reload();
                }
            }]
        });
        //TODO
        //获取到规则数据
        //{ruleID:***,ruleName:***,textMsg:[{id:,desc:},...],imgMsg:[{id:,desc:,src:,}...]}
        //以下模拟数据
        
        var ruleInfo = {
                ruleID: 2356,
                ruleName: 'this_is_a_rule',
                ruleKeys: '互联网家居,美乐乐,运营',
                textMsg: [{id:235601,desc:'这是一条规则说明',msgType:'textmsg'},{id:235607,desc:'这是另一条规则说明',msgType:'textmsg'}],
                imgMsg: [{picMessages: [{datalist:5578,desc:'这是第三条规则说明',smallPicUrl:'http://www.szmll.com/sts/images/bacimg.png',largePicUrl:'http://www.szmll.com/sts/images/bacimg.png',msgType:'msg'},{datalist:5579,desc:'这是第er条规则说明',smallPicUrl:'http://www.szmll.com/sts/images/bacimg.png',largePicUrl:'http://www.szmll.com/sts/images/bacimg.png',msgType:'msg'}]},
                    {picMessages:[{datalist:5581,desc:'这是第si条规则说明',smallPicUrl:'http://www.szmll.com/sts/images/bacimg.png',largePicUrl:'http://www.szmll.com/sts/images/bacimg.png',msgType:'msg'},{datalist:5582,desc:'这是第w5条规则说明',smallPicUrl:'http://www.szmll.com/sts/images/bacimg.png',largePicUrl:'http://www.szmll.com/sts/images/bacimg.png',msgType:'msg'}]}]
            };

        var msgItemDOM;

        //弹框数据初始化并添加事件
        $('.data-dia .js-rulename').val(ruleInfo.ruleName);
        $('#addRuleDia .js-rulename').on('blur',function(){
                //TODO
        });

        $('.data-dia .js-keywords').text(ruleInfo.ruleKeys);
        $('#addRuleDia .js-keywords-tr').bindwordValid(30);

        for ( var ii in ruleInfo.textMsg ) {
            msgItemDOM = $(createMsgH(ruleInfo.textMsg[ii]));
            $('.data-dia .js-add-content').before(msgItemDOM);
            
            console.log(msgItemDOM);
        }
        for ( ii in ruleInfo.imgMsg ) {
            msgItemDOM = $(createMsgH(ruleInfo.imgMsg[ii].picMessages,'msg'));
            $('.data-dia .js-add-content').before(msgItemDOM);
            (function(index){
                var msgItemParam = {"index": index,picMessages: ruleInfo.imgMsg[index].picMessages};
                $(msgItemDOM).find('.js-editmsg-item').on('click',function(){
                    editMsgItem(this,msgItemParam);
                });
            })(ii);
        }
        // $('.data-dia .js-imgmsg-ids').val(imgMsgIds.join(','));
}
/**
 * [delMsgItem 删除规则配置消息]
 * @param  ruleId [规则ID]
 * @param  msgId  [消息ID]
 */
function delMsgItem(ruleId,msgId){
    $.lightBox({
        width: 390,
        title: '删除确认',
        boxID: 'delMsgItem',
        closeOther: false,
        html: '<p style="text-align:center;">是否确认删除该回复消息设置？</p>',
        buttons: [{
            value: '取  消',
            className: 'dia-close cancel-button'
        },{
            value: '确  认',
            className: 'bright-button',
            callbackFun: function(){
                //TODO
                //删除消息
                $.lightBox.closeBox($(this)[0].lightBox);
            }
        }]
    });
}
/**
 * [addTextMsg 添加文字消息]
 * @param {[dom节点]} obj [点击触发添加文字消息弹框的dom节点]
 */
function addTextMsg(obj){
    //验证是否多于5条
    var valid = validMsgItemNum();
    if ( !valid ) {
        return false;
    }

    $.lightBox({
        width: 585,
        closeOther: false,
        boxID: 'addTextMsg',
        title: '添加文字消息',
        html: $('.addTextMsg').html(),
        buttons: [{
            value: '取  消',
            className: 'dia-close cancel-button'
        },{
            value: '确  定',
            className: 'bright-button',
            callbackFun: function(){
                var thisLightBox = $(this)[0].lightBox,
                    thisLBdom = thisLightBox.dom;
                var text = $(thisLBdom).find('.js-editorArea').text();
                if ( text.length > 0 ) {
                    var msginfo = {id:null,desc:text,msgType:'textmsg'};
                    var addMsgH = createMsgH(msginfo);
                    var pDiv = $.lightBox.getCurDia($(obj));
                    var len = $(pDiv).find('.js-showtextmsg-tr').length;
                    if ( len ) {
                        $(pDiv).find('.js-showtextmsg-tr').eq(len-1).after(addMsgH);
                    } else {
                        $(pDiv).find('.js-keywords-tr').after(addMsgH);
                    }
                    
                    $.lightBox.closeBox(thisLightBox);
                } else {
                    alert('输入内容非空！')
                }
            }
        }]
    });
    //添加字数验证
    $('#addTextMsgDia').bindwordValid();
}
function editTextMsg(obj,desc){
    var ptr = $(obj).parent().parent().parent().parent().parent();
    $.lightBox({
        width: 585,
        closeOther: false,
        boxID: 'addTextMsg',
        title: '编辑文字消息',
        html: $('.addTextMsg').html(),
        buttons: [{
            value: '取  消',
            className: 'dia-close cancel-button'
        },{
            value: '确  认',
            className: 'bright-button',
            callbackFun: function(){
                var thisLightBox = $(this)[0].lightBox;
                var thisLBdom = thisLightBox.dom;
                var text = $(thisLBdom).find('.js-editorArea').text();
                if ( text.length ) {
                    $(ptr).find('.js-textmsg').text(text);
                    //更新全局
                    //index为当前文本消息于所有文本消息数组
                    var index = $(ptr).index('#addRuleDia .js-showmsg-tr');

                    $.lightBox.closeBox(thisLightBox);
                } else {
                    alert("输入内容非空！");
                }
                
            }
        }]
    });
    //TODO
    //是否关闭时提交
    $('#addTextMsgDia .js-editorArea').text($(ptr).find('.js-textmsg').text());
    //添加字数验证
    $('#addTextMsgDia').bindwordValid();
}
function addMsgItem(obj){
    //验证是否多于5条
    var valid = validMsgItemNum();
    if ( !valid ) {
        return false;
    }

    $.lightBox({
        width: 980,
        closeOther: false,
        boxID: 'addMsgItem',
        title: '添加图文消息',
        html: $('.addMsgItem').html(),
        buttons:[{
            value: '重  置',
            className: 'cancel-button',
            callbackFun: function(){
                $.msgDemo.clearAll($(this)[0].lightBox.dom);
            }
        },{
            value: '确  认',
            className: 'bright-button',
            callbackFun: function() {
                var thisLightBox = $(this)[0].lightBox;
                var checkeds = checkedMsg.picMessages || [];
                //图文添加后弹窗交互
                if ( checkeds.length ) {
                    var msgItemDOM = $(createMsgH(checkeds,'msg'));
                    $('.data-dia .js-add-content').before(msgItemDOM);
                    $(msgItemDOM).find('.js-editmsg-item').on('click',function(){
                        editMsgItem(this,checkedMsg);
                    });
                }
                //global变更
                
                $.lightBox.closeBox(thisLightBox);
            }
        }]
    });
    //绑定图文选择事件
    var checkedMsg = $.msgDemo($('#addMsgItemDia'),'111',{index:$('#addRuleDia .js-showmsg-tr').length,picMessages:[]});
}
function editMsgItem(obj,picMessages){
    $.lightBox({
        width: 980,
        closeOther: false,
        boxID: 'addMsgItem',
        title: '编辑图文消息',
        html: $('.addMsgItem').html(),
        buttons:[{
            value: '重  置',
            className: 'cancel-button',
            callbackFun: function(){
                $.msgDemo.clearAll($(this)[0].lightBox.dom);
            }
        },{
            value: '确  认',
            className: 'bright-button',
            callbackFun: function() {
                var thisLightBox = $(this)[0].lightBox;
                var checkeds = checkedMsg.picMessages || [];
                var pDia = $.lightBox.getCurDia($(obj));
                if ( checkeds && checkeds.length ){
                     var tr = $(pDia).find('.js-showmsg-tr').eq(checkedMsg.index);
                     $(tr).find('.msg-span img').attr('src',checkeds[0].smallPicUrl);
                     $(tr).find('.msg-span-intext').text(checkeds[0].msg);
                     $(tr).find('.js-editmsg-item').unbind('click').on('click',function(){
                        editMsgItem(this,checkedMsg);
                     });
                } else {
                    $(pDia).find('.js-showmsg-tr').eq(checkedMsg.index).remove();
                }
                // global更新
                $.lightBox.closeBox(thisLightBox);
            }
        }]

    });
    //绑定图文选择事件
    var checkedMsg = $.msgDemo($('#addMsgItemDia'),'111',picMessages);
}
/**
 * [validMsgItemNum 验证当前回复是否多余5条]
 * @return {boolean} [false：大于等于5]
 */
function validMsgItemNum(){
    var MAX_NUM = 5;
    //李敏TODO
    var now_msg_num = $('#addRuleDia .js-showmsg-tr').length+ $('#addRuleDia .js-showtextmsg-tr').length;// 图文+文字 最多不超过5条
    if ( MAX_NUM <= now_msg_num ) {
        $.lightBox({
            width: 320,
            boxID: 'warnInfo',
            closeOther: false,
            html: '<p style="text-align:center;font-size:16px;">最多上传5条</p>',
            buttons:[]
        });
        return false;
    } else {
        return true;
    }
}
function createMsgH(msgInfo,msgType){
    //TODO  接口获取图文消息数据
    //msgType 消息类型约定图文消息为msg，文字消息为textmsg
    // var msgInfo = {id:1,imgSrc:'http://www.szmll.com/sts/images/bacimg.png',desc:'2050国庆大欢乐'};

    var html = '';
    if ( msgType == 'msg' ) {
        if ( msgInfo[0] ) {
            msgInfo = msgInfo[0];
            html = '<tr class="js-showmsg-tr"><td></td><td>'
                + '<span class="msg-contain js-textmsg-contain">'
                    + '<span class="msg-span">'
                        + '<img src="' + msgInfo.imgSrc + '" width="100" height="100" />'
                        + '<span class="msg-span-intext">' + msgInfo.desc + '</span>'
                    + '</span>'
                    + '<dl><dt>图文消息</dt>'
                        + '<dd><a href="javascript:;" class="green-link js-editmsg-item">编辑</a></dd>'
                        + '<dd><a href="javascript:;" class="gray-link"  onclick="delMsgItem();">删除</a></dd>'
                    + '</dl>'
                + '</span></td></tr>';
        }
    } else {
        html = '<tr class="js-showtextmsg-tr"><td></td><td>'
            + '<span class="msg-contain js-textmsg-contain">'
                + '<span class="msg-span js-textmsg">' + msgInfo.desc + '</span>'
                + '<dl>'
                    + '<dt>文字消息</dt>'
                    + '<dd><a href="javascript:;" class="green-link" onclick="editTextMsg(this,\'' + msgInfo.desc + '\');">编辑</a></dd>'
                    + '<dd><a href="javascript:;" class="gray-link" onclick="delMsgItem();">删除</a></dd>'
                + '</dl>'
            + '</span></td></tr>';
    }
    return html;
}
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
 * [delMessRpTextFeed 消息自动回复确认]
 */
function delMessRpTextFeed(){
    //TODO  根据商户ID删除
    var message = '您确认删除回复？';
    var editorArea=$('#js-page2-0-2').find('.js-editorArea').text();
    if(editorArea!="") {
    if (confirm(message)) {
        $.ajax({
            url:"sys/reply/ntpl/deleteMessage",
            async:false,
            dataType:"json",
            data:{"mchId":'111'},
            type:"POST",
            success:function(data){
                if(data.code==0){
                    alert('删除回复成功');
                    goPage(window._pageConf['2-0-2'],[{selector:'#js-page2-0-2 .js-editorArea',value:"",domType: 'text'},{selector:'#js-page2-0-2 .js-left-word',value:"600",domType: 'text'}]);

                }else{
                    alert('删除回复失败');
                }
            }
        });

    }
    } else{
        alert('无记录删除');
    }
}
/**
 * [confirmMessRpTextFeed 消息自动回复确认]
 */
function confirmMessRpTextFeed(){
    var pageId = $(this).data('page');
    if ( pageId ) {
        var editorArea=$('#js-page2-0-2').find('.js-editorArea').text();
        var text={};
        text.msg=editorArea;
        var picMessages=null;
        //TODO
        //提交回复内容
        var jsonStr={};
        jsonStr.replyType='2';
        jsonStr.morp='1';
        //商户Id暂时没有
        jsonStr.mchId='111';
        jsonStr.message=text;
        jsonStr.picMessages=picMessages;
        console.log(JSON.stringify(jsonStr));
        var message = '您确认保存文字消息？';
        if (confirm(message)) {
            $.ajax({
                url:"sys/reply/ntpl/insertMessage",
                async:false,
                dataType:"json",
                data:{"jsonStr":JSON.stringify(jsonStr)},
                type:"POST",
                success:function(data){
                    if(data.code==0){
                        alert('保存成功');
                    }else{
                        alert('保存失败')
                    }
                }
            });
        }
        /*//提交成功后提示
         $.lightBox({
         width: 290,
         title: '提示',
         html: '<p style="text-align:center;">'+mes+'</p>'
         });*/
    }
}

/**
 * [delMessRpTextFeed 关注自动回复-无参-文字消息删除回复]
 */
function delNoParamTextFeed(){
    //TODO  根据商户ID删除
    var message = '您确认删除回复？';
    var editorArea=$('#js-page1-1-2').find('.js-editorArea').text();
    if(editorArea!="") {
        if (confirm(message)) {
            $.ajax({
                url: "sys/reply/ntpl/deleteNoParamAtt",
                async: false,
                dataType: "json",
                data: {"mchId": '111'},
                type: "POST",
                success: function (data) {
                    //console.log(data);
                    if (data.code == 0) {
                        alert('删除回复成功');
                        location.reload();
                        goPage(window._pageConf['1-1-2'], [{
                            selector: '#js-page1-1-2 .js-left-word',
                            value: "",
                            domType: 'text'
                        }])
                    } else {
                        alert('删除回复失败')
                    }
                }
            });

        }
    }else{
        alert('无记录删除');
    }
}

/**
 * [delNoParamImgTextFeed 关注自动回复-无参-图文消息删除回复]
 */
function delNoParamImgTextFeed(){
    //TODO  根据商户ID删除
    var message = '您确认删除回复？';
    var msgA = $.msgDemo.getDemoChecked('#js-page1-1-1'),
        msgLen = msgA.length;
    if(msgLen!=0) {
        if (confirm(message)) {
            $.ajax({
                url: "sys/reply/ntpl/deleteNoParamAtt",
                async: false,
                dataType: "json",
                data: {"mchId": '111'},
                type: "POST",
                success: function (data) {
                    if (data.code == 0) {
                        alert('删除回复成功');
                        location.reload();
                        goPage(window._pageConf['1-1-1']);
                        //goPage(window._pageConf['1-1-2'],[{selector:'#js-page1-1-1 .js-left-word',value:"",domType: 'text'}])
                    } else {
                        alert('删除回复失败')
                    }
                }
            });

        }
    }else{
        alert('无记录删除');
    }
}

/**
 * [confirmNoParamImgTextFeed 关注自动回复 无参 图文确认]
 */
function confirmNoParamImgTextFeed(){
    var pageId = $(this).data('page');
    if ( pageId ) {
        var editorArea=$('#js-page1-1-2').find('.js-editorArea').text();
        //TODO
        //图文消息赋值  提交回复内容
        var jsonStr={};
        var picMessage = $('#js-page1-1-1 .demo_list > div');
        var menuPicM =[];
        for(var i=0,ii=picMessage.length;i<ii;i++){
            var picObj = {};
            var oPicMessage = $(picMessage[i]);
            picObj.largePicUrl = $(picMessage[i]).find('p').parent().data('largeurl');
            picObj.smallPicUrl = oPicMessage.data('smallurl');
            //alert($(picMessage[i]).find('p').parent().data('smallurl'));
            picObj.msg = oPicMessage.data('msg');
            picObj.datalist=oPicMessage.data('list');
            picObj.url = oPicMessage.data('srcurl');
            picObj.title = $(picMessage[i]).find('p').html();
            menuPicM.push(picObj);
        }
        if(menuPicM.length!=0) {
            jsonStr.replyType = '1';
            jsonStr.morp = '0';
            //商户Id暂时没有
            jsonStr.mchId = '111';
            jsonStr.message = null;
            jsonStr.picMessage = menuPicM;
            /*
             console.log(JSON.stringify(jsonStr));
             console.log(jsonStr.picMessage);*/
            var message = '您确认保存文字消息？';
            if (confirm(message)) {
                $.ajax({
                    url: "sys/reply/ntpl/insertNoParamAtt",
                    async: false,
                    dataType: "json",
                    data: {"jsonStr": JSON.stringify(jsonStr)},
                    type: "POST",
                    success: function (data) {
                        if (data.code == 0) {
                            location.reload();
                            alert('保存成功');
                        } else {
                            alert('保存失败')
                        }
                    }
                });
            }
        }else{
            alert('请选择图文消息后点击保存');
        }
    }
}


/**
 * [delMessageImgTextFeed 消息自动回复-图文消息删除回复]
 */
function delMessageImgTextFeed(){
    //TODO  根据商户ID删除
    var message = '您确认删除回复？';
    var msgA = $.msgDemo.getDemoChecked('#js-page2-0-1'),
        msgLen = msgA.length;
    if(msgLen!=0) {
        if (confirm(message)) {
            $.ajax({
                url: "sys/reply/ntpl/deleteMessage",
                async: false,
                dataType: "json",
                data: {"mchId": '111'},
                type: "POST",
                success: function (data) {
                    if (data.code == 0) {
                        alert('删除回复成功');
                        location.reload();
                        goPage(window._pageConf['2-0-0']);
                        //goPage(window._pageConf['1-1-2'],[{selector:'#js-page1-1-1 .js-left-word',value:"",domType: 'text'}])
                    } else {
                        alert('删除回复失败')
                    }
                }
            });

        }
    }else{
        alert('无记录删除');
    }
}

/**
 * [confirmMessageImgTextFeed 消息自动回复 图文确认]
 */
function confirmMessageImgTextFeed(){
    var pageId = $(this).data('page');
    if ( pageId ) {
       // var editorArea=$('#js-page1-1-2').find('.js-editorArea').text();
        //TODO
        //图文消息赋值  提交回复内容
        var jsonStr={};
        var picMessage = $('#js-page2-0-1 .demo_list > div');
        var menuPicM =[];
        for(var i=0,ii=picMessage.length;i<ii;i++){
            var picObj = {};
            var oPicMessage = $(picMessage[i]);
            picObj.largePicUrl = $(picMessage[i]).find('p').parent().data('largeurl');
            picObj.smallPicUrl = oPicMessage.data('smallurl');
            picObj.msg = oPicMessage.data('msg');
            picObj.url = oPicMessage.data('srcurl');
            picObj.datalist=oPicMessage.data('list');
            picObj.title = $(picMessage[i]).find('p').html();
            menuPicM.push(picObj);
        }
        if(menuPicM.length!=0) {
            jsonStr.replyType = '2';
            //0图文 1文字
            jsonStr.morp = '0';
            //商户Id暂时没有
            jsonStr.mchId = '111';
            jsonStr.message = null;
            jsonStr.picMessages = menuPicM;
            var message = '您确认保存图文消息？';
            if (confirm(message)) {
                $.ajax({
                    url: "sys/reply/ntpl/insertMessage",
                    async: false,
                    dataType: "json",
                    data: {"jsonStr": JSON.stringify(jsonStr)},
                    type: "POST",
                    success: function (data) {
                        if (data.code == 0) {
                            alert('保存成功');
                        } else {
                            alert('保存失败')
                        }
                    }
                });
            }
        }else{
            alert('请选择图文消息后点击保存');
        }
    }
}
/**
 * [confirmMessRpTextFeed 消息自动回复 文字确认]
 */
function confirmNoParamTextFeed(){
    var pageId = $(this).data('page');
    if ( pageId ) {
        var editorArea=$('#js-page1-1-2').find('.js-editorArea').text();
        var text={};
        text.msg=editorArea;
        var picMessage=null;
        //TODO
        //提交回复内容
        var jsonStr={};
        jsonStr.replyType='2';
        jsonStr.morp='1';
        //商户Id暂时没有
        jsonStr.mchId='111';
        jsonStr.message=text;
        jsonStr.picMessage=picMessage;
        //console.log(JSON.stringify(jsonStr));
        var message = '您确认保存文字消息？';
        if (confirm(message)) {
            $.ajax({
                url:"sys/reply/ntpl/insertNoParamAtt",
                async:false,
                dataType:"json",
                data:{"jsonStr":JSON.stringify(jsonStr)},
                type:"POST",
                success:function(data){
                    if(data.code==0){
                        alert('保存成功');
                    }else{
                        alert('保存失败')
                    }
                }
            });
        }
        /*//提交成功后提示
         $.lightBox({
         width: 290,
         title: '提示',
         html: '<p style="text-align:center;">'+mes+'</p>'
         });*/
    }
}