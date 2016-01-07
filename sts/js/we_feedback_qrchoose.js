/* ======================================
* copyRight: meilele
* fileName: we_feedback_qrchoose.js
* createTime: 2016/01/06
* author: dengyun@meilele
* version: 1.0
* modify: {}
* description: 系统-微回复页面选择二维码涉及js
======================================== */
!(function($){
/**
 * [screenQREvent 美乐乐有参关注选择二维码事件绑定，及选择二维码弹窗初始化]
 * @param  {Array} qrArrayVals [对象数组，存储当前编辑规则对应的已选择二维码，格式如下]
 * [{id: 25,desc: '2051周年清',belongRule:'双十一活动'},{id: 1,desc: '2056周年清',belongRule:'双十一活动'},{id: 2,desc: '2058周年清',belongRule:'双SHIER活动'}];
 * @return {array}             []
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
                // 展示已选择的二维码
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
/**
 * [getSreenIds 获取对象中的id数组]
 */
function getSreenIds(qrArray,key){
    var array = [];
    for ( var kk in qrArray ) {
        array.push(qrArray[kk][key]);
    }
    return array;
}
