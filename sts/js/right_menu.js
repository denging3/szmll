var demo = {
    "button":[
    {
        "type":"click",
        "name":"今日歌曲",
        "key":"V1001_TODAY_MUSIC"
    },
    {
        "name":"菜单",
        "sub_button":[
            {
                "type":"view",
                "name":"搜索",
                "url":"http://www.soso.com/"
            },
            {
                "type":"view",
                "name":"视频",
                "url":"http://v.qq.com/"
            },
            {
                "type":"click",
                "name":"赞一下我们",
                "key":"V1001_GOOD"
            }]
    }]
};
var msg={
    sendMsg:function(obj){
        $('#js_rightBox').show();
    },
    delMsg:function(){

    },
    saveMsg:function(){

    }
};
//点击创建menu
$('#creatMeseege').click(function(){
    msg.sendMsg(this);
});
$('#edit').load('page/msg_tab.html');

$('.frm_radio_label').on('click',function(){
    $('.frm_radio_label').removeClass('selected');
    var type=$(this).data('type');
    $(this).addClass('selected');
    $('.menu_content').hide();
    $(type).show();
});

function getVaule(){
	var a = 123;
	return a;
}

var MAXID= '5';
