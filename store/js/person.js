$(document).ready(function(){
    Arr = [];
    var ArrNum = $('.tab_menu ul li').length;
    for(var i=0;i<ArrNum;i++){
        Arr.push($(".tab_menu ul li:nth-of-type("+(i+1)+") a").data('role'));
    }
    for(var i=0;i<Arr.length;i++){
        $("#"+Arr[i]).hide();
    }
    $("#"+Arr[0]).show();
    $('.tab_menu ul li:first-child').addClass('act');
});

$('.tab_menu ul li a').on('click',function(){
    var tar = $(this).data('role');
    for(var i=0;i<Arr.length;i++){
        $("#"+Arr[i]).hide();
    }
    $('#'+tar).show();
    $('.tab_menu ul li').removeClass('act');
    $(this).parent().addClass('act');
});

function showDialog(id){
    $('.data-content').html($('#'+id).html());
    $('.data-dia').attr('id',id+'Dia');
    $('.data-dia').attr('data-role',id+'Dia');
    if($('.data-dia').data('role')){
        $('.data-dia').data('role',id+'Dia');
    }
    dialog($('.data-dia'));
    $('.dia-close').on('click',function(){
        $('.fix').click();
    });
}
function editRole(){
    //赋值...等待接口

    var dialogId = 'editRole';
    showDialog(dialogId);
    $('.radio-input').on('click',function(){
        $(this).addClass('check');
    });
}
function showStaffInfo(){
    $('#staffName').text('刘德华');
    $('#staffPhone').text('15100000000');
    $('#storeName').text('美乐乐旗舰店');
    $('#staffRole').text('店长');
    $('#staffStatus').text('已激活');
    showDialog('staffinfo');
}
function showWarnInfo(type){
    var html = [{
        'type': 'importError',
        'title': '提示',
        'content': '<tr><td>导入失败，部分店员在系统中存在。点击下载<a href="#" class="down-link">下载明细</a><td></tr><tr><td><input type="button" value="确定" class="dia-close bright-button" style="width:96px;"/></td></tr>'
    },{
        'type': 'warn',
        'title': '提示',
        'content': '<tr><td>请输入正确手机号<td></tr><tr><td><input type="button" value="确定" class="dia-close bright-button" style="width:96px;"/></td></tr>'
    },{
        'type': 'imporWait',
        'title': null,
        'content':'批量导入需花费较长时间，请耐心等待...'
    }];
    if(html[type].title){
        $('#warnInfo').find('.dia-title').text(html[type].title);
    }else{
        $('#warnInfo').find('.dia-header').remove();
    }
    $('#warnInfo').find('table').html(html[type].content);
    showDialog('warnInfo');
}
function validForm(checkType){
    var validRes = true;
    var inputClassNames = [
        'staffname-in',
        'staff-phone-in',
        'pass-in',
        're-pass-in',
        'storename-in',
        'staffrole-in',
        'staffstatus-in'];
    var inputWarns = [
        '<br /><span class="warn-tips">请填写店员名称</span>',
        '<br /><span class="warn-tips">请填写11位数字的手机号码</span>',
        '<br /><span class="warn-tips">6-20位字母数字和字符</span>',
        '<br /><span class="warn-tips">请确认填写一致密码</span>',
        '<br /><span class="warn-tips">请选择所属门店</span>',
        '<br /><span class="warn-tips">请选择角色</span>',
        '<span="warn-tips">请选择店员状态</span>'];
    var checkTypes = [
        {'type':'addStaff','checks':'"staffname-in,staff-phone-in,pass-in,re-pass-in,storename-in,staffrole-in,staffstatus-in"'},
        {'type':'editStaffinfo','checks':'"staffname-in,staff-phone-in"'},
        {'type':'resetPass','checks':'"pass-in,re-pass-in"'}
    ];
    var valids = checkTypes[checkType].checks;

    for(var i in inputClassNames){
        console.log(valids);
        if(valids.indexOf(inputClassNames[i]) != -1){
            switch ( inputClassNames[i] ){
                case 'staffname-in':
                    if(!$('.data-dia .staffname-in').val()){
                        $('.data-dia .staffname-in').siblings().remove();
                        $('.data-dia .staffname-in').parent().append(inputWarns[i]);
                        validRes = false;
                    }else{
                        $('.data-dia .staffname-in').siblings().remove();
                    };
                    break;
                case 'staff-phone-in':
                    if(/^1[0-9]{10}$/.test($('.data-dia .staff-phone-in'))){
                        $('.data-dia .staff-phone-in').siblings().remove();
                        $('.data-dia .staff-phone-in').parent().append('<br /><span class="warn-tips">修改手机号会重置店员状态为未激活</span>');
                    }else{
                        $('.data-dia .staff-phone-in').siblings().remove();
                        $('.data-dia .staff-phone-in').parent().append(inputWarns[i]);
                        validRes = false;
                    };
                    break;
                case 'pass-in':
                    if(/^[^\u4e00-\u9fa5]{6,20}$/i.test($('.data-dia .pass-in').val())){
                        $('.data-dia .pass-in').siblings().remove();
                        $('.data-dia .pass-in').parent().append('<br /><span class="gray-tips">6-20位字母数字和字符</span>');
                    }else{
                        $('.data-dia .pass-in').siblings().remove();
                        $('.data-dia .pass-in').parent().append(inputWarns[i]);
                        validRes = false;
                    };
                    break;
                case 're-pass-in':
                    if($('.data-dia .pass-in').val() == $('.data-dia .re-pass-in').val()){
                        $('.data-dia .re-pass-in').siblings().remove();
                    }else{
                        $('.data-dia .re-pass-in').siblings().remove();
                        $('.data-dia .re-pass-in').parent().append(inputWarns[i]);
                        validRes = false;
                    };
                    break;
            }
        }
    }
    return validRes;
}