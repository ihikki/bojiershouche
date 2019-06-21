$(function(){
    console.log(111);
    var newpagemess=$(".breadcrumb .active").text().trim();
    console.log(newpagemess.trim())
    if(newpagemess=="我的预约"){
        for(var i=0;i<3;i++){
        $(".user_menu li a").eq(i).removeClass("active");
        }
        $(".user_menu li a").eq(0).addClass("active");
    }
    else if(newpagemess=="我在卖的车"){
        for(var i=0;i<3;i++){
        $(".user_menu li a").eq(i).removeClass("active");
        }
        $(".user_menu li a").eq(1).addClass("active");
    }
    else if(newpagemess=="个人信息"){
        for(var i=0;i<3;i++){
        $(".user_menu li a").eq(i).removeClass("active");
        }
        $(".user_menu li a").eq(2).addClass("active");
    }
})