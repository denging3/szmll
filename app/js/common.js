$.fn.extend({
    dialog: function () {
        $(this).click(function () {
            var r = $(this).data('role');
            var d = $(r);
            console.log($(r));
            $(r).prepend("<div class='fix'></div>");
            d.fadeIn();
            $(r).css('display', 'flex');
            $('.fix,.close_icon').on('click', function () {
                d.fadeOut();
                setTimeout(function () {
                    $('.fix').detach();
                }, 500)
            });
        })
    },
    tab_list:function(obj){
        console.log(obj.setting)
        $(obj.setting.tabParentNode).click(function(){
            var i = $(this).index() +1;
            $(obj.setting.tabParentNode).removeClass('active');
            $(this).addClass('active');
            $(obj.setting.tabParentNode).find('span').addClass('on');
            $(obj.setting.tabNode).removeClass('on');
            $(obj.setting.contentNode).empty();
            $(obj.setting.contentNode).creatStamps(i,obj.setting.data);
        })
    },
    creatStamps: function (cc_type,data) {
        var node = this;
        $(data).each(function(i){
            if(this.cardState == cc_type){
                $(this).chick_State(node,this,data[i]);
            }
        })
        $('.stamp_bg').tipStamp();
    },
    chick_State:function(node,type,data){
        if(type.ccType==1){
            $(node).append(
                "<div class='stamp_bg bg1'>"+
                "<div class='stamp_title'>"+
                "<i></i>"+
                "<p>"+type.ccDisplayName+"</p>"+
                "</div>"+
                "<div class='stamp_info'>"+
                "<p><span>9.5</span>折</p>"+
                "<span class='line'></span>"+
                "<div class='list'>"+
                "<h3>"+type.ccName+"</h3>"+
                "<h4>领取后1天生效，有效期30天</h4>"+
                "</div>"+
                "</div>"+
                "</div>"
            )
        }else if(type.ccType==2){
            $(node).append(
                "<div class='stamp_bg bg2'>"+
                "<div class='stamp_title'>"+
                "<i></i>"+
                "<p>"+type.ccDisplayName+"</p>"+
                "</div>"+
                "<div class='stamp_info'>"+
                "<p><img src='images/bag.png' alt='礼物'/></p>"+
                "<span class='line'></span>"+
                "<div class='list'>"+
                "<h3>"+type.ccName+"</h3>"+
                "<h4>领取后1天生效，有效期30天</h4>"+
                "</div>"+
                "</div>"+
                "</div>"
            )
        }else if(type.ccType==3){
            $(node).append(
                 "<div class='stamp_bg bg3'>"+
                "<div class='stamp_title'>"+
                "<i></i>"+
                "<p>"+type.ccDisplayName+"</p>"+
                "</div>"+
                "<div class='stamp_info'>"+
                "<p><span>9999</span>元</p>"+
                "<span class='line'></span>"+
                "<div class='list'>"+
                "<h3>"+type.ccName+"</h3>"+
                "<h4>领取后1天生效，有效期30天</h4>"+
                "</div>"+
                "</div>"+
                "</div>"
            )
        }
    },
    tipStamp:function(data){
        $(this).click(function(e){
            $('.stamp_bg').css('margin-bottom','30px');
            $(this).css('margin-bottom','0px');
            $(this).toggleClass('open_info');
            $('.content_made,.info_list').remove();
            if($(this).hasClass('open_info')){
                $(this).after(
                    "<div class='content_made'>"+
                    "<span></span>"+
                    "<h4>mll15613213546</h4>"+
                    "<h5>将本页展示给店员即可使用</h4>"+
                    "</div>"+
                    "<div class='info_list mar-top'>"+
                    "<ul>"+
                    "<li class='info_content' data-role='#info_content'>使用说明<span class='info_list_right'></span></li>"+
                    "<li class='applicable_stores' data-role='#applicable_stores'>适用门店<span class='info_list_right'></span></li>"+
                    "<li class='consumer' data-role='#consumer'>客服电话<span class='info_list_right'></span></li>"+
                    "</ul>"+
                    "</div>"
                );
                $('.info_content').dialog();
                $('.applicable_stores').dialog();
                $('.consumer').dialog();
            }else{
                $('.content_made,.info_list').remove();
                $('.stamp_bg').css('margin-bottom','30px');
            }
            // e.stopImmediatePropagation();
        })
    }
})


