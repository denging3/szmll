/* ======================================
* copyRight: meilele
* fileName: we_feedback.js
* createTime: 2015/12/15
* author: dengyun@meilele
* version: 1.0
* modify: {}
* description: 系统-微回复页面涉及js
======================================== */
!function(){
    var pageQuery = window.location.search.substr(1).split('&');
    var pageParam = ( /page=/.test(pageQuery[0]) ) ? ( pageQuery[0].replace('page=','') ) : '1-1-1';
    window._pageConf ={
        '1-1-1': {
            pageIndex: '1-1-1',
            display: [{curIndex:0,dataUrl:['1-1-1','2-0-1','3-0-0']},
                {curIndex:0,dataUrl:['1-1-1','1-2-0']},
                {curIndex:0,dataUrl:['1-1-1','1-1-2']}],
            pageLoad: 'page/msg_imgtext_kinds.html',
            callFunc: function() {
                $("#js-page1-1-1").addSettingModual();
                $("#js-page1-1-1").bindNavEvent();
                $("#js-page1-1-1").addFooterOper(null);
            }
        },
        '1-1-2': {
            pageIndex: '1-1-2',
            display: [{curIndex:0,dataUrl:['1-1-1','2-0-1','3-0-0']},
                {curIndex:0,dataUrl:['1-1-1','1-2-0']},
                {curIndex:1,dataUrl:['1-1-1','1-1-2']}],
            pageLoad: 'page/msg_text.html',
            callFunc: function(){
                $("#js-page1-1-2").addFooterOper(null);
                $('#js-page1-1-2').bindwordValid();
            }
        },
        '1-2-0': {
            pageIndex: '1-2-0',
            display: [{curIndex:0,dataUrl:['1-1-1','2-0-1','3-0-0']},
                {curIndex:1,dataUrl:['1-1-1','1-2-0']},
                {}],
            pageLoad: 'page/param_feedback.html',
            callFunc: function(){
                $('#js-page1-2-0').find('.js-add-rule').on('click',addQrRule);
            }
        },
        '2-0-1': {
            pageIndex: '2-0-1',
            display: [{curIndex:1,dataUrl:['1-1-1','2-0-1','3-0-0']},
                {},
                {curIndex:0,dataUrl:['2-0-1','2-0-2']}],
            pageLoad: 'page/msg_imgtext_kinds.html',
            callFunc: function() {
                $("#js-page2-0-1").addSettingModual();
                $("#js-page2-0-1").bindNavEvent();
                $("#js-page2-0-1").addFooterOper(null);
            }
        },
        '2-0-2': {
            pageIndex: '2-0-2',
            display: [{curIndex:1,dataUrl:['1-1-1','2-0-1','3-0-0']},
                {},
                {curIndex:1,dataUrl:['2-0-1','2-0-2']}],
            pageLoad: 'page/msg_text.html',
            callFunc: function(){
                $("#js-page2-0-2").addFooterOper(null);
                $('#js-page2-0-2').bindwordValid();
            }
        },
        '3-0-0': {
            pageIndex: '3-0-0',
            display: [{curIndex:2,dataUrl:['1-1-1','2-0-1','3-0-0']},{},{}],
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
    $('.addMsgItem').load('page/msg_imgtext.html');
}();
/**
 * [goPage 微回复导航页面跳转]
 * @param  {object} curPage : {pageIndex:{string}当前导航位置；display：对象数组表示当前页面各级导航信息；pageLoad: 加载的html路径；callFunc: 加载完成后调用方法；}
 */
function goPage(curPage){
    var display = curPage.display;
    for(var k in display){
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
        if ( curPage.callFunc ) {
            $( '#js-page' + curPage.pageIndex ).load(curPage.pageLoad,curPage.callFunc);
        } else {
            $( '#js-page' + curPage.pageIndex ).load(curPage.pageLoad);
        }
    }
    $('.sec-main .page-content').hide();
    $('#js-page'+curPage.pageIndex).show();
}
//TODO默认存储当前已选择的二维码信息
window.__chosedQR = {id:[2],desc:['2015美丽金秋...']};

/**
 * [addQrRule 添加二维码规则弹窗展示]
 * 步骤：
 * 1、清除编辑二维码过的数据
 * 2、展示添加规则框
 * 3、点击二维码选择按钮事件
 * 4、图文模块加载切换事件
 */
function addQrRule(){
    //初始化选定规则
    window.__chosedQR = { id: [],desc: [] };
    initChoedQR();

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
                //TODO
                //添加规则方法
            }
        }]
    });

    //选择二维码事件
    choQREvent();
    
    //图文模块添加事件
    $('#addQrRuleDia').addSettingModual();
    $('#addQrRuleDia').bindNavEvent();

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
function editQrRule(ruleInfo){
    var info = ruleInfo.split('|');
    if ( info.length < 3 ) {
        $.lightBox({
            html: '信息不全，不能编辑呢！',
            buttons: []
        })
        return;//信息不全不能编辑
    }
    var qrIds = info[2];
    //TODO
    //根据已配置id获取qr信息
    //以下模拟请求复制给window.__chosedQR
    window.__chosedQR = {
        id: [2,5],
        desc: ['2003宇宙大爆炸','2099去可可西里看看海']
    };
     //初始化选定规则
    initChoedQR();

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
                console.log('do some');
            }
        }]
    });
    //编辑框内容跟新
    $(editBox).find('.js-rulename').val(info[1]);

    //选择二维码事件
    choQREvent();
    //图文模块添加事件
    $('#addQrRuleDia').addSettingModual();
    $('#addQrRuleDia').bindNavEvent();

    $('.data-dia .radio-wefeed').on('click',function(){
        $('.data-dia .radio-wefeed').removeClass('radio-current');
        var index = $(this).attr('data-role');
        $('.data-dia .rule-main').children().hide().eq(index).show();
        $(this).addClass('radio-current');
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
            }
        }]
    });
}
function choQREvent(){
    $('.data-dia .js-cho-qr').on('click',function(){
        var that = this;
        var choQRbox = $.lightBox({
            width: 670,
            closeOther: false,
            curDom: $(that),
            boxID: 'chooseQr',
            title: '选择二维码',
            html: $('.chooseQRcode').html(),
            buttons: [{
                value: '确  认',
                className: 'bright-button',
                callbackFun: function(){
                    //更新隐藏DOM中选定二维码
                    initChoedQR();

                    $.lightBox.closeBox($(this)[0].lightBox);
                }
            }]
        });
        //添加事件
        
        //搜索规则
        $(choQRbox).find('.js-search-qr').on('click',function(){
            var input = $(this).siblings().val();
            var key = input.replace(/(^\s*)|(\s*$)/g, "");
            if( key.length ){
                searchQR(key);
            }
        });

        //已选择规则悬挂效果
        $(choQRbox).find('.js-qrlist-choed li').hover(function(){
            $(this).addClass('hover-li');
        },function(){
            $(this).removeClass('hover-li');
        });

        //点击删除已选择qr
        $(choQRbox).find('.js-del-choed').on('click',function(){
            delChoed(this);
        });
    });
}
/**
 * [searchQR 规则查询处理]
 * @param  {string} keywords [输入查询关键字]
 */
function searchQR(keywords){
    //TODO 
    //AJAX请求数据
    //根据输入查询数据
    //以下json为模拟数据
    var json = [{id: 25,desc: '2051周年清'},{id: 1,desc: '2051周年清'},{id: 2,desc: '2051周年清'}];

    var html = '';
    var checkids = ',' + window.__chosedQR.id.join(',') + ',';
    for(var k in json) {
        html += '<tr><td><span class="';
        if( checkids.indexOf(',' + json[k].id + ',') != -1 ) {
            html += 'checked ';
        }
        html += 'js-qr-check" data-role="' + json[k].id + '=' + json[k].desc + '"></span></td>'
            + '<td>' + json[k].id + '</td>'
            + '<td>' + json[k].desc + '</td>';
    }
    $('.data-dia .js-qrlist tbody').html(html);

    //check事件
    $('.data-dia .js-qr-check').on('click',function(){
        var className = $(this).attr('class');
        if( className.indexOf('checked') == -1 ){
            $(this).addClass('checked');
            chooseQR($(this).data('role'));
        }
    });
}
/**
 * [initChoedQR 初始跟新已选择二维码规则]
 * 初始dom为chooseQRcode
 */
function initChoedQR(){
    var pDomClass = ".chooseQRcode";
    if ( !window.__chosedQR.id.length ) {
        $(pDomClass).find('.js-qrlist-choed').html('');
    } else {
        var html = '',
            ids = window.__chosedQR.id,
            descs = window.__chosedQR.desc;
        for(var i in ids){
            html += '<li><span>' + ( 1 + Number(i) ) + '.' + descs[i] + '</span>' + '<span class="js-del-choed del-span" data-role="' + ids[i] + '"></span></li>';
        }
        $(pDomClass).find('.js-qrlist-choed').html(html);
    }
    //初始已选择qr按钮显示内容
    changeContent($('.js-cho-qr'),window.__chosedQR.id);
}
/**
 * [chooseQR 左边checkbox选择规则处理]
 * @param  {string} qrString [选择规则信息格式=> id=desc 的字符串]
 */
function chooseQR(qrString){
    var qr = qrString.split('=');
    var index = $('.data-dia .js-qrlist-choed').find('li').length;
    var html = '<li><span>' + ( index + 1 ) + '.' + qr[1] + '</span>'
        + '<span class="js-del-choed del-span" data-role="' + qr[0] + '"></span></li>';
    $('.data-dia .js-qrlist-choed').append(html);

    //添加规则
    //TODO
    //后台数据交互
    var thisDom = $('.data-dia .js-qrlist-choed li').eq(index);
    $(thisDom).hover(function(){
        $(this).addClass('hover-li');
    },function(){
        $(this).removeClass('hover-li');
    });
    $(thisDom).find('.js-del-choed').on('click',function(){
        delChoed(this);
    });
    //全局数据变更
    window.__chosedQR.id.push(Number(qr[0]));
    window.__chosedQR.desc.push(qr[1]);
}
/**
 * [delChoed 右边规则删除处理]
 * @param  {dom} obj [点击删除的dom对象，包括data-role属性记录待删除规则ID]
 */
function delChoed(obj){
    var delID = $(obj).data('role');
    //TODO
    //数据库交互删除选定qr
    $(obj).parent().remove();

    for(var m in window.__chosedQR.id){
        if ( window.__chosedQR.id[m] == delID) {
            window.__chosedQR.id.splice(m,1);
            window.__chosedQR.desc.splice(m,1);
        }
    }
}
/**
 * [changeContent 设置选择按钮展示值]
 * @param  {array} objs [显示选择二维码的dom]
 * @param  {array} ids  [已选定二维码id数组]
 */
function changeContent(objs,ids){
    var idString = '',chooseQR = '<i class="icon20-gray-add"></i>选择二维码';
    if ( ids && ids.length > 0 ) {
        idString = ids.join(',');
        chooseQR = '<input type="hidden" name="qrCode" value="' + idString +'" />' + idString;
    }
    $(objs).each(function(){
        $(this).html(chooseQR);
    })

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
}
function editRule(ruleID){
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
        //TODO
        //获取到规则数据
        //{ruleID:***,ruleName:***,textMsg:[{id:,desc:},...],imgMsg:[{id:,desc:,src:,}...]}
        //以下模拟数据
        
        var ruleInfo = {
                ruleID: 2356,
                ruleName: 'this_is_a_rule',
                ruleKeys: '互联网家居,美乐乐,运营',
                textMsg: [{id:235601,desc:'这是一条规则说明',msgType:'textmsg'},{id:235607,desc:'这是另一条规则说明',msgType:'textmsg'}],
                imgMsg: [{id:235603,desc:'这是第三条规则说明',imgSrc:'http://www.szmll.com/sts/images/bacimg.png',msgType:'msg'}]
            };

        //使用隐藏域 js-imgmsg-ids保存当前选择的图文消息id
        var imgMsgIds = [];

        //弹框数据初始化
        $('.data-dia .js-rulename').val(ruleInfo.ruleName);
        $('.data-dia .js-keywords').text(ruleInfo.ruleKeys);
        for ( var ii in ruleInfo.textMsg ) {
             $('.data-dia .js-add-content').before(createMsgH(ruleInfo.textMsg[ii]));
        }
        for ( ii in ruleInfo.imgMsg ) {
             $('.data-dia .js-add-content').before(createMsgH(ruleInfo.imgMsg[ii]));
             imgMsgIds.push(ruleInfo.imgMsg[ii].id);
        }
        
        $('.data-dia .js-imgmsg-ids').val(imgMsgIds.join(','));
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
                if ( ruleId && msgId ) {
                    //交互删除数据刷新页面
                } else {
                    //添加规则时删除配置消息
                }
            }
        }]
    });
}
/**
 * [addTextMsg 添加文字消息]
 * @param {[dom节点]} obj [点击触发添加文字消息弹框的dom节点]
 */
function addTextMsg(obj){
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
                    if ( $(pDiv).find('.js-showtextmsg-tr').length ) {
                        $(pDiv).find('.js-showtextmsg-tr').after(addMsgH);
                    } else {
                        $(pDiv).find('.js-add-content').before(addMsgH);
                    }
                    
                    $.lightBox.closeBox(thisLightBox);
                }
            }
        }]
    });
    //添加字数验证
    $('#addTextMsgDia').bindwordValid();
}
function editTextMsg(id,desc,obj){
    desc = '我是一直小小鸟';
    //获取接口数据
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
                    $(obj).parent().parent().parent().find('.js-textmsg').text(text);
                }
                $.lightBox.closeBox(thisLightBox);
            }
        }]
    });
    //TODO
    //是否关闭时提交
    $('.data-dia .js-editorArea').text(desc);
    //添加字数验证
    $('#editTextMsgDia').bindwordValid();
}
function addMsgItem(obj){
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
                //TODO
            }
        },{
            value: '确  认',
            className: 'bright-button',
            callbackFun: function() {
                var thisLightBox = $(this)[0].lightBox;
                var checkeds = $.msgDemo.getDemoChecked(thisLightBox.dom);
                var checkTrH = '';
                var imgMsgIds = [];
                for ( var kk in checkeds ) {
                    checkTrH += createMsgH(checkeds[kk]);
                    imgMsgIds.push(checkeds[kk].msgID);
                }
                var pDia = $.lightBox.getCurDia($(obj));
                $(pDia).find('.js-showmsg-tr').remove();
                $(pDia).find('.js-add-content').before(checkTrH);
                $(pDia).find('.js-imgmsg-ids').val(imgMsgIds.join(','));
                $.lightBox.closeBox(thisLightBox);
            }
        }]
    });
    //绑定图文选择事件
    $.msgDemo($('#addMsgItemDia'),$('.data-dia .js-imgmsg-ids').val());
}
function editMsgItem(obj){
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

            }
        },{
            value: '确  认',
            className: 'bright-button',
            callbackFun: function() {
                var thisLightBox = $(this)[0].lightBox;
                var checkeds = $.msgDemo.getDemoChecked(thisLightBox.dom);
                var checkTrH = '';
                var imgMsgIds = [];
                for ( var kk in checkeds ) {
                    checkTrH += createMsgH(checkeds[kk]);
                    imgMsgIds.push(checkeds[kk].msgID);
                }
                var pDia = $.lightBox.getCurDia($(obj));
                $(pDia).find('.js-showmsg-tr').remove();
                $(pDia).find('.js-add-content').before(checkTrH);
                $(pDia).find('.js-imgmsg-ids').val(imgMsgIds.join(','));
                $.lightBox.closeBox(thisLightBox);
            }
        }]

    });
    //绑定图文选择事件
    $.msgDemo($('#addMsgItemDia'),$('.data-dia .js-imgmsg-ids').val());
    //TODO 补充接口后完善
}

function createMsgH(msgInfo){
    //TODO  接口获取图文消息数据
    //msgType 消息类型约定图文消息为msg，文字消息为textmsg
    // var msgInfo = {id:1,imgSrc:'http://www.szmll.com/sts/images/bacimg.png',desc:'2050国庆大欢乐',msgType: 'textmsg'};

    var html = '';
    if ( msgInfo.msgType == 'msg' ) {
        html = '<tr class="js-showmsg-tr"><td></td><td>'
            + '<span class="msg-contain js-textmsg-contain">'
                + '<span class="msg-span">'
                    + '<img src="' + msgInfo.imgSrc + '" width="100" height="100" />'
                    + '<span class="msg-span-intext">' + msgInfo.desc + '</span>'
                + '</span>'
                + '<dl><dt>图文消息</dt>'
                    + '<dd><a href="javascript:;" class="green-link"  onclick="editMsgItem(this);">编辑</a></dd>'
                    + '<dd><a href="javascript:;" class="gray-link"  onclick="delMsgItem();">删除</a></dd>'
                + '</dl>'
            + '</span></td></tr>';
    } else {
        html = '<tr class="js-showtextmsg-tr"><td></td><td>'
            + '<span class="msg-contain js-textmsg-contain">'
                + '<span class="msg-span js-textmsg">' + msgInfo.desc + '</span>'
                + '<dl>'
                    + '<dt>文字消息</dt>'
                    + '<dd><a href="javascript:;" class="green-link" onclick="editTextMsg(' + msgInfo.id + ',\'' + msgInfo.desc + '\',this);">编辑</a></dd>'
                    + '<dd><a href="javascript:;" class="gray-link" onclick="delMsgItem();">删除</a></dd>'
                + '</dl>'
            + '</span></td></tr>';
    }
    return html;
}