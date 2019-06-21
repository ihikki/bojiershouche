$(function(){
    $(".phonebook .btn").click(function(){
        var reg=/^(1([358]\d|4[579]|66|7[0135678]|9[89])\d{8})$/;
        if(reg.test($(".phonebook .form-control").val())){
            alert("正在安排客服向您致电，请留意您的电话")
        }
        else{
            alert("电话格式错误")
        }
    })
    //估价跳转
    function togujia(){
        $(".navlist li").eq(2).click(function(){
            console.log($(".uc a").eq(0).text())
            if($(".uc a").eq(0).text()=="登录")
            alert("请先登录后再进行评估")
        })
    }
    togujia()
})