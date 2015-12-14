/*baiduMap.api*/

var map1 = new BMap.Map("baiduMap");          // 创建地图实例
var point1 = new BMap.Point(116.404, 39.915);  // 创建点坐标
map1.centerAndZoom(point1, 15);                 // 初始化地图，设置中心点坐标和地图级别


var map2 = new BMap.Map("baiduMap_info");          // 创建地图实例
var point2 = new BMap.Point(116.331398, 39.897445);
map2.centerAndZoom(point2, 12);

var newPoint = '';
$('.ssq select').eq(0).change(function () {
    newPoint = newPoint + $(".ssq select:nth-of-type(1) option:selected").html();
    map2.centerAndZoom(newPoint, 11);
});
$('.ssq select').eq(1).change(function () {
    newPoint = newPoint + $(".ssq select:nth-of-type(2) option:selected").html();
    map2.centerAndZoom(newPoint, 11);
});
$('.ssq select').eq(2).change(function () {
    newPoint = newPoint + $(".ssq select:nth-of-type(3) option:selected").html();
    map2.centerAndZoom(newPoint, 11);
});


// var geolocation = new BMap.Geolocation();
// geolocation.getCurrentPosition(function(r){
//     if(this.getStatus() == BMAP_STATUS_SUCCESS){
//         var mk = new BMap.Marker(r.point);
//         map2.addOverlay(mk);
//         map2.panTo(r.point);
//     }
//     else {
//         alert('failed'+this.getStatus());
//     }
// },{enableHighAccuracy: true});

/*baiduMap.api*/
var myChart = echarts.init(document.getElementById('mainMap'));
var option = {
    tooltip: {
        trigger: 'item',
        backgroundColor: '#ff7b05',
        color: '#fff',
        borderRadius: 2,
    },
    legend: {
        show: false,
        data: ['门店数量'],
    },
    dataRange: {
        show: false,
        min: 0,
        max: 2500,
        color: ['#ddd', '#d8d8d8'],
        text: ['高', '低'],           // 文本，默认为数值文本
        calculable: true,
    },
    series: [
        {
            name: '门店数量',
            type: 'map',
            mapType: 'china',
            roam: false,
            itemStyle: {
                normal: {
                    label: {
                        show: true, textStyle: {
                            color: '#666',
                            fontSize: 12
                        }
                    }, borderColor: '#fff', borderWidth: 2
                },
                emphasis: {
                    label: {
                        show: true,
                        textStyle: {
                            color: '#fff',
                            fontSize: 12
                        }
                    },
                    color: '#2bc486', borderColor: '#fff', borderWidth: 2,
                }
            },
            data: [
                {name: '北京', value: Math.round(Math.random() * 1000)},
                {name: '天津', value: Math.round(Math.random() * 1000)},
                {name: '上海', value: Math.round(Math.random() * 1000)},
                {name: '重庆', value: Math.round(Math.random() * 1000)},
                {name: '河北', value: Math.round(Math.random() * 1000)},
                {name: '河南', value: Math.round(Math.random() * 1000)},
                {name: '云南', value: Math.round(Math.random() * 1000)},
                {name: '辽宁', value: Math.round(Math.random() * 1000)},
                {name: '黑龙江', value: Math.round(Math.random() * 1000)},
                {name: '湖南', value: Math.round(Math.random() * 1000)},
                {name: '安徽', value: Math.round(Math.random() * 1000)},
                {name: '山东', value: Math.round(Math.random() * 1000)},
                {name: '新疆', value: Math.round(Math.random() * 1000)},
                {name: '江苏', value: Math.round(Math.random() * 1000)},
                {name: '浙江', value: Math.round(Math.random() * 1000)},
                {name: '江西', value: Math.round(Math.random() * 1000)},
                {name: '湖北', value: Math.round(Math.random() * 1000)},
                {name: '广西', value: Math.round(Math.random() * 1000)},
                {name: '甘肃', value: Math.round(Math.random() * 1000)},
                {name: '山西', value: Math.round(Math.random() * 1000)},
                {name: '内蒙古', value: Math.round(Math.random() * 1000)},
                {name: '陕西', value: Math.round(Math.random() * 1000)},
                {name: '吉林', value: Math.round(Math.random() * 1000)},
                {name: '福建', value: Math.round(Math.random() * 1000)},
                {name: '贵州', value: Math.round(Math.random() * 1000)},
                {name: '广东', value: Math.round(Math.random() * 1000)},
                {name: '青海', value: Math.round(Math.random() * 1000)},
                {name: '西藏', value: Math.round(Math.random() * 1000)},
                {name: '四川', value: Math.round(Math.random() * 1000)},
                {name: '宁夏', value: Math.round(Math.random() * 1000)},
                {name: '海南', value: Math.round(Math.random() * 1000)},
                {name: '台湾', value: Math.round(Math.random() * 1000)},
                {name: '香港', value: Math.round(Math.random() * 1000)},
                {name: '澳门', value: Math.round(Math.random() * 1000)}
            ],
        }
    ],
};
myChart.setOption(option);

/*-----------------Tab切换的玩意-----------------*/
$(document).ready(function () {
    Arr = [];
    var ArrNum = $('.tab_menu ul li').length;
    for (var i = 0; i < ArrNum; i++) {
        Arr.push($(".tab_menu ul li:nth-of-type(" + (i + 1) + ") a").data('role'));
    }
    for (var i = 0; i < Arr.length; i++) {
        $("#" + Arr[i]).hide();
    }
    $("#" + Arr[0]).show();
    $('.tab_menu ul li:first-child').addClass('act');
})

$('.tab_menu ul li a').on('click', function () {
    var tar = $(this).data('role');
    for (var i = 0; i < Arr.length; i++) {
        $("#" + Arr[i]).hide();
    }
    $('#' + tar).show();
    $('.tab_menu ul li').removeClass('act');
    $(this).parent().addClass('act');
})

/*按钮*/
$('.new_sotre').on('click', function () {
    dialog(this);
});
$('.flex_title button').on('click',function(){
    dialog(this);
});
$('#map_info .none a').on('click',function(){
    dialog(this);
})
/*right_float*/
var t = true;
$('.flex_Click').click(function(){
    var w = $('.right_flex').width();
    if(w ==250&&t == true){
        console.log(t)
        $('.right_flex').css('width',w+'px');
        t = false;
    }else{
        $('.right_flex').css('width','0px');
        t = true;
    }
});
$('.right_flex').mouseenter(function(){
   if(t==true){
       $('.right_flex').css('width','250px');
   }
});
$('.right_flex').mouseleave(function(){
    if(t==true){
        $('.right_flex').css('width','0px');
    }
});

/*-------z-tree-------*/
var setting = {
    edit: {
        enable: true,
        showRemoveBtn: false,
        showRenameBtn: false
    },
    data: {
        simpleData: {
            enable: true
        }
    }
};

var zNodes =[
    { id:1, pId:0, name:"随意拖拽 1", open:true},
    { id:11, pId:1, name:"随意拖拽 1-1"},
    { id:12, pId:1, name:"随意拖拽 1-2", open:true},
    { id:121, pId:12, name:"随意拖拽 1-2-1"},
    { id:122, pId:12, name:"随意拖拽 1-2-2"},
    { id:123, pId:12, name:"随意拖拽 1-2-3"},
    { id:13, pId:1, name:"禁止拖拽 1-3", open:true, drag:false},
    { id:131, pId:13, name:"禁止拖拽 1-3-1", drag:false},
    { id:132, pId:13, name:"禁止拖拽 1-3-2", drag:false},
    { id:133, pId:13, name:"随意拖拽 1-3-3"},
    { id:2, pId:0, name:"随意拖拽 2", open:true},
    { id:21, pId:2, name:"随意拖拽 2-1"},
    { id:22, pId:2, name:"禁止拖拽到我身上 2-2", open:true, drop:false},
    { id:221, pId:22, name:"随意拖拽 2-2-1"},
    { id:222, pId:22, name:"随意拖拽 2-2-2"},
    { id:223, pId:22, name:"随意拖拽 2-2-3"},
    { id:23, pId:2, name:"随意拖拽 2-3"}
];

function showIconForTree(treeId, treeNode) {
    return !treeNode.isParent;
};

$(document).ready(function(){
    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
});
/*-------z-tree-------*/