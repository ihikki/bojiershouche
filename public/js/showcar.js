$(function(){
 //估价跳转
 function togujia(){
    $(".navlist li").eq(2).click(function(){
        console.log($(".uc a").eq(0).text())
        if($(".uc a").eq(0).text()=="登录")
        alert("请先登录后再进行评估")
    })
}
togujia()

$("#yuyue").click(function(){
        alert("正在安排客服向您致电，请留意您的电话")
})
})