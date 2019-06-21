window.onload=function(){
    window.scrollTo(0,0);
    //封装获取对象方法
    function $(str){
        if(str.charAt(0)=="."){
            //如果传入类名
            var className = str.slice(1);//获取类名
            var arr = [];//arr用于存放符合指定类名的元素
            var all = document.getElementsByTagName('*');//all是所有标签的集合
            for(var i=0;i<all.length;i++){
                if(!all[i].className){
                    continue;
                }
                var classNameArr = all[i].className.split(" ");
                //console.log(classNameArr)
                //判断你传入的类名是否在该classNameArr集合中，如果在，说明该元素是符合条件的
                for(var j=0;j<classNameArr.length;j++){
                    if(classNameArr[j]==className){
                        arr.push(all[i]);
                        break;
                    }
                }

            }
            return arr;
        }else if(str.charAt(0)=="#"){
            //如果传入ID
            return document.getElementById(str.slice(1));
        }else{
            //如果你传入标签
            return document.getElementsByTagName(str);
        }
    }
    //封装获取样式
    function getStyle(obj, str) {
        if (window.getComputedStyle) {
            return window.getComputedStyle(obj, null)[str]
        }
        else {
            return obj.currentStyle[str];
        }
    }
    //封装自定义动画
function animation(obj, json,fn) {
        clearInterval(obj.timer);

        obj.timer = setInterval(function () {
            var flag = true;
            for (var key in json) {
                var target = parseInt(json[key]);
                if (key == "opacity") {
                    var now = getStyle(obj, "opacity") * 100;
                }
                else {
                    var now = parseInt(getStyle(obj, key))
                }
                var speed = (target - now) / 10;

                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                now = now + speed;

                if (key == "opacity") {
                    obj.style.opacity = now / 100;
                    obj.style.filter = "alpha(opacity=" + now + ")";
                }
                else if (key == "zIndex") {
                    obj.style.zIndex = target;
                }
                else {
                    obj.style[key] = now + "px";
                }

                if (target != now) {
                    flag = false;
                }

            }
            if (flag) {
                clearInterval(obj.timer);
                if (fn) {
                    fn()
                }
            }
        },20)
    }
    //封装动画方法2
    function animation2(obj, json,time,fn) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var flag = true;
            for (var key in json) {
                var target = parseInt(json[key]);

                if (key == "opacity") {
                    var now = getStyle(obj, "opacity") * 100;
                }
                else {
                    var now = parseInt(getStyle(obj, key))
                }

                var speed = (target - now) / 10;

                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                now = now + speed;

                if (key == "opacity") {
                    obj.style.opacity = now / 100;
                    obj.style.filter = "alpha(opacity=" + now + ")";
                }
                else if (key == "zIndex") {
                    obj.style.zIndex = target;
                }
                else {
                    obj.style[key] = now + "px";
                }

                if (target != now) {
                    flag = false;
                }

            }
            if (flag) {
                clearInterval(obj.timer);
                if (fn) {
                    fn()
                }
            }
        },time)
    }
    //封装获取滚动距离
    function scroll(){
        return{
            left:document.body.scrollLeft+document.documentElement.scrollLeft,
            top:document.body.scrollTop+document.documentElement.scrollTop
        }
    }
    //封装添加类名
    function addClass(obj,cls) {
        var obj_class=obj.className,//获取class的内容；
        blank = ( obj_class != '' ) ? ' ' : '';//判断获取的class是否为空，如果不为空，则添加空格；
        added = obj_class + blank + cls;//组合原来的class和需要添加的class，中间加上空格；
        obj.className = added;//替换原来的class；
    }
    //封装移除类名
    function removeClass(obj,className,fn) {
           //先判断obj是不是有className
           if (obj.className != '') {
               var arrClassName = obj.className.split(' ');
               var classIndex = arrIndexOf(arrClassName, className);
               if (classIndex!==-1) {
                   arrClassName.splice(classIndex, 1);
                   obj.className = arrClassName.join(' ');
               }
           }
           if(fn){fn();}
       }
    //封装是否有包含给定字符串
       function arrIndexOf(arr, v) {
           for (var i = 0; i < arr.length; i++) {
               if (arr[i] == v) {
                   return i;
               }
           }
           return -1;
       }

    var topheader=$("#topheader");
    var backtop=$(".fix-icon-backtop")[0];
    //浏览器滚动事件（顶部改变，返回顶部）
    window.onscroll=function(){
        var alreadyscroll=scroll().top;
        
        if(alreadyscroll>70){
           animation(topheader,{top:0});
        }
        else if(alreadyscroll<=70){
            animation(topheader,{top:-70});
        }
        if(alreadyscroll>400){
            backtop.style.display="block";
        }
        else if(alreadyscroll<=400){
            backtop.style.display="none"
        }
    }
    backtop.onclick=function(){
        window.scrollTo(0,0);
    }


    var indexCarList=$(".index-carlist")[0].children;
    var indexCarListBox=$(".index-carlist-box");
    var MainCarList=$(".carlist");
    //热卖车型json
        var carListJson=[
            //猜你喜欢
            {car1:{
                Value1:"./img/car1.jpg",
                Value2:"丰田RAV4 2015款 2.0L CVT两驱风尚版",
                Value3:"2016年",
                Value4:"2.2万公里",
                Value5:"15.80",
                TEMP1:"",
                TEMP2:"<i class='i-red'>急售</i><em class='line-through'>21.70万</em>",
                TEMP3:"<em class='icon-sale'>急降<br><span>1</span>万</em>"
            },
            car2:{
                Value1:"./img/car2.jpg",
                Value2:"日产 奇骏 2012款 2.0L CVT舒适版 4WD",
                Value3:"2013年",
                Value4:"10.3万公里",
                Value5:"8.80",
                TEMP1:"",
                TEMP2:"<i class='i-orange'>超值</i><em class='line-through'>23.60万</em>",
                TEMP3:""
            }
            },
             //严选车
            {car1:{
                Value1:"./img/car3.jpg",
                Value2:"大众 宝来 2013款 1.6L 自动舒适型",
                Value3:"2013年",
                Value4:"8.5万公里",
                Value5:"6.75",
                TEMP1:"<span class='icon-pad'>|</span>店内直卖",
                TEMP2:"<i class='i-red'>急售</i><i class='i-blue'>严选车</i><em class='line-through'>21.70万</em>",
                TEMP3:"<em class='icon-sale'>急降<br><span>2400</span>元</em><em class='transfer-city'>东莞过户</em>"
            }
            },
            //最新上架
            {car1:{
                Value1:"./img/car4.jpg",
                Value2:"大众 途观 2015款 1.8TSI 自动两驱舒适版",
                Value3:"2016年",
                Value4:"4.0万公里",
                Value5:"14.00",
                TEMP1:"<span class='icon-pad'>|</span>到店服务",
                TEMP2:"<i class='i-orange'>超值</i><em class='line-through'>21.70万</em>",
                TEMP3:"<em class='icon-new'>新上架</em>"
            }
            },
            //降价急售
            {car1:{
                Value1:"./img/car5.jpg",
                Value2:"比亚迪 唐新能源 2015款 2.0T 四驱旗舰型",
                Value3:"2015年",
                Value4:"6.1万公里",
                Value5:"10.71",
                TEMP1:"<span class='icon-pad'>|</span>到店服务",
                TEMP2:"<i class='i-orange'>超值</i><i class='i-red'>急售</i><i class='i-orange'>严选车</i>",
                TEMP3:"<em class='icon-sale'>急降<br><span>1.88</span>万</em>"
            }

            },
            //准新车
            {car1:{
                Value1:"./img/car6.jpg",
                Value2:"江淮 瑞风M4 2018款 2.0L 手动速运版",
                Value3:"2018年",
                Value4:"0.6万公里",
                Value5:"7.79",
                TEMP1:"<span class='icon-pad'>|</span>到店服务",
                TEMP2:"<i class='i-green'>准新车</i><i class='i-blue'>严选车</i><em class='line-through'>10.80万</em>",
                TEMP3:"<em class='icon-new'>新上架</em>"
            }

            },
            //练手车
            {car1:{
                Value1:"./img/car7.jpg",
                Value2:"吉利 经典帝豪 2013款 两厢 1.8L CVT精英型",
                Value3:"2014年",
                Value4:"7.9万公里",
                Value5:"3.36",
                TEMP1:"<span class='icon-pad'>|</span>店内直卖",
                TEMP2:"<i class='i-orange'>超值</i><i class='i-blue'>严选车</i><em class='line-through'>9.70万</em>",
                TEMP3:"<em class='icon-new'>新上架</em>"
            }

            },
            //SUV
            {car1:{
                Value1:"./img/car8.jpg",
                Value2:"Jeep 自由客 2012款 2.4 运动版(进口)",
                Value3:"2012年",
                Value4:"9.1万公里",
                Value5:"9.80",
                TEMP1:"<span class='icon-pad'>|</span>到店服务",
                TEMP2:"<i class='i-blue'>严选车</i><em class='line-through'>26.70万</em>",
                TEMP3:""
            }

            }
        ]


    //选项卡-根据上方json添加选项卡车辆元素
    for(var ee=0;ee<carListJson.length;ee++)
    {
        var temp=carListJson[ee];
        for(var key in temp){
        addMainCarList(MainCarList[ee],temp[key]);
        }
    }
    //热卖车型-样式控制（外部选项）
    for(var Clindex=0;Clindex<indexCarList.length;Clindex++)
    {   indexCarList[Clindex].index=Clindex;
        indexCarList[Clindex].onmouseover=function(){
        for(var i=0;i<indexCarList.length;i++)
        {
            removeClass(indexCarList[i],"active");
            removeClass(indexCarListBox[i],"active");
        }
        addClass(indexCarList[this.index],"active");
        addClass(indexCarListBox[this.index],"active");
        }
    }
    //热卖车型-根据json添加车辆
    function addMainCarList(obj,Valuejson){
        var newli=document.createElement("li");
        newli.innerHTML="<a class='car-a'><img src='"+Valuejson.Value1+"'><div class='car-info'>"+
        "<h2 class='t'>"+Valuejson.Value2+"</h2>"+"<div class='t-i'>"+Valuejson.Value3+"<span class='icon-pad'>|</span>"+Valuejson.Value4+Valuejson.TEMP1+"</div>"
        +"<div class='t-price'><p>"+Valuejson.Value5+"<span>万</span></p>"+Valuejson.TEMP2+"</div>"
        +"</div>"+Valuejson.TEMP3+"</a>";
        obj.appendChild(newli);
    }
    var indexChannelCarlistJsonArr=[{
        li1:{imgUrl:"./img/esc1.png",carName:"两厢轿车",carPrice:"0.18万起"},
        li2:{imgUrl:"./img/esc2.png",carName:"三厢轿车",carPrice:"0.15万起"},
        li3:{imgUrl:"./img/esc3.png",carName:"跑车",carPrice:"2.38万起"},
        li4:{imgUrl:"./img/esc4.png",carName:"SUV",carPrice:"0.50万起"},
        li5:{imgUrl:"./img/esc5.png",carName:"MPV",carPrice:"0.72万起"},
        li6:{imgUrl:"./img/esc6.png",carName:"面包车",carPrice:"0.16万起"},
        li7:{imgUrl:"./img/esc7.png",carName:"皮卡",carPrice:"1.30万起"}
    }

    ,{
        li1:{imgUrl:"./img/esc3.png",carName:"跑车",carPrice:"9.68万起"},
        li2:{imgUrl:"./img/esc4.png",carName:"SUV",carPrice:"2.15万起"},
        li3:{imgUrl:"./img/esc5.png",carName:"MPV",carPrice:"2.50万起"},
        li4:{imgUrl:"./img/esc1.png",carName:"两厢轿车",carPrice:"2.44万起"},
        li5:{imgUrl:"./img/esc2.png",carName:"三厢轿车",carPrice:"2.38万起"},
        li6:{imgUrl:"./img/esc6.png",carName:"面包车",carPrice:"2.50万起"},
        li7:{imgUrl:"./img/esc7.png",carName:"皮卡",carPrice:"15.50万起"}
    }

    ,{
        li1:{imgUrl:"./img/sell1.png",carName:"宝马5系",carPrice:"成交价21.3万"},
        li2:{imgUrl:"./img/sell2.png",carName:"本田雅阁",carPrice:"成交价13.5万"},
        li3:{imgUrl:"./img/sell3.png",carName:"大众高尔夫",carPrice:"成交价6.8万"},
        li4:{imgUrl:"./img/sell4.png",carName:"奔驰GLK级",carPrice:"成交价22.9万"},
        li5:{imgUrl:"./img/sell5.png",carName:"雪佛兰迈锐宝",carPrice:"成交价7.3万"},
        li6:{imgUrl:"./img/sell6.png",carName:"马自达昂克赛拉",carPrice:"成交价8.66万"}
    }

    ,{
        li1:{imgUrl:"./img/jr1.png",carName:"5万内练手车",carPrice:"每天只需几十元"},
        li2:{imgUrl:"./img/jr2.png",carName:"工薪族最爱",carPrice:"月供只要1500"},
        li3:{imgUrl:"./img/jr3.png",carName:"SUV家庭代步首选",carPrice:"同首付，买辆宽敞的"},
        li4:{imgUrl:"./img/jr4.png",carName:"准新车",carPrice:"低首付高品质"},
        li5:{imgUrl:"./img/jr5.png",carName:"奔驰宝马开回家",carPrice:"首付不到五万元"},
        li6:{imgUrl:"./img/jr6.png",carName:"车主急售实惠",carPrice:"买得早不如刚刚好"}
    }
    ]
   
    var carList=$(".index-channel-carList");
    
    //选项卡-样式控制（内部车辆）
    for(var i=0;i<carList.length;i++){
    var tempJson=indexChannelCarlistJsonArr[i];
         for(var key in tempJson){
            var newLi=document.createElement("li");
            newLi.innerHTML="<img class='channel-carImg' src='"+tempJson[key].imgUrl+"'>"+
                        "<div class='channel-carName'>"+tempJson[key].carName+"</div>"+
                        "<div class='channel-carPrice'>"+tempJson[key].carPrice+"</div>"
            newLi.className="index-channel-carItem";
            carList[i].appendChild(newLi);
        }
    }

    
    var indexChannelNewLi=$(".index-channel-new")[0].children;
    var carBoxList=$(".index-channel-carBox");
    var carPriceColorArr=["color: #3cb46d!important","color: #ffa000!important","color: #ff3f00!important","color: #25b29d!important"]
    var listNowSign=0;
    var nowListindex=0;
   //选项卡-按钮样式控制
    for(var j=0;j<indexChannelNewLi.length;j++)
    {   indexChannelNewLi[j].index=j;

        indexChannelNewLi[j].onmouseover=function(){
            nowListindex=0;//为按钮服务的
            removeClass(iPrev,"on")
            removeClass(iNext,"on")
            listNowSign=this.index;
            var nowcarBoxLiList=carBoxList[listNowSign].children[0].children;
            if(nowcarBoxLiList.length<=6){
                removeClass(iNext,"on")
            }
            else{
                addClass(iNext,"on")
            }

            var carBoxindex=this.index;
            for(var i=0;i<indexChannelNewLi.length;i++){
                removeClass(indexChannelNewLi[i],"active");
                removeClass(carBoxList[i],"active");
            }
            addClass(this,"active");
            addClass(carBoxList[carBoxindex],"active");
            carBoxList[carBoxindex].children[0].setAttribute('style',carPriceColorArr[carBoxindex]);
    }
    }
    var iPrev=$("#prevI");
    var iNext=$("#nextI");
    //选项卡-按钮控制
    iPrev.onclick=function(){
        var nowcarBoxUlList=carBoxList[listNowSign].children[0];
        var nowcarBoxLiList=carBoxList[listNowSign].children[0].children;
        var liWeight=nowcarBoxLiList[0].offsetWidth+parseInt(getStyle(nowcarBoxLiList[0],"marginRight")) ;
        if(nowcarBoxLiList.length>6){
            if(nowListindex==0){
            }
            else {
                var target=parseInt(getStyle(nowcarBoxUlList,"left"))+liWeight;
                animation(nowcarBoxUlList,{left:target});
                    nowListindex--;
                if(nowListindex==0){
                    removeClass(this,"on")
                    addClass(iNext,"on")
                }
            }
        }

    }
    iNext.onclick=function(){
        var nowcarBoxUlList=carBoxList[listNowSign].children[0];
        var nowcarBoxLiList=carBoxList[listNowSign].children[0].children;
        var liWeight=nowcarBoxLiList[0].offsetWidth+parseInt(getStyle(nowcarBoxLiList[0],"marginRight")) ;
        if(nowcarBoxLiList.length>6){
        if(nowcarBoxLiList.length-nowListindex<=6){}
        else{
            var end=parseInt(getStyle(nowcarBoxUlList,"left"))-liWeight;
            animation(nowcarBoxUlList,{left:end});
                nowListindex++;
            if(nowcarBoxLiList.length-nowListindex<=6){
                removeClass(this,"on")
                addClass(iPrev,"on")
            }
        }
         }
    }
    //轮播图-内容json
    var SlideImgJsonArr=[
    {
        li4:"./img/buy-slide-1.jpg",
        li3:"./img/buy-slide-2.jpg",
        li2:"./img/buy-slide-3.jpg",
        li1:"./img/buy-slide-4.jpg"
    }
    ,
    {
        li4:"./img/sell-slide-1.jpg",
        li3:"./img/sell-slide-2.jpg",
        li2:"./img/sell-slide-3.jpg",
        li1:"./img/sell-slide-4.jpg"
    }
    ]
    var buyStepUl=$(".buy")[0];
    var sellStepUl=$(".sell")[0];
    var buyStepLi=buyStepUl.children;
    var sellStepLi=sellStepUl.children;
    var slideList=$(".slide-list")[0];
    var buysellflag=false;
    //添加轮播图（buystep）内容
   function addBuySlideLi() {
    for(var key in SlideImgJsonArr[0]){
        var newBuySlideLi=document.createElement("li");
        newBuySlideLi.style.backgroundImage="url("+SlideImgJsonArr[0][key]+")";
        newBuySlideLi.style.zIndex=parseInt(key.substring(2)) ;
        slideList.appendChild(newBuySlideLi);
    }
    buysellflag=false;
    }
    addBuySlideLi();
    //添加轮播图（sellstep）内容
    function addSellSlideLi(){
    for(var key in SlideImgJsonArr[1]){
        var newSellSlideLi=document.createElement("li");
        newSellSlideLi.style.backgroundImage="url("+SlideImgJsonArr[1][key]+")";
        newSellSlideLi.style.zIndex=parseInt(key.substring(2)) ;
        slideList.appendChild(newSellSlideLi);
    }
    buysellflag=true;
    }
    //移除轮播图内容
    function removeSlideLi(){
        slideList.innerHTML="";
    }
    var slideLiArr=slideList.children;
    var slideLiWidth=slideLiArr[0].offsetWidth;
    var cur=0;
    //给轮播图中的控制li绑定点击事件
    for(var t=0;t<slideLiArr.length;t++){
        buyStepLi[t].index=t;
        buyStepLi[t].onclick=changeslideLi;
    }
    //li绑定点击事件
    function changeslideLi(){
        var index=this.index;
        if(index>cur){
            slideLiArr[index].style.left=slideLiWidth+"px";
            slideLiArr[index].style.zIndex=0;
            slideLiArr[index].style.opacity=0;
            animation2(slideLiArr[index],{left:0,zIndex:10,opacity:100},6)
            animation2(slideLiArr[cur],{left:-slideLiWidth,zIndex:0,opacity:0},6)
        }
        if(index<cur){
            slideLiArr[index].style.left=-slideLiWidth+"px";
            slideLiArr[index].style.zIndex=0;
            slideLiArr[index].style.opacity=0;
            animation2(slideLiArr[index],{left:0,zIndex:10,opacity:100},6)
            animation2(slideLiArr[cur],{left:slideLiWidth,zIndex:0,opacity:0},6)
        }
        cur=index;
       light();
    }
    //轮播图-自动轮播
    var indexBuySellStep=$(".index-buy-sell-step")[0];
    clearInterval(indexBuySellStep.timer);
    indexBuySellStep.timer = setInterval(autoplay,2000);
    indexBuySellStep.onmouseover=function(){
        clearInterval(indexBuySellStep.timer);
    }
    indexBuySellStep.onmouseout=function(){
        clearInterval(indexBuySellStep.timer);
        indexBuySellStep.timer = setInterval(autoplay,2000);
    }

   var buyStep=$(".buy-step")[0];
   var sellStep=$(".sell-step")[0];
   var buycarStep=buyStepUl.parentNode;
   var sellcarStep=sellStepUl.parentNode;
    //轮播图-轮播图中的选项卡卖车流程触发时
   sellStep.onmouseover=function(){
        removeClass(sellStep,"active");
        removeClass(buyStep,"active");
        addClass(sellStep,"active");
        removeClass(sellcarStep,"active");
        removeClass(buycarStep,"active");
        addClass(sellcarStep,"active");
        clearInterval(indexBuySellStep.timer);
        removeSlideLi();
        addSellSlideLi();
        cur=0;
        light();
        for(var t=0;t<slideLiArr.length;t++){
            sellStepLi[t].index=t;
            sellStepLi[t].onclick=changeslideLi;
        }
   }
   //轮播图-轮播图中的选项卡买车流程触发时
   buyStep.onmouseover=function(){
    removeClass(buyStep,"active");
    removeClass(sellStep,"active");
    addClass(buyStep,"active");
    removeClass(buycarStep,"active");
    removeClass(sellcarStep,"active");
    addClass(buycarStep,"active");
    clearInterval(indexBuySellStep.timer);
    removeSlideLi();
    addBuySlideLi();
    cur=0;
    light();
    for(var t=0;t<slideLiArr.length;t++){
        sellStepLi[t].index=t;
        sellStepLi[t].onclick=changeslideLi;
    }
}
    //自动轮播
    function autoplay(){
        animation2(slideLiArr[cur],{left:-slideLiWidth,zIndex:0,opacity:0},6)
        cur=++cur>slideLiArr.length-1?0:cur;
        slideLiArr[cur].style.left=slideLiWidth+"px";
        animation2(slideLiArr[cur],{left:0,zIndex:10,opacity:100},6)
        light();
    }
    //点亮小圆点
    function light(){
        var obj=buysellflag==false?buyStepLi:sellStepLi;
        for(var i=0;i<obj.length;i++){
            removeClass(obj[i],"active");
        }
        addClass(obj[cur],"active");
    }
    //获取地理位置调用
    getPostion();
    //开启关闭登录注册模态框
    closemask();
    openmask();
    //登录跳转注册
    toreorlo();
    
    //注册
    regsit();
    //登录
    login()
    //评估跳转判定
    togujia()
//window.onload结束
}
//评估跳转判定方法
function togujia(){
    $(".navlist li").eq(2).click(function(){
        console.log($(".uc a").eq(0).text())
        if($(".uc a").eq(0).text()=="登录")
        alert("请先登录后再进行评估")
    })
    $(".navlist li").eq(8).click(function(){
        console.log($(".uc a").eq(0).text())
        if($(".uc a").eq(0).text()=="登录")
        alert("请先登录后再进行评估")
    })
}
//登录跳转注册方法
function toreorlo(){
    var toregist=document.querySelectorAll(".login_mask a")[0];
    var tologin=document.querySelectorAll(".login_mask a")[1];
    var loginPage=document.querySelector(".loginPAGE");
    var registPage=document.querySelector(".registPAGE");
    toregist.onclick=function(){
        loginPage.style.display="none";
        registPage.style.display="block";
    }
    tologin.onclick=function(){
        loginPage.style.display="block";
        registPage.style.display="none";
    }
}
//开启登录注册模态框方法
function openmask(){
    var openbtn1=document.querySelectorAll(".uc a")[0];
    var openbtn2=document.querySelectorAll(".uc a")[1];
    var loremask=document.querySelector(".login_mask");
    var fn=function(){
        loremask.style.display="block";
        document.body.style.overflow="hidden";
    }
    openbtn1.onclick=fn;
    openbtn2.onclick=fn;
}
//关闭登录注册模态框方法
function closemask(){
    var closebtn1=document.querySelector(".closelogin");
    var closebtn2=document.querySelector(".closeregist");
    var loremask=document.querySelector(".login_mask");
    closebtn1.addEventListener('click',function(){
        loremask.style.display="none";
        document.body.style.overflow="visible";
        for(var i=0;i<2;i++)
        $('.loginPAGE input').eq(i).val("");
    })
    closebtn2.addEventListener('click',function(){
        loremask.style.display="none";
        document.body.style.overflow="visible";
        $('input:radio[name="sex"]').prop('checked',false);
        for(var i=0;i<4;i++){
        $(".registPAGE input").eq(i).val("");
        }
    })
}
//获取地理位置方法
function getPostion(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(successCallback,errCallback)
    }
    function successCallback(pos){
        var lat=pos.coords.latitude;
        var lng=pos.coords.longitude;
        $.ajax({
            url:"http://apis.juhe.cn/geo/?key=7c3a1caa952e64ab219be43e8db54342&lat="+lat+"&lng="+lng+"&type=1",
            dataType:"jsonp",
            success:function(data){
                var con=$(data.result);
                con.each(function(index,item){
                   console.log("该位置是："+item.ext.city)
                   var citystr=item.ext.city.replace('市', '<i></i>')
                    $("#city span").eq(0).html(citystr);
                    $("#city span").eq(1).html(citystr);
                })
            }
        })
    }
    function errCallback(err){
        console.log(err);
        $.ajax({
            url:"http://apis.juhe.cn/geo/?key=7c3a1caa952e64ab219be43e8db54342&lat="+20.325+"&lng="+110.1156+"&type=1",
            dataType:"jsonp",
            success:function(data){
                console.log(data);
                var con=$(data.result);
                 console.log(con);
                con.each(function(index,item){
                    var citystr=item.ext.city.replace('市', '<i></i>')
                    $("#city span").eq(0).html(citystr);
                    $("#city span").eq(1).html(citystr);
                })
            }
        })
    }
}
//注册方法
function regsit(){
    $(".registPAGE input:submit").click(function(){
        var username=$("#phoneNum").val();
        var pwd=$("#rpassword").val();
        var cpwd=$("#checkpassword").val();
        var name=$("#xingshi").val();
        var sex=$('input:radio[name="sex"]:checked').val();
        var tip=$('.registPAGE p');
        var reg=/^(1([358]\d|4[579]|66|7[0135678]|9[89])\d{8})$/;
        if(!reg.test(username)){
            tip.css("display","block");
        }
        else if(pwd!=cpwd){
            tip.css("display","block");
        }
        else if(name.length>2){
            tip.css("display","block");
        }
        else if(!sex){
            tip.css("display","block");
        }
        else {
            tip.css("display","none");
            var regdata={
                "username":username,
                "pwd":pwd,
                "name":name,
                "sex":sex
            }
            console.log(sex)
            $.ajax({
                url:'http://127.0.0.1:3000/index/regist',
                data:regdata,
                dataType:"jsonp",
                success:function(data){
                    function fn(){
                        $('.registPAGE .successtip').fadeIn("slow").html(data);
                        $('input:radio[name="sex"]').prop('checked',false);
                        for(var i=0;i<4;i++){
                        $(".registPAGE input").eq(i).val("");
                        }
                        if(data=="注册成功2s后将返回首页")
                        setTimeout(function(){location.href = '/index'} ,2000);
                        else{
                            $('.registPAGE .successtip').fadeOut("slow");
                        }
                    }
                    fn()
                }
            })
        }
    })
}
//登录方法
function login(){
    $(".loginPAGE input:submit").click(function(){
        var username=$("#username").val();
        var pwd=$("#pwd").val();
        var logindata={
            "username":username,
            "pwd":pwd
        }
        $.ajax({
            url:'http://127.0.0.1:3000/index/login',
            data:logindata,
            dataType:"jsonp",
            success:function(data){
                if(data=="账号密码错误，请重新输入")
                $('.loginPAGE .successtip').fadeIn(1500).html(data).fadeOut("slow");
                else{
                $('.loginPAGE .successtip').fadeIn(1500).html("登录成功").fadeOut("slow");
                $('.uc').html(`<a href="/user">${data.username}</a><em>&nbsp;|&nbsp;</em><a href="#">注销</a>`)
                setTimeout(function(){
                $(".login_mask").css("display","none");
                document.body.style.overflow="visible";
                for(var i=0;i<2;i++)
                $('.loginPAGE input').eq(i).val("");
                location.href = '/index';
                },2000);
            }
            }
        });
    })
}


