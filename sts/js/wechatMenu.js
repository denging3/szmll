/**
 * 微信接入菜单js
 * Created by jiangcheng on 2015/12/14.
 */
/**
 * 获取图文信息模板
 */
function getModelTypes(){
    var mchId = "111";
    $.ajax({
        url:"searchModelTypes",
        type:"POST",
        dataType:"json",
        async:false,
        data:{"mchId":mchId},
        success:function(result){
            if(result!=null){
                $("#js_check_cate").empty();
                //展示模块类型
                $.each(result,function(i,n){
                    //默认展示第一个
                    if(i==0){
                        $("#js_check_cate").append("<li><a  class=\"active\" href='javascript:;' onclick=\"getModels('"+mchId+"', '"+n.modelType+"');\">"+ n.modelType+"<span class=\"arrowl arrow_out\"></span></a></li>");
                        //展示模块名称
                        getModels(mchId, n.modelType);
                    }else{
                        $("#js_check_cate").append("<li><a href='javascript:;' onclick=\"getModels('"+mchId+"', '"+n.modelType+"');\">"+ n.modelType+"<span class=\"arrowl arrow_out\"></span></a></li>");
                    }

                });
            }
        }
    });
}
/**
 * 根据商家号以及接口获得图文信息
 * @param mchId 商户id
 * @param modelVisit  访问路径
 */
function getPicMessages(mchId,modelVisit){
    $.ajax({
        url:modelVisit,
        type:"POST",
        dataType:"json",
        async:false,
        data:{"mchId":mchId},
        success:function(obj){
            if(obj!=null){
                $("#js_check_cont").empty();
                $.each(obj,function(i,p){
                    $("#js_check_cont").append("<li data-list='"+ p.systemId+"' data-url='"+ p.url+"' data-msg='"+p.msg+"' data-largeurl='"+ p.largePicUrl+"' data-smallurl='"+ p.picUrl+"'><span></span><img src='"+ p.picUrl+"' alt=\"\"/><p>"+ p.title+"</p></li>");
                });
                $('.demo_info span').on('click',function(){
                    $(this).toggleClass('img_check');
                });
                $('.demo_info span').check_list('click');

                $('.tab_menu li a').on('click',function(){
                    $(this).parent().siblings().find('a').removeClass('active');
                    $(this).addClass('active');
                })
                backChecked();
            }
        }
    });
}
/**
 * 根据商家id和模板类型获取模板信息及图文信息
 * @param mchId 商户id
 * @param modelType 模板类型
 */
function getModels(mchId,modelType){
    $.ajax({
        url:"searchModels",
        type:"POST",
        dataType:"json",
        async:false,
        data:{"mchId":mchId,"modelType": modelType},
        success:function(data){
            if(data!=null){
                $("#js_check_model").empty();
                $.each(data,function(j,o){
                    //默认展示第一个
                    if(j==0){
                        $("#js_check_model").append("<li class=\"check_modal\" onclick=\"getPicMessages('"+mchId+"','"+ o.modelVisit+"')\"><img src='"+ o.modelPicUrl+"' alt=\"\"/><p>"+ o.modelName+"</p><span></span></li >");
                        //加载图文信息
                        getPicMessages(mchId,o.modelVisit);
                    }else{
                        $("#js_check_model").append("<li class=\"check_modal\" onclick=\"getPicMessages('"+mchId+"','"+ o.modelVisit+"')\"><img src='"+ o.modelPicUrl+"' alt=\"\"/><p>"+ o.modelName+"</p><span></span></li >");
                    }
                });

            }
        }
    });
}

/**
 *图文模块
 */
function getPicModelTypes(){
    var mchId = "111";
    $.ajax({
        url:"searchPicModelTypes",
        type:"POST",
        dataType:"json",
        async:false,
        data:{"mchId":mchId},
        success:function(result){
            if(result!=null){
                //展示模块类型
                $.each(result,function(i,n){
                    //默认展示第一个
                    if(i==0){
                        $("#js_check_cate").append("<li><a  class=\"active\" href='javascript:;' onclick=\"getPicModels('"+mchId+"', '"+n.modelType+"');\">"+ n.modelType+"<span class=\"arrowl arrow_out\"></span></a></li>");
                        //展示模块名称
                        getPicModels(mchId, n.modelType);
                    }else{
                        $("#js_check_cate").append("<li><a href='javascript:;' onclick=\"getPicModels('"+mchId+"', '"+n.modelType+"');\">"+ n.modelType+"<span class=\"arrowl arrow_out\"></span></a></li>");
                    }
                });
            }

        }
    });
}
/**
 * 根据商家号以及接口获得图文链接
 * @param mchId 商户id
 * @param modelType  图文类型
 * @param modelName  模块名称
 */
function getPicUrlMessages(mchId,modelType,modelName){
    $.ajax({
        url:"searchPicModelsByName",
        type:"POST",
        dataType:"json",
        async:false,
        data:{"mchId":mchId,"modelType":modelType,"modelName":modelName},
        success:function(obj){
            if(obj!=null){
                $("#js_check_cont").empty();
                $.each(obj,function(i,p){
                    $("#js_check_cont").append("<li data-list='"+ p.id+"' data-url='"+ p.url+"'><span></span><img src='"+ p.modelPicUrl+"' alt=\"\"/><p>"+ p.modelPicName+"</p></li>");
                });
                /*图文链接使用*/
                $('.demo_info span').on('click',function(){
                    $('.img_check').removeClass('img_check');
                    $(this).addClass('img_check');
                });
            }
        }
    });
}
/**
 * 根据商家id和模板类型获取模板信息及图文信息
 * @param mchId 商户id
 * @param modelType 模板类型
 */
function getPicModels(mchId,modelType){
    $.ajax({
        url:"searchPicModels",
        type:"POST",
        dataType:"json",
        async:false,
        data:{"mchId":mchId,"modelType": modelType},
        success:function(data){
            if(data!=null){
                $("#js_check_model").empty();
                $.each(data,function(j,o){
                    //默认展示第一个
                    if(j==0){
                        $("#js_check_model").append("<li class=\"check_modal\" onclick=\"getPicUrlMessages('"+mchId+"','"+modelType+"','"+ o.modelName+"')\"><img src='"+ o.modelPicUrl+"' alt=\"\"/><p>"+ o.modelName+"</p><span></span></li >");
                        //加载图文链接
                        getPicUrlMessages(mchId,modelType, o.modelName);
                    }else{
                        $("#js_check_model").append("<li class=\"check_modal\" onclick=\"getPicUrlMessages('"+mchId+"','"+modelType+"','"+ o.modelName+"')\"><img src='"+ o.modelPicUrl+"' alt=\"\"/><p>"+ o.modelName+"</p><span></span></li >");
                    }
                });
            }
        }
    });
}
/**
 * 发送信息时的key值
 */
function getMenuKey(){
    var key = "";
    $.ajax({
        url:"getKey",
        dataType:"json",
        type:"POST",
        async:false,
        success:function(data){
            if(data.code==0){
                //写入key数据
                //data.key;
                key = data.key;
            }
        }
    });
    return key;
}

/*
 * 回显
 */
function backChecked(){
    var originData = [];
    $('.demo_list div').each(function(i){
        originData.push($(this).data('list'));
    })
    if(originData.length >0){
        for(var i=0,ii=originData.length;i<ii;i++){
            $(".demo_main_info li").each(function(i){
                if($(this).data('list') == originData[i]){
                    $(this).find('span').attr('class','img_check');
                }
            })
        }
    }
}