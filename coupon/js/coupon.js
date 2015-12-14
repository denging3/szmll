(function($) {
	$(document).ready(function() {	
		/*选择切换优惠券类型*/
		$('.coupon_type').changeType();
		
		/*设置选择固定日期的下拉菜单选项*/
		$('#howMuchDay').setList('立即生效');
		$('#useDay').setList('');
		$('#coupon_name').on('keyup',function(){
			$.fn.checkLength(this,'#coupon_name_length');
		});
		
		/*设置类型和折扣的时候，右边预览图实时展示*/
		$('#tab_type_zhekou,#tab_type_daijin').on('keyup',function(){
			$.fn.checkNum(this);
			$('#tab_type_daijin').setValue('#preview_daijin');
		})
		
		$('#tab_type_zhekou').on('blur',function(){
			$.fn.checkFixed(this);
			$('#tab_type_zhekou').setValue('#preview_zhekou');
		})
		
	    /*有效期一个被选择，另一个背景变灰且不能选择*/
		$('input[name="chose_date"]').on('click',function(){
			var dateInput = $('#startDate,#endDate');
			var userSelect = $('#howMuchDay,#useDay');
			if($('input[name="chose_date"]:checked').val() == 1){
				userSelect.attr('disabled','disabled');
				userSelect.addClass('grays');
				dateInput.removeAttr('disabled');
				dateInput.removeClass('grays');
			}else{
				dateInput.attr('disabled','disabled');
				dateInput.addClass('grays');
				userSelect.removeAttr('disabled');
				userSelect.removeClass('grays');
			}
		})
		
		/*当选择日期后，右边预览图实时展示*/
		$('#endDate').on('change',function(){
			var stratDate = $('#startDate').val().split('-').join('.');
			var enDate = $('#endDate').val().split('-').join('.');
			$('#pre_startDate').html(stratDate);
			$('#pre_endDate').html(enDate);
		})
		/*判断是否输入客服电话，有则在预览图显示*/
		$('#service_phone').on('keyup',function(){
			if($('#service_phone').val().length >  0){
				$('#pre_phone').css('display','block');
			}else{
				$('#pre_phone').css('display','none');
			}
		})
	
	});
	
	$.fn.extend({
		/*切换优惠券类型*/
		changeType: function() {
			var tabMenu = $(this);
			tabMenu.on('click', function() {
				var num = $(this).data('num') * -54;
				var tabBox = $('.tabs');
				var tabList = $('.tab_type');
				var tabIndex = tabMenu.index(this);
				tabMenu.css({
					'background': 'url(images/coupon_ico.png)',
					'color': '#999999'
				});
				$(this).css({
					"background": "url(images/coupon_ico.png) 0 " + num + "px",
					"color": "white"
				});
				$('.coupon_pre_type').eq(tabIndex).show().siblings().hide();
				if (tabIndex < 2) {
					tabBox.show();
					tabList.eq(tabIndex).show().siblings().hide();
				} else {
					tabBox.hide();
				}
			})
		},
		/*计算obj值的字符长度,在target显示出来*/
		checkLength:function(obj,target){
				var tvalue = $.trim(obj.value);
				var nvalue = obj.value;
				if(tvalue.length == 0){
					$(obj).value = '';
					$(target).html(0);
				}else if(tvalue.length > 0 && nvalue.length < 9){
					$(target).html(nvalue.length);
				}else{
					$(target).html(9);
				}
				$('#coupon_name').setValue('.preview_text');
		},
		setValue:function(target){
			$(target).html($(this).val());
		},
		/*保留小数后一位，不四舍五入*/
		checkFixed:function(obj){
			var absValue = String(Math.abs(obj.value));
			var roundValue,overValue;
			if(absValue >= 10){
				overValue = absValue.substring(0,1) + '.' +absValue.substring(1,2);
			}else{
				roundValue =parseFloat(absValue).toFixed(2); //返回的值是string类型
		    	overValue = roundValue.substring(0,roundValue.lastIndexOf('.')+2);
			}
			obj.value = overValue;
		},
		/*只能输入数字和正负号,小数点*/
		checkNum:function(ob) {
 			if (!ob.value.match(/^[\+\-]?\d*?\.?\d*?$/)){
 				ob.value = ob.t_value;
 			}  else {
 				ob.t_value = ob.value;
 			}
 			if (ob.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/)) {
 				ob.o_value = ob.value;
 			}
       },
        /*设置选择天数下拉菜单*/
		setList:function(text){
			var html;
			if(text){
				html = '<option value="0">'+text+'</option>';
			}
			for(var i=1;i<91;i++){
				html += '<option value="'+ i +'">'+ i +'天</option>';
			}
			$(this).html(html);
		}
	});
})(jQuery);

/*弹出框*/
function dialogs(obj){
	$('.data-dia').prepend("<div class='fix'></div>");
	var r = $(obj).data('role');
    var d = $("#" + r + "");
    d.fadeIn();
    d.css('display', 'flex');
    $('.fix,.close_log,.cancel,#save_setting').on('click',function () {
        d.fadeOut();
        setTimeout(function(){
        	$('.fix').detach();
        },500)
    });
}

