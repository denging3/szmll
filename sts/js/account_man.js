/**
 * [dialog 点击按钮展示操作对话框]
 * @param  {[type]} id [包含操作Dom的id]
 */
function dialog(id){
    $('.data-content').html($('#'+id).html());
    $('.data-dia').attr('id',id+'Dia');
    $('.data-dia').attr('data-role',id+'Dia');
    if($('.data-dia').data('role')){
        $('.data-dia').data('role',id+'Dia');
    }
    $('.data-dia').prepend("<div class='fix'></div>");
    var r = $('.data-dia').data('role');
    var d = $("#" + r + "");
    d.fadeIn();
    $('.data-dia').css('display', 'flex');
    $('.fix').on('click',function () {
        d.fadeOut();
        setTimeout(function(){
            $('.fix').detach();
        },500)
    });
    if($('.dia-close')[0]){
        $('.dia-close').on('click',function(){
            $('.fix').click();
        });
    }
    if($('.data-dia .radio-input')[0]){
        $('.data-dia .radio-input').on('click',function(){
            $('.data-dia .radio-input').removeClass('check');
            $('.data-dia input[name=status]').attr('checked',false);
            $(this).addClass('check');
            $(this).siblings().attr('checked',true);
        })
    }
}
/**
 * [showAccount description] 弹框展示账户信息
 * @param  {[type]} accountString 账户信息字符串 以|分隔  帐号|姓名|状态|权限|门店名称|登录次数|登录时间
 */
function showAccount(accountString){
    var infos = ( accountString && accountString.length > 0 ) ? accountString.split('|') : [] ;
    var accountLabel = ['accountUserShow','accountNameShow','accountStatusShow','accountPrivShow','storeNameShow','logTimesShow','lastLogTimeShow'];
    if( infos.length && infos.length >= 7 ) {
        for(var ii in accountLabel){
            $( '.' + accountLabel[ii] ).text( infos[ii] );
        }
        dialog('accountinfo');
    }
}
/**
 * [editAccount description] 弹框展示账户信息
 * @param  {[type]} accountString 账户信息字符串 以|分隔  帐号|姓名|状态value|权限value|门店value
 */
function editAccount(accountString){
    var infos = ( accountString && accountString.length > 0 ) ? accountString.split('|') : [] ;
    var accountLabel = ['accountUserIn','accountNameIn','accountStatusIn','accountPrivIn','storeNameIn'];
    if( infos.length && infos.length >= 5 ) {
        dialog('editAccount');
        for(var ii in accountLabel){
            if( accountLabel[ii] == 'accountPrivIn' ) {
                var privVal = infos[ii];
                $('.data-dia .accountPrivIn').find('option').each(function(){
                    if( $(this).val() == privVal){
                        $(this).attr('selected','selected');
                    }
                });
            }else if( accountLabel[ii] == 'accountStatusIn') {
                var statusVal = infos[ii];
                $('.data-dia input[name=status]').each(function(){
                    if( $(this).val() == statusVal ){
                        $(this).attr('checked',true);
                        $(this).siblings().addClass('check');
                    }
                });
            }else if( accountLabel[ii] == 'storeNameIn' ) {
                var storeVal = infos[ii];
                $('.data-dia .storeNameIn').find('option').each(function(){
                    if( $(this).val() == storeVal){
                        $(this).attr('selected','selected');
                    }
                });
            }else{
                $( '.' + accountLabel[ii] ).val( infos[ii] );
            }
        }
        
    }
}
/**
* 提示信息弹框
* 参数格式如 info : {'title':'提示','content':'导入失败，部分店员在系统中存在。点击下载<a href="#" class="down-link">下载明细</a>','comfirBtn':'确定'}
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
    dialog('warnInfo');
}
/**
 * [validForm 点击提交时验证输入]
 * @param  {[type]} checkType [何操作类型：0新增店员，1编辑店员信息，2重置密码]
 * @return {[type]}           [是否验证通过]
 */
function validForm(checkType){
    var validRes = true;
    var inputClassNames = [
        'accountUserIn',
        'accountNameIn',
        'accountPrivIn',
        'accountStatusIn',
        'storeNameIn',
        'passIn',
        'rePassIn'];
    var inputWarns = [
        '<br /><span class="warn-tips">请填写登录帐号</span>',
        '<br /><span class="warn-tips">请填写帐号姓名</span>',
        '<br /><span class="warn-tips">请选择账号权限</span>',
        '<br /><span class="warn-tips status-tips">请选择账号状态</span>',
        '<br /><span class="warn-tips">请选择账号所属门店</span>',
        '<br /><span class="warn-tips">6-20位字母数字和字符</span>',
        '<br /><span class="warn-tips">请确认与新密码输入一致</span>'];
    var checkTypes = [
        {'type':'addAccount','checks':'"accountUserIn,accountNameIn,accountPrivIn,accountStatusIn,storeNameIn"'},
        {'type':'editAccount','checks':'"accountUserIn,accountNameIn,accountPrivIn,accountStatusIn,storeNameIn"'},
        {'type':'resetPass','checks':'"passIn,rePassIn"'}
    ];
    var valids = checkTypes[checkType].checks;
    
    for(var i in inputClassNames){
        console.log(valids);
        if(valids.indexOf(inputClassNames[i]) != -1){
            switch ( inputClassNames[i] ){
                case 'accountUserIn':
                    if(!$('.data-dia .accountUserIn').val()){
                        $('.data-dia .accountUserIn').siblings().remove();
                        $('.data-dia .accountUserIn').parent().append(inputWarns[i]);
                        validRes = false;
                    }else{
                        $('.data-dia .accountUserIn').siblings().remove();
                    };
                    break;
                case 'accountNameIn':
                    if(!$('.data-dia .accountNameIn').val()){
                        $('.data-dia .accountNameIn').siblings().remove();
                        $('.data-dia .accountNameIn').parent().append(inputWarns[i]);
                        validRes = false;
                    }else{
                        $('.data-dia .accountNameIn').siblings().remove();
                    };
                    break;
                case 'accountPrivIn':
                    if( $('.data-dia .accountPrivIn').val() && $('.data-dia .accountPrivIn').val() != '0' ){
                        $('.data-dia .accountPrivIn').siblings().remove();
                    }else{
                        $('.data-dia .accountPrivIn').siblings().remove();
                        $('.data-dia .accountPrivIn').parent().append(inputWarns[i]);
                        validRes = false;
                    };
                    break;
                case 'storeNameIn':
                    if( $('.data-dia .storeNameIn').val() && $('.data-dia .storeNameIn').val() != '0' ){
                        $('.data-dia .storeNameIn').siblings().remove();
                    }else{
                        $('.data-dia .storeNameIn').siblings().remove();
                        $('.data-dia .storeNameIn').parent().append(inputWarns[i]);
                        validRes = false;
                    };
                    break;
                case 'accountStatusIn':
                    if( $('.data-dia').find('input[type=radio]:checked')[0] ){
                        $('.data-dia .status-td .warn-tips').remove();
                    }else{
                        $('.data-dia .status-td .warn-tips').remove();
                        $('.data-dia .status-td').append(inputWarns[i]);
                        validRes = false;
                    };
                    break;
                case 'passIn':
                    if(/^[^\u4e00-\u9fa5]{6,20}$/i.test($('.data-dia .passIn').val())){
                        $('.data-dia .passIn').siblings().remove();
                    }else{
                        $('.data-dia .passIn').siblings().remove();
                        $('.data-dia .passIn').parent().append(inputWarns[i]);
                        validRes = false;
                    };
                    break;
                case 'rePassIn':
                    if($('.data-dia .passIn').val() == $('.data-dia .rePassIn').val()){
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