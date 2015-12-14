(function($){
    stayList = {
        start:$('#startDate'),
        end:$('#endDate'),
        today:(new Date()),
        init:function(){
            stayList.endFun();
            stayList.startFun();
        },
        startFun:function(){
            stayList.start.datepicker({
                dateFormat : 'yy-mm-dd',
                dayNamesMin : ['日','一','二','三','四','五','六'],
                monthNames : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                altFormat : 'yy-mm-dd',
                yearSuffix:'年',
                showMonthAfterYear:true,
                firstDay : 1,
                showOtherMonths:true,
                minDate : -360,
                maxDate:360,
                onSelect:function(dateText,inst){
                    stayList.end.datepicker('option', 'minDate', new Date(moment(dateText).add('days', 0)));
                    stayList.end.datepicker('option', 'maxDate', new Date(moment(dateText).add('days', 360)));
                   /* var strDay =  stayList.compare($(this));
                    stayList.start.datepicker('option', 'appendText', strDay);
                    if((new Date(stayList.end.val()) - new Date(dateText)) <= (24*60*60*1000)){
                        stayList.end.datepicker('option', 'appendText', stayList.compare(stayList.end));
                    }*/
                }

            });
        },
        endFun:function(){
            stayList.end.datepicker('refresh');
            stayList.end.datepicker({
                dateFormat : 'yy-mm-dd',
                dayNamesMin : ['日','一','二','三','四','五','六'],
                monthNames : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                altFormat : 'yy-mm-dd',
                yearSuffix:'年',
                showMonthAfterYear:true,
                firstDay : 1,
                showOtherMonths:true,
                minDate : -360,
                maxDate:360,
                /*onSelect:function(){
                    stayList.end.datepicker('option', 'appendText', stayList.compare($(this)));
                }*/
            });
        },
        transformStr:function(day,strDay){
            switch (day){
                    case 1:
                        strDay  = '星期一';
                        break;
                    case 2:
                        strDay  = '星期二';
                        break;
                    case 3:
                        strDay  = '星期三';
                        break;
                    case 4:
                        strDay  = '星期四';
                        break;
                    case 5:
                        strDay  = '星期五';
                        break;
                    case 6:
                        strDay  = '星期六';
                        break;
                    case 0:
                        strDay  = '星期日';
                        break;
                }
            return strDay;
        },
        compare:function(obj){
            var strDay = '今天';
            var myDate = new Date(stayList.today.getFullYear(),stayList.today.getMonth(),stayList.today.getDate());
            var day = (obj.datepicker('getDate') - myDate)/(24*60*60*1000);
            day == 0 ? strDay: day == 1 ?
                (strDay = '明天') : day == 2 ?
                (strDay = '后天') : (strDay = stayList.transformStr(obj.datepicker('getDate').getDay(),strDay));
            return strDay;
        },
        inputVal:function(){
            stayList.inputTimes(stayList.start,1);
            stayList.inputTimes(stayList.end,2);
        },
        inputTimes:function(obj,day){
            var m = new Date(moment(stayList.today).add('days', day));
            obj.val(m.getFullYear() + "-" + stayList.addZero((m.getMonth()+1)) + "-" + stayList.addZero(m.getDate()));
        },
        addZero:function(num){
            num < 10 ? num = "0" + num : num ;
            return num;
        }
    }
    stayList.init();
})(jQuery);

/*弹出框*/
function dialogs(obj){
	$('.data-dia').prepend("<div class='fix'></div>");
	var r = $(obj).data('role');
    var d = $("#" + r + "");
    d.fadeIn();
    d.css('display', 'flex');
    $('.fix,.close_log,.cancel').on('click',function () {
        d.fadeOut();
        setTimeout(function(){
        	$('.fix').detach();
        },500)
    });
}
