var u = 'url(images/common.png)';
$(window).resize(function () {
    $.fn.setsideBarHeigh('#section', 111);
});
$(document).ready(function () {
    /*显示/隐藏下拉菜单*/
    $.fn.showList('#sysInfo', [{'name': '商家信息', 'url': 'javascript:;'}, {
        'name': '帐号管理',
        'url': 'javascript:;'
    }, {'name': '第三方接入', 'url': 'javascript:;'}]);

    /*
     *arguments 左边导航栏传递列表数据格式
     *u 设置为变量，为导航菜单雪碧图路径
     */
    $.fn.sideBar('#sidebar', [{
        'name': '首页',
        'links': 'index',
        'bg': u,
        'list': ''
    },
        {
            'name': '运营',
            'links': 'operation',
            'bg': u + ' 0px -64px',
            'list': [{
                'name': '运营模块',
                'links': 'Coupons',
                'list': [{'name': '优惠券', 'bg': u + ' 0px -165px', 'href': '#'}]
            }
            ]
        },
        {
            'name': '电商',
            'links': 'ec',
            'bg': u + ' 0px -96px',
            'list': [{
                'name': '电商1',
                'links': 'ec1',
                'list': [{'name': '优惠券1', 'bg': u + ' 0px -165px', 'href': '#'}, {
                    'name': '优惠券3',
                    'bg': u + ' 0px -165px',
                    'href': '#'
                }]
            }
            ]
        },
        {
            'name': '门店',
            'links': 'store',
            'bg': u + ' 0px -128px',
            'list': [{
                'name': '门店1',
                'links': 'store1',
                'list': [{'name': '优惠券1', 'bg': u + ' 0px -165px', 'href': '#'}, {
                    'name': '优惠券3',
                    'bg': u + ' 0px -165px',
                    'href': '#'
                }]
            }, {
                'name': '门店2',
                'links': 'store2',
                'list': [{'name': '优惠券2', 'bg': u + ' 0px -165px', 'href': '#'}]
            }, {
                'name': '门店3',
                'links': 'store3',
                'list': ''
            }
            ]
        },
        {
            'name': '客流',
            'links': 'custom',
            'bg': u + ' 0px -32px',
            'list': [{
                'name': '客户',
                'links': 'youhuiquan',
                'list': [{'name': '优惠券1', 'bg': u + ' 0px -165px', 'href': '#'}, {
                    'name': '优惠券3',
                    'bg': u + ' 0px -165px',
                    'href': '#'
                }]
            }, {
                'name': '管理',
                'links': 'kehuguanli',
                'list': [{'name': '优惠券2', 'bg': u + ' 0px -165px', 'href': '#'}]
            }
            ]
        }]);

});

/*
 *导航菜单
 *obj 前台只需要<div id="sidebar" class="clearfix"></div>将id值作为参数，会在该div下创建菜单栏
 *_data 将导航菜单以json数据保存为参数传递，自动生成一级，二级，三级菜单
 */
$.fn.extend({
    sideBar: function (obj, _data) {
        if (_data.length > 0) {
            $(obj).append('<ul class="first_lev" id="first_lev"></ul>');
            for (var i = 0, ii = _data.length; i < ii; i++) {
                $('#first_lev').append('<li class="fir_li" data-link=' + _data[i].links + '><a style="background:' + _data[i].bg + ' ;"></a><span>' + _data[i].name + '</span></li>');
                if (_data[i].list.length > 0) {
                    var html;
                    html = '<ul class="second_lev" id=' + _data[i].links + ' style="display:none;">';
                    for (var k = 0, kk = _data[i].list.length; k < kk; k++) {
                        html += '<li class="sec_li" data-link="' + _data[i].list[k].links + '"><span>' + _data[i].list[k].name + '</span><a class="arrow"></a>';
                        if (_data[i].list[k].list.length > 0) {
                            if (k == 0) {
                                html += '<ul class="third_lev" id="' + _data[i].list[k].links + '">';
                            } else {
                                html += '<ul class="third_lev" id="' + _data[i].list[k].links + '"  style="display: none;">';
                            }
                            for (var y = 0, yy = _data[i].list[k].list.length; y < yy; y++) {
                                html += '<li class="thir_li"><span style="background:' + _data[i].list[k].list[y].bg + ';"></span><a href="' + _data[i].list[k].list[y].href + '">' + _data[i].list[k].list[y].name + '</a></li>';
                            }
                            html += '</ul>';
                        }
                    }
                    html += '</ul>';
                    $(obj).append(html);
                }
            }
            $.fn.dropDown('.first_lev li', '.second_lev');
            $.fn.dropDown('.second_lev li', '.third_lev');
            $.fn.setsideBarHeigh('#section', 111);
        }
    },

    /*
     *展开下级菜单
     *obj 点击的对象
     *target 显示的对象
     */
    dropDown: function (obj, target) {
        $(obj).on('click', function () {
            var id = $(this).data('link');
            $(target).css('display', 'none');
            $('#' + id).css('display', 'block');
            if ($('#section')) {
                $.fn.setSectionMargin('#sidebar', '#section', 80, 220);
            }
        })
    },

    /*设置左边栏的高度*/
    setsideBarHeigh: function (obj, val) {
        var h = $(window).height() - val;
        var ch = $(obj).height();
        console.log(ch);
        if (ch < h) {
            $('.first_lev,.second_lev').css('height', h + 'px');
        } else {
            $('.first_lev,.second_lev').css('height', ch + 'px');
        }
    },

    /*设置target的左边距*/
    setSectionMargin: function (obj, target, first_left, sec_left) {
        if ($(obj).width() > first_left) {
            $(target).css('margin-left', sec_left + 'px')
        } else {
            $(target).css('margin-left', first_left + 'px');
        }
    },

    /*
     *显示页头系统设置显示/隐藏下拉单功能
     *obj 要实现的目标id
     *data 显示/隐藏下拉菜单的链接列表
     */
    showList: function (obj, data) {
        $(obj).on('mouseover', function () {
            $(this).find('.sys_tips').show();
        }).on('mouseout', function () {
            $(this).find('.sys_tips').hide();
        })
        if (data.length > 0) {
            var list = '';
            for (var i = 0, ii = data.length; i < ii; i++) {
                list += '<li><a href="' + data[i].url + '" target="blank">' + data[i].name + '</a></li>'
            }
            ;
            $(obj).find('.sys_list').append(list);
        }
    },
});


function dialog(obj) {
    var r = $(obj).data('role');
    var d = $("#" + r + "");
    d.prepend("<div class='fix'></div>");
    d.fadeIn();
    d.css('display', 'flex');
    $('#'+r+' .fix,#'+r+' .close_log').on('click', function () {
        console.log(d);
        d.fadeOut();
        setTimeout(function () {
            $('#'+r+' .fix').detach();
        }, 500)
    });
}


//------------drag----------------
var event = document.addEventListener();
$('.drag_list li').mousedown(function () {
    console.log(event);
    $(this).css('background', '#333');
});
$('.drag_list li').mousemove(function () {
    console.log($(this))
});
$('.drag_list li').mouseup(function () {
    $(this).css('background', '#fff');
});

