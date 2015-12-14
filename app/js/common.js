$.fn.extend({
    dialog:function(){
        $(this).click(function(){            
            $('.data-dia').prepend("<div class='fix'></div>");
            var r = $(this).data('role');
            var d = $(r);
            d.fadeIn();
            $('.data-dia').css('display', 'flex');
            $('.fix,.close_log').on('click', function () {
                d.fadeOut();
                setTimeout(function () {
                    $('.fix').detach();
                }, 500)
            });
        })
    }
})
$('.header ul li a').click(function(){
    console.log(this)
})