/* ======================================
* copyRight: meilele
* fileName: we_feedback_mllconcern.js
* createTime: 2016/01/07
* author: dengyun@meilele
* version: 1.0
* modify: {}
* description: 系统-微回复页面美乐乐有参关注
======================================== */
/**
 * [addQrRuleMllConcern 美乐乐有参关注添加规则弹窗展示]
 */
function addQrRuleMllConcern(){
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
                //添加规则提交
                addQrCommitMllConcern(this,checkedMsg);
            }
        }]
    });
        // 绑定事件
    $('.dia-main .js-rulename').blur(function(){
        //ajax 调用后台查询规则名是否存在
        if ($.trim($(this).val()) != '') {
            $.ajax({
                url:"sys/reply/isExistParamAtt?ruleName=" + $.trim($(this).val()),
                async:false,
                dataType:"json",
                type:"POST",
                success:function(response){
                    if (response.code==0) {
                    } else {
                        alert( response.msg);
                        $('#addQrRuleDia .js-rulename').val('');
                    }
                }
            });
        }else{
            alert('规则名称不能为空！！');
            $('#addQrRuleDia .js-rulename').val('');
        }
    });
    //选择二维码事件
    $.screenQREvent(window.__chosedQR);
    
    //图文模块添加事件
    var checkedMsg = $.msgDemo($('#addQrRuleDia'),'111',{index:0,picMessages:[]});

    $('.data-dia .radio-wefeed').on('click',function(){
        $('.data-dia .radio-wefeed').removeClass('radio-current');
        var index = $(this).attr('data-role');
        $('.data-dia .rule-main').children().hide().eq(index).show();
        $(this).addClass('radio-current');
    });
    $('#addQrRuleDia .emotion-editor').bindwordValid(600);
}
/**
 * [editQrRuleMllConcern 美乐乐有参关注编辑规则弹窗]
 * @param  {number} id [规则ID]
 */
function editQrRuleMllConcern(id){
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
                var checkedMsg = {picMessages:$.msgDemo.getDemoChecked('#addQrRuleDia')};
                addQrCommitMllConcern(this,checkedMsg);
            }
        }]
    });
    //根据已配置id获取qr信息
    qrBoxAjaxDataMllConcern(id);
    // 绑定事件
    $('.dia-main .js-rulename').blur(function(){
        //ajax 调用后台查询规则名是否存在
        if ($.trim($(this).val()) != '') {
            $.ajax({
                url:"sys/reply/isExistParamAtt",
                async:false,
                dataType:"json",
                type:"POST",
                data:{"id":id,"ruleName":$(this).val()},
                success:function(response){
                    if (response.code==0) {
                    } else {
                        alert( response.msg);
                        $('#addQrRuleDia .js-rulename').val('');
                    }
                }
            });
        }else{
            alert('规则名称不能为空！！');
            $('#addQrRuleDia .js-rulename').val('');
        }
    });

    $('.data-dia .radio-wefeed').on('click',function(){
        $('.data-dia .radio-wefeed').removeClass('radio-current');
        var index = $(this).attr('data-role');
        $('.data-dia .rule-main').children().hide().eq(index).show();
        $(this).addClass('radio-current');
    });
    $('#addQrRuleDia .emotion-editor').bindwordValid(600);
}
/**
 * [qrBoxAjaxDataMllConcern 美乐乐有参关注，ajax请求数据，规则编辑弹窗数据信息]
 * @param  {number} id         [规则id]
 */
function qrBoxAjaxDataMllConcern(id){
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
                $.msgDemo($('#addQrRuleDia'),'111',{picMessages:data.picMessage || []});
            }
        }
    });
}
/**
 * [addQrCommitMllConcern 美乐乐有参关注规则提交]
 * @param {bom} comfirmBtn [弹窗确认按钮]
 * @param {object} checkedMsg [图文对象]
 */
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
 * [delMllConcernRule 删除美乐乐关注规则]
 * @param  {number} ruleId [规则ID]
 */
function delMllConcernRule(ruleId){
    $.lightBox({
        width: 390,
        title: '删除确认',
        boxID: 'delMllConcern',
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
                //待完善删除美乐乐关注规则
            }
        }]
    });
}
!(function($){
/**
 * [screenQREvent 美乐乐有参关注选择二维码事件绑定，及选择二维码弹窗初始化]
 * @param  {Array} qrArrayVals [对象数组，存储当前编辑规则对应的已选择二维码，格式如下]
 * [{id: 25,desc: '2051周年清',belongRule:'双十一活动'},{id: 1,desc: '2056周年清',belongRule:'双十一活动'},{id: 2,desc: '2058周年清',belongRule:'双SHIER活动'}];
 */
    $.screenQREvent = function(qrArrayVals){
        //假定qrArrayVals值如下
        // qrArrayVals = [{id,city,storeName,pageAddr,sitAttr,param1,param2,param3,param4,param5,param6,belongRule}
        return new $.screenQREvent.prototype.init( qrArrayVals );
    }
    $.screenQREvent.prototype = {
        constructor:$.screenQREvent,
        init: function(qrArrayVals){
            var that = this;
            this.addBtnSelector = '.data-dia .js-cho-qr';
            this.qrArrayVals = qrArrayVals || [];
            
            this.resArrayVals = [];
            objDeepCopy(this.resArrayVals,this.qrArrayVals);
            
            // 初始编辑弹框中已选id
            this.changeScreenedSpan(this.qrArrayVals);
            //点击选择二维码
            $(this.addBtnSelector).on('click',function(){
                var thatAddBtn = this;
                that.screenQrBox = $.lightBox({
                    width: 1090,
                    closeOther: false,
                    boxID: 'screenQr',
                    title: '选择二维码',
                    html: $('.screenQr').html(),
                    buttons: [{
                        value: '取消',
                        className: 'dia-close cancel-button'
                    },{
                        value: '确认',
                        className: 'bright-button js-screened-btn'
                    }]
                });
                that.screenQrBoxId = $(that.screenQrBox).attr('id');

                //输入框事件
                that.screenInputEvent();
                //筛选搜索
                that.screenQrSearch();
                //筛选结果全选框事件
                that.screenCheckAllEvent();
                //展示已选择的二维码规则
                if ( that.resArrayVals.length > that.qrArrayVals.length ) {
                    that.resArrayVals.splice( that.qrArrayVals.length );
                }
                objDeepCopy(that.resArrayVals,that.qrArrayVals);
                that.showScreenedQr(that.qrArrayVals);
                //点击二维码选择确认
                that.screenQrComfirm();
            });
            return this.qrArrayVals;
        },
        /**
         * [changeScreenedSpan 筛选结果和编辑面板的交互]
         * @param  {Array} qrArray [已选择的二维码结果]
         */
        changeScreenedSpan: function(qrArray){
            var idString = '',chooseQR = '<i class="icon20-gray-add"></i>选择二维码';
            var ids = getSreenIds(qrArray,'id');
            
            if ( ids && ids.length > 0 ) {
                idString = ids.join(',');
                chooseQR = '<input type="hidden" name="qrCode" value="' + idString +'" />' + idString;
            }
            $(this.addBtnSelector).html(chooseQR);
        },
        /**
         * [screenInputEvent 筛选二维码输入框事件]
         */
        screenInputEvent: function(){
            var that = this;
            $(this.screenQrBox).find('.select-item input').on('input',function(){
                var input = $(this).val();
                console.log(input);
                var keyType = $(this).data('keytype');
                var key = input.replace(/(^\s*)|(\s*$)/g, "");
                var thisInput = this;
                if ( key.length > 0 ) {
                    //ajax请求
                    //TODO
                    var json = ['成都','上海','北京','乌鲁木齐铁路局'];
                    if ( json && json.length ) {
                        that.screenInputOnInput(thisInput,json);
                        $(thisInput).parent().addClass('cur-display-select-span');
                    }
                }
            });
            $(this.screenQrBox).find('.select-item input').blur(function(){
                $(this).parent().removeClass('cur-display-select-span');
            });
            $(this.screenQrBox).find('.select-item .js-screen-pane').hover(function(){
                $(this).addClass('cur-display-select');
            },function(){
                $(this).removeClass('cur-display-select');
            });
        },
        /**
         * [screenInputOnInput 筛选二维码输入框事件执行]
         * @param  {[type]} obj  [输入框对象]
         * @param  {[type]} json [ajax请求数据]
         */
        screenInputOnInput: function(obj,json){
            var html = '';
            for ( var k in json ) {
                html += '<li data-role="' + json[k] + '">' + json[k] + '</li>';
            }
            var screenUl = $(obj).parent().find('.js-screen-pane');
            $(screenUl).html(html);
            $(screenUl).find('li').on('click',function(){
                $(obj).val($(this).data('role'));
            });
        },
        /**
         * [screenQrSearch 选择二维码点击搜索，插入搜索内容及绑定check事件]
         */
        screenQrSearch: function(){
            var that = this;
            $(this.screenQrBox).find('.js-screenqr-btn').on('click',function(){
                //TODO
                //ajax请求数据
                var data = $(that.screenQrBox).find('.screen-search-box form').serialize();
                //TODO
                //是否添加表单验证
                //以下json模拟筛选返回
                var json = [
                    {id:'001',city:'深圳',storeName:'宝安旗舰店',pageAddr:'建材',sitAttr:'mobile',belongRule:'建材促销'},
                    {id:'005',city:'成都',storeName:'宝安旗舰店',pageAddr:'建材',sitAttr:'mobile',belongRule:'建材促销'}
                ];
                
                //去除全选选中状态
                $(that.screenQrBox).find('.js-screen-check-all').removeClass('checked');

                if ( json && json.length ) {
                    $(that.screenQrBox).find('.js-screening-list').html(that.createScreenQrHtml(json));
                    if ( $(that.screenQrBox).find('.checked').length == json.length ) {
                        $(that.screenQrBox).find('.js-screen-check-all').addClass('checked');
                    }
                    //hover样式
                    $(that.screenQrBox).find('.js-screening-list tr').hover(function(){
                        $(this).addClass('hover-tr');
                    },function(){
                        $(this).removeClass('hover-tr');
                    });
                    $(that.screenQrBox).find('.js-screening-num').text('筛选结果:' + json.length);
                    //check事件
                    that.checkScreenClick();
                } else {
                    $(that.screenQrBox).find('.js-screening-list').html('');
                }
            });
        },
        /**
         * [createScreenQrHtml 根据json格式数据构造dom的html]
         * @param  {json} json [ajax请求筛选数据]
         * @return {string}      [返回构造筛选结果dom的字符串]
         */
        createScreenQrHtml: function(json){
            var ids = getSreenIds(this.resArrayVals,'id');
            var idString = ( ids && ids.length > 0 ) ? (',' + ids.join(',') + ',') : '';
            var html = '';
            for ( var k in json ) {
                if ( idString.indexOf(String(',' + json[k].id + ',')) != -1 ) {
                    html += '<tr><td><span class="js-screen-check checked" ';
                } else {
                    html += '<tr><td><span class="js-screen-check" ';
                }
                html += 'data-role="' + json[k].id + '|' +json[k].city + '|' + json[k].storeName + '|' + json[k].pageAddr + '|' + json[k].sitAttr + '|' + json[k].param1 + '|' + json[k].param2 + '|' + json[k].param3 + '|' + json[k].param4 + '|' + json[k].param5+ '|' + json[k].param6 + '|' + json[k].belongRule + '"></span></td>'
                    + '<td>' + json[k].id + '</td>'
                    + '<td>' + json[k].city + '</td>'
                    + '<td>' + json[k].storeName + '</td>'
                    + '<td>' + json[k].pageAddr + '</td>'
                    + '<td>' + json[k].sitAttr + '</td>'
                    + '<td>' + json[k].param1 + '</td>'
                    + '<td>' + json[k].param2 + '</td>'
                    + '<td>' + json[k].param3 + '</td>'
                    + '<td>' + json[k].param4 + '</td>'
                    + '<td>' + json[k].param5 + '</td>'
                    + '<td>' + json[k].param6 + '</td>'
                    + '<td>' + json[k].belongRule + '</td></tr>';
            }
            return html;
        },
        /**
         * [checkScreenClick 搜索结果的click事件]
         */
        checkScreenClick: function(){
            var that = this;
            $(this.screenQrBox).find('.js-screen-check').on('click',function(){
                var className = $(this).attr('class');
                var data = $(this).data('role');
                var datainfo = data.split('|');
                if( className.indexOf('checked') == -1 ){
                    $(this).addClass('checked');
                    that.screenCheckQr(datainfo);
                } else {
                    var delId = datainfo[0];
                    var resArray = that.resArrayVals;
                    for ( var ind in resArray ) {
                        if ( delId == resArray[ind].id ) {
                            $(that.screenQrBox).find('.js-screened-list tr').eq(ind).remove();
                            that.resArrayVals.splice(ind,1);
                            $(that.screenQrBox).find('.js-screened-num').text('已选二维码:' + that.resArrayVals.length );
                            break;
                        }
                    }
                    $(this).removeClass('checked');
                }
            });
        },
        /**
         * [screenCheckQr check选中，右边选择预览展示]
         * @param  {array} datainfo [选中数据的信息]
         */
        screenCheckQr: function(datainfo){
            var that = this;
            if ( datainfo && datainfo.length >= 3 ) {
                var html = '<tr><td><span class="js-del-screened del-span" data-id="' + datainfo[0] + '"></span></td>'
                    + '<td>' + datainfo[0] + '</td>'
                    + '<td>' + datainfo[1] + '</td>'
                    + '<td>' + datainfo[2] + '</td>'
                    + '<td>' + datainfo[3] + '</td>'
                    + '<td>' + datainfo[4] + '</td>'
                    + '<td>' + datainfo[5] + '</td>'
                    + '<td>' + datainfo[6] + '</td>'
                    + '<td>' + datainfo[7] + '</td>'
                    + '<td>' + datainfo[8] + '</td>'
                    + '<td>' + datainfo[9] + '</td>'
                    + '<td>' + datainfo[10] + '</td>'
                    + '<td>' + datainfo[11] + '</td>'
                    + '</tr>';
                var appendTr = $(html);
                $(this.screenQrBox).find('.js-screened-list').append(appendTr);
                this.resArrayVals.push({id: datainfo[0],city: datainfo[1],storeName:datainfo[2],pageAddr:datainfo[3],sitAttr:datainfo[4],param1:datainfo[5],param2:datainfo[6],param3:datainfo[7],param4:datainfo[8],param5:datainfo[9],param6:datainfo[10],belongRule:datainfo[11]});
                $(this.screenQrBox).find('.js-screened-num').text('已选二维码:' + this.resArrayVals.length );

                //悬挂样式
                $(appendTr).hover(function(){
                    $(this).addClass('hover-tr');
                },function(){
                    $(this).removeClass('hover-tr');
                });
                //点击删除已选择qr
                $(appendTr).find('.js-del-screened').on('click',function(){
                    that.delScreenClick(this);
                });
            }
        },
        /**
         * [showScreenedQr 展示选择二维码对话框的已选择内容]
         */
        showScreenedQr: function(qrArray){
            var html='',that = this;
            for ( var k in qrArray ) {
                html += '<tr><td><span class="js-del-screened del-span" data-id="' + qrArray[k].id + '"></span></td>'
                    + '<td>' + qrArray[k].id + '</td>'
                    + '<td>' + qrArray[k].city + '</td>'
                    + '<td>' + qrArray[k].storeName + '</td>'
                    + '<td>' + qrArray[k].pageAddr + '</td>'
                    + '<td>' + qrArray[k].sitAttr + '</td>'
                    + '<td>' + qrArray[k].param1 + '</td>'
                    + '<td>' + qrArray[k].param2 + '</td>'
                    + '<td>' + qrArray[k].param3 + '</td>'
                    + '<td>' + qrArray[k].param4 + '</td>'
                    + '<td>' + qrArray[k].param5 + '</td>'
                    + '<td>' + qrArray[k].param6 + '</td>'
                    + '<td>' + qrArray[k].belongRule + '</td></tr>';
            }
            $(this.screenQrBox).find('.js-screened-list').html(html);
            $(this.screenQrBox).find('.js-screened-num').text('已选二维码:' + qrArray.length );
            
            //已选择规则悬挂效果
            $(this.screenQrBox).find('.js-screened-list tr').hover(function(){
                $(this).addClass('hover-tr');
            },function(){
                $(this).removeClass('hover-tr');
            });

            //点击删除已选择qr
            $(this.screenQrBox).find('.js-del-screened').on('click',function(){
                that.delScreenClick(this);
            });
        },
        /**
         * [delScreenClick 点击删除span删除已选择的二维码]
         * @param  {dom} obj [点击的span对象]
         */
        delScreenClick: function(obj){
            var that = this;
            var dataId = $(obj).data('id') + '|';
            var ptr = $(obj).parent().parent();
            var index = $(ptr).index('#'+this.screenQrBoxId + ' .js-screened-list tr');
            $(ptr).remove();
            this.resArrayVals.splice(index,1);
            $(this.screenQrBox).find('.js-screened-num').text('已选二维码:' + this.resArrayVals.length );
            //搜索结果中去除checked样式
            $(this.screenQrBox).find('.js-screen-check').each(function(){
                var data = $(this).data('role');
                if ( dataId.length > 1 && data.indexOf(dataId) == 0 ) {
                    $(that.screenQrBox).find('.js-screen-check-all').removeClass('checked');
                    $(this).removeClass('checked');
                }
            });
        },
        /**
         * [screenCheckAllEvent 筛选的全选事件操作]
         */
        screenCheckAllEvent: function(){
            var that = this;
            $(this.screenQrBox).find('.js-screen-check-all').on('click',function(){
                var className = $(this).attr('class');
                if ( className.indexOf('checked') == -1 ){
                    $(this).addClass('checked');
                    $(that.screenQrBox).find('.js-screen-check').each(function(){
                        if ( $(this).attr('class').indexOf('checked') == -1 ) {
                            $(this).click();
                        }
                    });
                } else {
                    $(this).removeClass('checked');
                    $(that.screenQrBox).find('.js-screen-check').each(function(){
                        if ( $(this).attr('class').indexOf('checked') != -1 ) {
                            $(this).click();
                        }
                    });
                }
            });
        },
        /**
         * [screenQrComfirm 二维码选择确认]
         * @param  {dom} comfirmObj [点击确认的按钮]
         */
        screenQrComfirm: function(){
            var that = this;
            $(this.screenQrBox).find('.js-screened-btn').on('click',function(){
                $.lightBox({
                    boxID: 'qrScreenComfirm',
                    title: '提示',
                    width: '318',
                    html: '<p style="text-align:center;font-size:14px;padding:20px 0 10px 0">所选二维码都将使用新规则，请确认</p>',
                    closeOther: false,
                    buttons: [{
                        value: '取消',
                        className: 'dia-close cancel-button'
                    },{
                        value: '确认',
                        className: 'bright-button',
                        callbackFun: function(){
                            if ( that.resArrayVals.length < that.qrArrayVals.length ) {
                                that.qrArrayVals.splice(that.resArrayVals.length);
                            }
                            objDeepCopy(that.qrArrayVals,that.resArrayVals);
                            //TODO
                            //规则编辑弹窗交互，that为"选择二维码"页面按钮对象
                            that.changeScreenedSpan(that.resArrayVals);

                            //关闭弹窗
                            $.lightBox.closeBox($(this)[0].lightBox);
                            $(that.screenQrBox).find('.dia-close').click();
                        }
                    }]
                });
            });
        }
    }
    $.screenQREvent.prototype.init.prototype = $.screenQREvent.prototype;
})(jQuery);