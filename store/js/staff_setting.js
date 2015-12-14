/*-----------------Tab切换的玩意-----------------*/   
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

    $('.tab_menu ul li a').on('click',function(){
        var tar = $(this).data('role');
        for(var i=0;i<Arr.length;i++){
            $("#"+Arr[i]).hide();
        }
        $('#'+tar).show();
        $('.tab_menu ul li').removeClass('act');
        $(this).parent().addClass('act');
    });
});
/**
 * [showDialog 展示操作对话框]
 * @param  {[type]} id [操作对话框DOM——id]
 */
function showDialog(id){
    $('.data-content').html($('#'+id).html());
    $('.data-dia').attr('id',id+'Dia');
    $('.data-dia').attr('data-role',id+'Dia');
    if($('.data-dia').data('role')){
        $('.data-dia').data('role',id+'Dia');
    }
    dialog($('.data-dia'));
    if( $('.dia-close')[0] ) {
        $('.dia-close').on('click',function(){
            $('.fix').click();
        });
    }
    
    if( $('.data-dia .radio-input')[0] ){
        $('.data-dia .radio-input').on('click',function(){
            $('.data-dia .radio-input').removeClass('check');
            $('.data-dia input[name=status]').attr('checked',false);
            $(this).addClass('check');
            $(this).siblings().attr('checked',true);
        })
    }
}
function editRole(){
    //赋值...等待接口
    
    var dialogId = 'editRole';
    showDialog(dialogId);
    $('.radio-input').on('click',function(){
        $(this).addClass('check');
    });
}
/**
* [showStaffInfo description] 弹框展示店员基本信息
* @param  {[type]} staffInfoString 店员信息字符串 以|分隔  店员姓名|手机号|所属门店value|角色value|状态value
*/
function showStaffInfo(staffInfoString){
    var infos = ( staffInfoString && staffInfoString.length > 0 ) ? staffInfoString.split('|') : [] ;
    var infoLabels = ['staffnameShow','staffPhoneShow','storenameShow','staffRoleShow','staffStatusShow'];
    if( infos.length && infos.length >= 5 ) {
        for(var ii in infoLabels){
            $( '.' + infoLabels[ii] ).text( infos[ii] );
        }
        showDialog('staffinfo');
    }
}   
/**
* [editStaff description] 弹框编辑店员信息
* @param  {[type]} staffInfoString 店员信息字符串 以|分隔  店员姓名|手机号|所属门店value|角色value|状态value
*/
function editStaff(staffInfoString){
    var infos = ( staffInfoString && staffInfoString.length > 0 ) ? staffInfoString.split('|') : [] ;
    var infoLabels = ['staffnameIn','staffPhoneIn','storenameIn','staffRoleIn','staffStatusIn'];
    if( infos.length && infos.length >= 5 ) {
        showDialog('editStaffinfo');
        for(var ii in infoLabels){
            if( infoLabels[ii] == 'staffRoleIn' ) {
                var roleVal = infos[ii];
                $('.data-dia .staffRoleIn').find('option').each(function(){
                    if( $(this).val() == roleVal){
                        $(this).attr('selected','selected');
                    }
                });
            }else if( infoLabels[ii] == 'staffStatusIn') {
                var statusVal = infos[ii];
                $('.data-dia input[name=status]').each(function(){
                    if( $(this).val() == statusVal ){
                        $(this).attr('checked',true);
                        $(this).siblings().addClass('check');
                    }
                });
            }else if( infoLabels[ii] == 'storenameIn' ) {
                var storeVal = infos[ii];
                $('.data-dia .storeNameIn').find('option').each(function(){
                    if( $(this).val() == storeVal){
                        $(this).attr('selected','selected');
                    }
                });
            }else{
                $( '.' + infoLabels[ii] ).val( infos[ii] );
            }
        }
        
    }
}
/**
* 提示信息弹框
* 参数格式如 info : {'title':'提示','content':'导入失败，部分店员在系统中存在。点击下载<a href="#" class="down-link">下载明细</a>','comfirBtn':'确定'}
* info: {'content': '批量导入需花费较长时间，请耐心等待...'}
*/
function warnInfo(info){
    var contentHtml = '<tr><td>' + info.content + '<td></tr>';
    if( info.comfirBtn ){
        contentHtml += '<tr><td><input type="button" value="' + info.comfirBtn +'" class="dia-close bright-button" /></td></tr>';
    }
    if(info.title){
        $('#warnInfo').find('.dia-title').text(info.title);
    }else{
        $('#warnInfo').find('.dia-header').remove();
    }
    $('#warnInfo').find('table').html(contentHtml);
    showDialog('warnInfo');
}
/**
 * [validForm 点击提交时验证输入]
 * @param  {[type]} checkType [何操作类型：0新增店员，1编辑店员信息，2重置密码]
 * @return {[type]}           [是否验证通过]
 */
function validForm(checkType){
    var validRes = true;
    var inputClassNames = [
        'staffnameIn',
        'staffPhoneIn',
        'passIn',
        'rePassIn',
        'storenameIn',
        'staffRoleIn',
        'staffStatusIn'];
    var inputWarns = [
        '<br /><span class="warn-tips">请填写店员名称</span>',
        '<br /><span class="warn-tips">请填写11位数字的手机号码</span>',
        '<br /><span class="warn-tips">6-20位字母数字和字符</span>',
        '<br /><span class="warn-tips">请确认填写一致密码</span>',
        '<br /><span class="warn-tips">请选择所属门店</span>',
        '<br /><span class="warn-tips">请选择角色</span>',
        '<span class="warn-tips">请选择店员状态</span>'];
    var checkTypes = [
        {'type':'addStaff','checks':'"staffnameIn,staffPhoneIn,passIn,rePassIn,storenameIn,staffRoleIn,staffStatusIn"'},
        {'type':'editStaffinfo','checks':'"staffnameIn,staffPhoneIn"'},
        {'type':'resetPass','checks':'"passIn,rePassIn"'}
    ];
    var valids = checkTypes[checkType].checks;
    
    for(var i in inputClassNames){
        console.log(valids);
        if(valids.indexOf(inputClassNames[i]) != -1){
            switch ( inputClassNames[i] ){
                case 'staffnameIn':
                    if( !$('.data-dia .staffnameIn').val() ){
                        $('.data-dia .staffnameIn').siblings().remove();
                        $('.data-dia .staffnameIn').parent().append(inputWarns[i]);
                        validRes = false;
                    }else{
                        $('.data-dia .staffnameIn').siblings().remove();
                    };
                    break;
                case 'staffPhoneIn':
                    if( /^1[0-9]{10}$/.test( $('.data-dia .staffPhoneIn').val() ) ) {
                        $('.data-dia .staffPhoneIn').siblings().remove();
                        $('.data-dia .staffPhoneIn').parent().append('<br /><span class="warn-tips">修改手机号会重置店员状态为未激活</span>');
                    }else{
                        $('.data-dia .staffPhoneIn').siblings().remove();
                        $('.data-dia .staffPhoneIn').parent().append(inputWarns[i]);
                        validRes = false;
                    };
                    break;
                case 'passIn':
                    if( /^[^\u4e00-\u9fa5]{6,20}$/i.test( $('.data-dia .passIn').val() ) ) {
                        $('.data-dia .passIn').siblings().remove();
                        $('.data-dia .passIn').parent().append('<br /><span class="gray-tips">6-20位字母数字和字符</span>');
                    }else{
                        $('.data-dia .passIn').siblings().remove();
                        $('.data-dia .passIn').parent().append(inputWarns[i]);
                        validRes = false;
                    };
                    break;
                case 'rePassIn':
                    if( $('.data-dia .passIn').val() == $('.data-dia .rePassIn').val() ){
                        $('.data-dia .rePassIn').siblings().remove();
                    }else{
                        $('.data-dia .rePassIn').siblings().remove();
                        $('.data-dia .rePassIn').parent().append(inputWarns[i]);
                        validRes = false;
                    };
                    break;
            }
        }
    }
    return validRes;
}