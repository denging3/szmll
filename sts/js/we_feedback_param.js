/* ======================================
* copyRight: meilele
* fileName: we_feedback_param.js
* createTime: 2016/01/07
* author: dengyun@meilele
* version: 1.0
* modify: {}
* description: 系统-微回复页面有参关注
======================================== */
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
 * @param  {[string]} id 带参规则id
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
                $.msgDemo($('#addQrRuleDia'),'111',{picMessages:data.picMessage || []});
            }
        },
        error:function(){
            var data = {qrCode:'1,5',qrName:'2003宇宙大爆炸,2099去可可西里看看海',key:'223,554'}
            window.__chosedQR = createArrayQrs(data);
            console.log(window.__chosedQR);
            $.choQREvent(window.__chosedQR);
            $.msgDemo($('#addQrRuleDia'),'111',{picMessages:[]});
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
 * [createArrayQrs 返回的data数据构造window.__chosedQR]
 * @param  {object} data [包含qrCode,qrName,key项的对象]
 * @return {array}      [返回window.__chosedQR]
 */
function createArrayQrs(data){
    var resArray = [];
    var qrCodeIds = ( !!data.qrCode ) ? data.qrCode.split(',') : [],
        qrCodeNames = ( !!data.qrName ) ? data.qrName.split(',') : [],
        qrSenceIds = ( !!data.key ) ? data.key.split(',') : [];
    var qrCodeIdsLen = qrCodeIds.length,
        qrCodeNamesLen = qrCodeNames.length,
        qrSenceIdsLen = qrSenceIds.length;
    var qrCodeId,qrCodeName,qrSenceId;
    for ( var kk in qrCodeIds ) {
        qrCodeId = qrCodeIds[kk];
        qrCodeName = ( kk < qrCodeNamesLen ) ? qrCodeNames[kk] : '';
        qrSenceId = ( kk < qrSenceIdsLen ) ? qrSenceIds[kk] : '';
        resArray.push({"id":qrCodeId,"qrCodeName":qrCodeName,"qrSenceId":qrSenceId});
    }
    return resArray;
}

!(function($){
/**
 * [choQREvent 有参关注选择二维码事件绑定，及选择二维码弹窗初始化]
 * @param  {Array} qrArrayVals [对象数组，存储当前编辑规则对应的已选择二维码，格式如下]
 * [{id: 25,desc: '2051周年清',belongRule:'双十一活动'},{id: 1,desc: '2056周年清',belongRule:'双十一活动'},{id: 2,desc: '2058周年清',belongRule:'双SHIER活动'}];
 * @return {array}             []
 */
    $.choQREvent = function(qrArrayVals){
        return new $.choQREvent.prototype.init(qrArrayVals);
    }
    $.choQREvent.prototype = {
        constructor: $.choQREvent,
        init: function(qrArrayVals){
            var that = this;
            this.addBtnSelector = '.data-dia .js-cho-qr';
            this.qrArrayVals = qrArrayVals || [];
            this.resArrayVals = [];
            objDeepCopy(this.resArrayVals,this.qrArrayVals);

            // 初始化编辑弹窗中已选二维码
            this.changeContent(this.qrArrayVals);
            //点击选择二维码事件
            $(this.addBtnSelector).on('click',function(){
                that.choQRbox = $.lightBox({
                    width: 670,
                    closeOther: false,
                    curDom: $(that),
                    boxID: 'chooseQr',
                    title: '选择二维码',
                    html: $('.chooseQr').html(),
                    buttons: [{
                        value: '确  认',
                        className: 'bright-button js-choed-comfirm-btn'
                    }]
                });
                that.choQRboxId = $(that.choQRbox).attr('id');
                // 添加事件
                // 搜索二维码规则
                that.searchQR();
                $(that.choQRbox).find('.js-search-qr').click();
                // 展示已选择的二维码
                if ( that.resArrayVals.length > that.qrArrayVals.length ) {
                    that.resArrayVals.splice( that.qrArrayVals.length );
                }
                objDeepCopy(that.resArrayVals,that.qrArrayVals);
                that.showChoedQr(that.qrArrayVals);
                // 选择二维码点击确认
                that.choQRComfirm();
            });
            return this.qrArrayVals;
        },
        /**
         * [searchQREvent 搜索规则点击事件]
         */
        searchQR: function(){
            var that = this;
            $(this.choQRbox).find('.js-search-qr').on('click',function(){
                var keywords = $(this).siblings().val();
                //var key = keywords.replace(/(^\s*)|(\s*$)/g, "");
                //if( key.length ){
                    // todo search
                //}
                $.ajax({
                    url:"sys/reply/getQrCodes",
                    async:false,
                    data:{"searchKey":keywords},
                    dataType:"json",
                    type:"POST",
                    success:function(data){
                        //格式为[{id:**,qrCodeName:**,qrSenceId:**}]
                        if ( data && data.length ) {
                            $(that.choQRbox).find('.js-qrlist tbody').html(that.createChoHtml(data));
                            //check事件
                            that.checkChoClick();
                        } else {
                            $(that.choQRbox).find('.js-qrlist tbody').html('');
                        }
                    },
                    error: function(data){
                        data = [{id: 1,qrCodeName: '45周年清',qrSenceId:'35'},{id: 22,qrCodeName: '20446周年清',qrSenceId:'77'}];
                        if ( data && data.length ) {
                            $(that.choQRbox).find('.js-qrlist tbody').html(that.createChoHtml(data));
                            //check事件
                            that.checkChoClick();
                        } else {
                            $(that.choQRbox).find('.js-qrlist tbody').html('');
                        }
                    }
                });
            });
        },
        createChoHtml: function(data){
            var ids = getSreenIds(this.resArrayVals,'id');
            var idString = ( ids && ids.length > 0 ) ? (',' + ids.join(',') + ',') : '';
            var html = '';
            for(var k in data) {
                html += '<tr><td><span class="';
                if( idString.indexOf(',' + data[k].id + ',') != -1 ) {
                    html += 'checked ';
                }
                html += 'js-qr-check" data-role="' + data[k].id + '|' + data[k].qrCodeName + '|' + data[k].qrSenceId+'"></span></td>'
                    + '<td>' + data[k].id + '</td>'
                    + '<td>' + data[k].qrCodeName + '</td>';
            }
            return html;
        },
        checkChoClick: function(){
            var that = this;
            $(this.choQRbox).find('.js-qr-check').on('click',function(){
                var className = $(this).attr('class');
                var data = $(this).data('role'), datainfo = data.split('|');
                if ( className.indexOf('checked') == -1 ) {
                    $(this).addClass('checked');
                    that.chooseCheckQR(datainfo);
                } else {
                    var delId = datainfo[0];
                    var resArray = that.resArrayVals;
                    for ( var ind in resArray ) {
                        if ( delId == resArray[ind].id ) {
                            // $(that.choQRbox).find('.js-qrlist-choed li').eq(ind).remove();
                            that.resArrayVals.splice(ind,1);
                            that.showChoedQr(that.resArrayVals);
                            // $(that.choQRbox).find('.js-choosed-num').text('(' + that.resArrayVals.length + ')条');
                            break;
                        }
                    }
                    $(this).removeClass('checked');
                }
            });
        },
        /**
         * [chooseQR 左边checkbox选择规则处理]
         * @param  {array} datainfo [选中数据的信息]
         */
        chooseCheckQR: function(datainfo){
            var that = this;
            var html = '<li><span>' + (this.resArrayVals.length + 1) + '.' + datainfo[1] + '</span>'
                + '<span class="js-del-choed del-span" data-role="' + datainfo[0] + '"></span></li>';
            var appendLi = $(html);
            $(this.choQRbox).find('.js-qrlist-choed').append(appendLi);
            this.resArrayVals.push({id: datainfo[0],qrCodeName: datainfo[1],qrSenceId:datainfo[2]});
            $(this.choQRbox).find('.js-choosed-num').text('(' + this.resArrayVals.length + ')条');

            //悬挂样式
            $(appendLi).hover(function(){
                $(this).addClass('hover-li');
            },function(){
                $(this).removeClass('hover-li');
            });
            //点击删除已选择qr
            $(appendLi).find('.js-del-choed').on('click',function(){
                that.delChoed(this);
            });
        },
        showChoedQr: function(qrArray){
            //初始已选择qr按钮显示内容
            var html='',that = this;
            for ( var k in qrArray ) {
                html += '<li><span>' + ( 1 + Number(k) ) + '.' + qrArray[k].qrCodeName + '</span>' 
                    + '<span class="js-del-choed del-span" data-role="' + qrArray[k].id + '"></span></li>';
            }
            $(this.choQRbox).find('.js-qrlist-choed').html(html);
            $(this.choQRbox).find('.js-choosed-num').text('(' + qrArray.length + ')条');
            
            //已选择规则悬挂效果
            $(this.choQRbox).find('.js-qrlist-choed li').hover(function(){
                $(this).addClass('hover-li');
            },function(){
                $(this).removeClass('hover-li');
            });

            //点击删除已选择qr
            $(this.choQRbox).find('.js-del-choed').on('click',function(){
                that.delChoed(this);
            });
        },
        /**
         * [delChoed 右边规则删除处理]
         * @param  {dom} obj [点击删除的dom对象，包括data-role属性记录待删除规则ID]
         */
        delChoed: function(obj){
            var that = this;
            var dataId = $(obj).data('role') + '|';
            var pli = $(obj).parent();
            var index = $(pli).index('#' + this.choQRboxId + ' .js-qrlist-choed li');
            // $(pli).remove();
            this.resArrayVals.splice(index,1);
            this.showChoedQr(this.resArrayVals);
            //搜索结果中去除checked样式
            if ( dataId.length > 0 ) {
                this.delCheckStyle(dataId);
            }
        },
        /**
         * [delCheckStyle 去掉多选框选中样式]
         * @param  {string} delId   [删除二维码id+'|']
         */
        delCheckStyle: function(delId){
            $(this.choQRbox).find('.js-qr-check').each(function() {
                var datainfo = $(this).data('role');
                if ( datainfo && datainfo.indexOf(delId) == 0 ) {
                    $(this).removeClass('checked');
                }
            })
        },
        /**
         * [changeContent 设置选择按钮展示值]
         * @param  {array} qrArray [已选择的二维码数字]
         * @param  {array} ids  [已选定二维码id数组]
          * @param  {array} keys  [已选定二维码key数组]
         */
        changeContent:function(qrArray){
            var idString = '',keyString='',chooseQR = '<i class="icon20-gray-add"></i>选择二维码';
            var ids = getSreenIds(qrArray,'id'),keys = getSreenIds(qrArray,'qrSenceId');
            if ( ids && ids.length > 0 ) {
                idString = ids.join(',');
                keyString = keys.join(',');
                chooseQR = '<input type="hidden" name="qrCode" value="' + idString +'" />' + idString+'<input type="hidden" name="qrKeys" value="' + keyString +'" />';
            }
            $(this.addBtnSelector).html(chooseQR);
        },
        choQRComfirm: function(){
            var that = this;
            $(this.choQRbox).find('.js-choed-comfirm-btn').on('click',function(){
                if ( that.resArrayVals.length < that.qrArrayVals.length ) {
                    that.qrArrayVals.splice(that.resArrayVals.length);
                }
                objDeepCopy(that.qrArrayVals,that.resArrayVals);
                //TODO  全局变量交互
                //规则编辑弹窗交互
                that.changeContent(that.resArrayVals);

                //关闭弹窗
                $(that.choQRbox).find('.dia-close').click();
            });
        }
    }
    $.choQREvent.prototype.init.prototype = $.choQREvent.prototype;
    
})(jQuery);
