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
    $('#map').load('page/map.html');
    $('.right_flex').load('page/right_flex.html');
    $('.dialog_new_store').load('page/new_stroe.html');
    $('.pro_store').load('page/pro_store.html');
});

$('.tab_menu ul li a').on('click', function () {
    var tar = $(this).data('role');
    for (var i = 0; i < Arr.length; i++) {
        $("#" + Arr[i]).hide();
    }
    $('#' + tar).show();
    $('.tab_menu ul li').removeClass('act');
    $(this).parent().addClass('act');
    $('#map_info').load('page/map_info.html');
});



