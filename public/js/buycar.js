
window.onload=function(){
    //分页
    var nowpage=1;
    var pageSize=8;
    ajaxAddCar(1,8)
    getPostion()
    
     new Page({
        id: 'pagination',
        pageTotal: 10, //必填,总页数
        pageAmount: 8,  //每页多少条
        dataTotal: 100, //总共多少条数据
        curPage:1, //初始页码,不填默认为1
        pageSize: 5, //分页个数,不填默认为5
        showPageTotalFlag:true, //是否显示数据统计,不填默认不显示
        showSkipInputFlag:true, //是否支持跳转,不填默认不显示
        getPage: function (page) {
            //获取当前页数
           console.log(page);
           nowpage=page;
           pageSize=this.pageAmount;
           
           ajaxAddCar(nowpage,pageSize,cursorttype)
        }
    })
    //位置
    function getPostion(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(successCallback,errCallback)
        }
        function successCallback(pos){
            console.log(pos.coords.latitude);
            console.log(pos.coords.longitude);
            var lat=pos.coords.latitude;
            var lng=pos.coords.longitude;
            $.ajax({
                url:"http://apis.juhe.cn/geo/?key=7c3a1caa952e64ab219be43e8db54342&lat="+lat+"&lng="+lng+"&type=1",
                dataType:"jsonp",
                success:function(data){
                    console.log(data);
                    var con=$(data.result);
                     console.log(con);
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
    //根据页数加载车辆
    function ajaxAddCar(nowpage,pageSize,sorttype,onsearch){
        var query=getSearchStr();
        if(JSON.stringify(query)=="{}"){
            query={chose1:'',chose2:'',chose3:'',chose4:'',chose5:''}
        }
        if(onsearch==1){
            var searchstr=$(".search input[type='text']").val().trim();
            var sstrarr=searchstr.split(" ")
            query.chose1=sstrarr[0];
            if(sstrarr[1])
            query.chose2=sstrarr[1];
        }
        
        $.ajax({
            url:"http://127.0.0.1:3000/buycar/carlist",
           data:{page:nowpage,pageSize:pageSize,querystr:query,sorttype:sorttype},
           dataType:"jsonp",
        //    beforeSend:function(){
        //        //当准备请求数据的时候,btn设置成加载中
        //        $('.btn').addClass('loading').html('正在加载中');
        //    },
           success:function(data){
               if(data.length==0){
                   alert('暂无无该类车辆')
               }
               //然后根据请求到的数据结合模板变成html字符串
            console.log(data)
            //新上架排序处理
            var carListJson=[];
                if(sorttype==1){
                    for(var i=0;i<data.length;i++){
                        if(data[i].sellsign!="新上架"){
                            carListJson.push(data[i])
                            console.log(111)
                        }
                        else{
                            carListJson.unshift(data[i])
                        }
                    }
                    console.log(data)
                }else{
                    carListJson=data;
                }
                
               function addCar(carListJson){
                var MainCarList=$(".carlist").eq(0);
                MainCarList.html("");
                for(var i=0;i<carListJson.length;i++)
                {
                    var temp=carListJson[i];
                    addMainCarList(MainCarList,temp);
                }
                function addMainCarList(obj,Valuejson){
                    var newli=document.createElement("li");
                    //TEMP1数据处理
                    if(Valuejson.exserve) Valuejson.TEMP1="<span class='icon-pad'>|</span>"+Valuejson.exserve;
                    else Valuejson.TEMP1=Valuejson.exserve;
                    //TEMP2数据处理
                    var tempstr1="";
                    if(Valuejson.mainsign){
                        var signarr=Valuejson.mainsign.split(" ");                       
                        for(var item of signarr){
                            if(item=="超值") tempstr1+=`<i class='i-orange'>${item}</i>`
                            else if(item=="严选车") tempstr1+=`<i class='i-blue'>${item}</i>`
                            else if(item=="急售") tempstr1+=`<i class='i-red'>${item}</i>`
                            else if(item=="准新车")tempstr1+=`<i class='i-green'>${item}</i>`
                        }
                    }
                    tempstr1+=`<em class='line-through'>${Valuejson.sprice}万</em>`
                    Valuejson.TEMP2=tempstr1;
                    //TEMP3数据处理
                    var tempstr2="";
                    if(Valuejson.sellsign=="新上架"){
                        tempstr2=`<em class='icon-new'>${Valuejson.sellsign}</em>`
                    }
                    if(/^急降/.test(Valuejson.sellsign)){
                       var reg2=/([1-9]\d*|0)(\.\d{1,2})?/;                    
                       tempstr2=`<em class='icon-sale'>${Valuejson.sellsign.slice(0,2)}<br><span>${Valuejson.sellsign.match(reg2)[0]}</span>${Valuejson.sellsign.slice(-1)}</em>`
                    }
                    Valuejson.TEMP3=tempstr2;
                    newli.innerHTML="<a href='/showcar?carid="+Valuejson.carid+"' class='car-a'><img src='"+Valuejson.imgsrc[0]+"'><div class='car-info'>"+
                    "<h2 class='t'>"+Valuejson.title+"</h2>"+"<div class='t-i'>"+Valuejson.sptime.split("-")[0]+"年<span class='icon-pad'>|</span>"+Valuejson.distance+"万公里"+Valuejson.TEMP1+"</div>"
                    +"<div class='t-price'><p>"+Valuejson.price+"<span>万</span></p>"+Valuejson.TEMP2+"</div>"
                    +"</div>"+Valuejson.TEMP3+"</a>";
                    obj.append(newli);
                }
            }
    
            addCar(carListJson);
           }
       });
    }
    //筛选框样式：品牌/车系/价格
    function selectcom(){
     //创建一个构造方法为前三个selectlist中的li添加“点击active改样式”
    function changeStyle(selectlistLi){
        this.selectli=selectlistLi;
        this.selectul=selectlistLi.parentNode;
        this.innertxt=selectlistLi.querySelector("a").innerText;
        this.seltit=this.selectul.parentNode.querySelector(".sel_tit").innerText;
    }
    changeStyle.prototype.init=function(){
        changeStyle.prototype.change(this);
        changeStyle.prototype.addToHadselect(this);
    }
    //changeStyle构造方法原型对象中的改样式方法
    changeStyle.prototype.change=function(obj){
        obj.selectli.onclick=function(){
        var lilist=this.parentNode.children;
           for(var i=0;i<lilist.length;i++){
               lilist[i].className="";
           }
           this.className="active";
        }
    }
    //构造方法原型对象中的改当前筛选内容方法
    changeStyle.prototype.addToHadselect=function(obj){
        obj.selectli.addEventListener("click",function(){
            var hadselectUl=document.querySelector(".hs_choose");
            var hadselectLi=hadselectUl.children;
            var sumflag=0;
            if(obj.innertxt=="不限"){
                for(var i=0;i<hadselectLi.length;i++){
                    if(hadselectLi[i].querySelector("span").innerText.indexOf(obj.seltit)){
                    }else{
                        hadselectUl.removeChild(hadselectLi[i]);
                        ajaxAddCar(nowpage,pageSize)
                    }
                }
            }
            else {
                if(hadselectLi.length==0){
                    var newli=document.createElement("li");
                       newli.className="hs_choose_li";
                       newli.innerHTML=`<a href="javascript:;"><i></i><span>${obj.seltit}:</span>${obj.innertxt}</a>`;
                       hadselectUl.appendChild(newli);
                       ajaxAddCar(nowpage,pageSize)
                       newli.querySelector("i").addEventListener("click",function(){
                        hadselectUl.removeChild(this.parentNode.parentNode);
                        var lilist=obj.selectul.children;
                        for(var i=0;i<lilist.length;i++){
                            lilist[i].className="";
                        }
                        lilist[0].className="active";
                        ajaxAddCar(nowpage,pageSize)
                       });
                }
                else{
                for(var i=0;i<hadselectLi.length;i++){
                        if(!hadselectLi[i].querySelector("span").innerText.match(obj.seltit)){
                            
                            sumflag++;
                            if(sumflag==hadselectLi.length){
                                var newli=document.createElement("li");
                                newli.className="hs_choose_li";
                                newli.innerHTML=`<a href="javascript:;"><i></i><span>${obj.seltit}:</span>${obj.innertxt}</a>`
                                hadselectUl.appendChild(newli);
                                ajaxAddCar(nowpage,pageSize)
                                newli.querySelector("i").addEventListener("click",function(){
                                 hadselectUl.removeChild(this.parentNode.parentNode);
                                 var lilist=obj.selectul.children;
                                 for(var i=0;i<lilist.length;i++){
                                     lilist[i].className="";
                                 }
                                 lilist[0].className="active";
                                 ajaxAddCar(nowpage,pageSize)
                                });
                            }
                        }
                        else{
                            hadselectLi[i].innerHTML=`<a href="javascript:;"><i></i><span>${obj.seltit}:</span>${obj.innertxt}</a>`
                            ajaxAddCar(nowpage,pageSize)
                            hadselectLi[i].querySelector("i").addEventListener("click",function(){
                             hadselectUl.removeChild(this.parentNode.parentNode);
                             var lilist=obj.selectul.children;
                             for(var i=0;i<lilist.length;i++){
                                 lilist[i].className="";
                             }
                             lilist[0].className="active";
                             ajaxAddCar(nowpage,pageSize)
                            });
                        }
                    }
                }
            }

        })
    }
    //获取页面中的selectli并执行上方li的构造方法changeStyle；
    var selectlistfather=document.querySelectorAll(".selectlist");
    var  selectlistson=[];
    var selectlist=[];
    var lastselectlist=selectlistfather[selectlistfather.length-1].querySelectorAll("li");//获取第四个selectlist中的li
        //遍历前三个selectlist并传给新数组存放，防止改变第四个selectlist(更多)中的li
        //下面操作仅为前三个数组中的li进行
    for (var j = 0; j < selectlistfather.length-1; ++j) {
        selectlistson.push(selectlistfather[j]);
        selectlist[j]=selectlistson[j].querySelectorAll("li");
    }
    var selectli=[];
    var cont=0;
    for(var i=0;i<selectlist.length;i++){
        for(var k=0;k<selectlist[i].length;k++){
       selectli[cont]=new changeStyle(selectlist[i][k]);
       selectli[cont].init();
       
       if(i==2){ 
        selectlist[i][k].addEventListener("click",function(){
        document.querySelectorAll(".screen-price")[0].value="";
        document.querySelectorAll(".screen-price")[1].value="";
        document.querySelector(".show-btn").style.display="none"
       }) } 
       cont++;
    }
    }
        //为第四个selectlist单独创建样式方法
        for(var x=0;x<lastselectlist.length;x++){
            lastselectlist[x].onclick=function(){
                if(this.className==""){
                    this.className="cur"
                }else{
                    this.className="";
                }
            }
        }
        var ddoption=document.querySelectorAll(".dd-option a");
        for(var z=0;z<ddoption.length;z++){
            ddoption[z].onclick=function(){
                var ddlist=this.parentNode.children;
                var ddlistit=this.parentNode.parentNode.querySelector("p").innerText;
                var ddlistxt=this.innerText;
                for(var i=0;i<ddlist.length;i++){
                    ddlist[i].style.background="#fff";
                }
                this.style.background="#22ac38";
                //为第四个selectlist定制的改当前筛选内容方法
                var hadselectUl=document.querySelector(".hs_choose");
                var hadselectLi=hadselectUl.children;
                var sumflag=0;
                if(ddlistxt=="不限"){
                    for(var i=0;i<hadselectLi.length;i++){
                        if(hadselectLi[i].querySelector("span").innerText.indexOf(ddlistit)){
                        }else{
                            hadselectUl.removeChild(hadselectLi[i]);
                            ajaxAddCar(nowpage,pageSize)
                        }
                    }
                }
                else {
                    if(hadselectLi.length==0){
                        var newli=document.createElement("li");
                           newli.className="hs_choose_li";
                           newli.innerHTML=`<a href="javascript:;"><i></i><span>${ddlistit}:</span>${ddlistxt}</a>`
                           hadselectUl.appendChild(newli);
                           ajaxAddCar(nowpage,pageSize);
                           newli.querySelector("i").addEventListener("click",function(){
                            hadselectUl.removeChild(this.parentNode.parentNode);
                            for(var i=0;i<ddlist.length;i++){
                                ddlist[i].style.background="#fff";
                            }
                            ddlist[0].style.background="#22ac38";
                            ajaxAddCar(nowpage,pageSize)
                           });
                    }
                    else{
                    for(var i=0;i<hadselectLi.length;i++){
                            if(hadselectLi[i].querySelector("span").innerText.indexOf(ddlistit)){
                            sumflag++;
                                if(sumflag==hadselectLi.length){
                                    var newli=document.createElement("li");
                                    newli.className="hs_choose_li";
                                    newli.innerHTML=`<a href="javascript:;"><i></i><span>${ddlistit}:</span>${ddlistxt}</a>`
                                    hadselectUl.appendChild(newli);
                                    ajaxAddCar(nowpage,pageSize)
                                }
                            }
                            else{
                                hadselectLi[i].innerHTML=`<a href="javascript:;"><i></i><span>${ddlistit}:</span>${ddlistxt}</a>`
                                ajaxAddCar(nowpage,pageSize);
                                hadselectLi[i].querySelector("i").addEventListener("click",function(){
                                    hadselectUl.removeChild(this.parentNode.parentNode);
                                    for(var i=0;i<ddlist.length;i++){
                                        ddlist[i].style.background="#fff";
                                    }
                                    ddlist[0].style.background="#22ac38";
                                    ajaxAddCar(nowpage,pageSize)
                                   });
                            }
                        }
                    }
                }
            }
        }
    }
    //调用筛选框样式函数
    selectcom();
    //价格区间校验并且在当前筛选中显示
    function checkPriceIsNum(){
    var reg=/^(?:\d{1,3}|1000)$/;
    var Flag=false;
    var lowprice=document.querySelectorAll(".screen-price")[0];
    var highprice=document.querySelectorAll(".screen-price")[1];
    var priceBtn=document.querySelector(".price-btn");
    var showBtn=document.querySelector(".show-btn");
    priceBtn.onclick=function(){
        if(lowprice.value==""&&highprice.value==""){
            showBtn.style.display="block";
            lowprice.value="";
            highprice.value="";
        }
        else if(lowprice.value&&highprice.value==""&&!reg.test(lowprice.value)){
            showBtn.style.display="block";
            lowprice.value="";
            highprice.value="";
        }
        else if(lowprice.value==""&&highprice.value&&!reg.test(highprice.value)){
            showBtn.style.display="block";
            lowprice.value="";
            highprice.value="";
        }
       else if(lowprice.value&&highprice.value&&(!reg.test(lowprice.value)||!reg.test(highprice.value))){
            showBtn.style.display="block";
            lowprice.value="";
            highprice.value="";
        }
        else if(lowprice.value&&highprice.value&&lowprice.value*1>highprice.value*1){
            showBtn.style.display="block";
            lowprice.value="";
            highprice.value="";
           
        }
        else{
            showBtn.style.display="none";
            var priceli=document.querySelectorAll(".carsprice ul li");
            var hadselectUl=document.querySelector(".hs_choose");
            var hadselectLi=hadselectUl.children;
            var sumflag=0;
            var tempstr="";
            if(lowprice.value!=""&&highprice.value!=""){
                tempstr=`${lowprice.value}-${highprice.value}万`;
            }
            else if(highprice.value==""){
                tempstr=`${lowprice.value}万以上`;
            }
            else if(lowprice.value==""){
                tempstr=`${highprice.value}万以下`;
            }
            for(var item of priceli)
            {
                item.className="";
            }
            if(hadselectLi.length==0){
                var newli=document.createElement("li");
                   newli.className="hs_choose_li";
                   newli.innerHTML=`<a href="javascript:;"><i></i><span>价格:</span>${tempstr}</a>`;
                   hadselectUl.appendChild(newli);
                   ajaxAddCar(nowpage,pageSize)
                   newli.querySelector("i").addEventListener("click",function(){
                    hadselectUl.removeChild(this.parentNode.parentNode);
                    var lilist=obj.selectul.children;
                    for(var i=0;i<lilist.length;i++){
                        lilist[i].className="";
                    }
                    lilist[0].className="active";
                    ajaxAddCar(nowpage,pageSize)
                   });
            }
            else{
            for(var i=0;i<hadselectLi.length;i++){
                if(!hadselectLi[i].querySelector("span").innerText.match("价格")){
                   
                    sumflag++;
                    if(sumflag==hadselectLi.length){
                        var newli=document.createElement("li");
                        newli.className="hs_choose_li";
                        newli.innerHTML=`<a href="javascript:;"><i></i><span>价格:</span>${tempstr}</a>`
                        hadselectUl.appendChild(newli);
                        ajaxAddCar(nowpage,pageSize)
                        newli.querySelector("i").addEventListener("click",function(){
                         hadselectUl.removeChild(this.parentNode.parentNode);
                         var lilist=obj.selectul.children;
                         for(var i=0;i<lilist.length;i++){
                             lilist[i].className="";
                         }
                         lilist[0].className="active";
                         ajaxAddCar(nowpage,pageSize)
                        });
                    }
                }
                else{
                    hadselectLi[i].innerHTML=`<a href="javascript:;"><i></i><span>价格:</span>${tempstr}</a>`;
                    ajaxAddCar(nowpage,pageSize)
                    hadselectLi[i].querySelector("i").addEventListener("click",function(){
                     hadselectUl.removeChild(this.parentNode.parentNode);
                     var lilist=obj.selectul.children;
                     for(var i=0;i<lilist.length;i++){
                         lilist[i].className="";
                     }
                     lilist[0].className="active";
                     ajaxAddCar(nowpage,pageSize)
                    });
                }
            }
        }
        }
    }
    }
    //调用价格筛选
    checkPriceIsNum();
    //ajax当前筛选中的query
    function getSearchStr(){
        var query={};
        var str="";  
        var hadchooseli=$('.hs_choose_li')
        for(var i=0;i<hadchooseli.length;i++){
         str=hadchooseli.eq(i).text().split(":"); 
           switch(str[0]){
            case "品牌": str[0]="chose1";
            break;
            case "车系": str[0]="chose2";
            break;
            case "价格":str[0]="chose3";
            break;
            case "车龄":str[0]="chose4";
            break;
            case "车型":str[0]="chose5";
            break;
           }
                  
           query[str[0]]=str[1];
                        
        }
        return query 
    }
    //排序
    var cursorttype=0;//保存当前排序方式在全局
    function sort(){
        var sortopli=$('.sort_way_ul li');
        sortopli.eq(2)[0].cont=-2;
        sortopli.eq(3)[0].cont=-3;
        sortopli.eq(4)[0].cont=-4;
        sortopli.eq(0).click(function(){
            cursorttype=0;  
            ajaxAddCar(nowpage,pageSize,0)
            for(var i=0;i<5;i++){
            $('.sort_way_ul li a').eq(i).css("color","#495056")  
             }
             $('.sort_way_ul li a').eq(0).css("color","#22ac38")
        })
        sortopli.eq(1).click(function(){
            cursorttype=1;
           ajaxAddCar(nowpage,pageSize,1) 
           for(var i=0;i<5;i++){
           $('.sort_way_ul li a').eq(i).css("color","#495056")  
            }
            $('.sort_way_ul li a').eq(1).css("color","#22ac38")
        })
        sortopli.eq(2).click(function(){                
            sortopli.eq(2)[0].cont=-sortopli.eq(2)[0].cont;
            cursorttype=sortopli.eq(2)[0].cont;   
            ajaxAddCar(nowpage,pageSize,sortopli.eq(2)[0].cont)
            for(var i=0;i<5;i++){
           $('.sort_way_ul li a').eq(i).css("color","#495056")  
            }
            $('.sort_way_ul li a').eq(2).css("color","#22ac38")
            if(sortopli.eq(2)[0].cont==2){
                $('.sort_way_ul li a').eq(2).text("价格↑")
            }
            else{
                $('.sort_way_ul li a').eq(2).text("价格↓")
            }
        })
        sortopli.eq(3).click(function(){
            sortopli.eq(3)[0].cont=-sortopli.eq(3)[0].cont;
            cursorttype=sortopli.eq(3)[0].cont;  
            ajaxAddCar(nowpage,pageSize,sortopli.eq(3)[0].cont)
            for(var i=0;i<5;i++){
           $('.sort_way_ul li a').eq(i).css("color","#495056")  
            }
            $('.sort_way_ul li a').eq(3).css("color","#22ac38")
            if(sortopli.eq(3)[0].cont==3){
                $('.sort_way_ul li a').eq(3).text("车龄↑")
            }
            else{
                $('.sort_way_ul li a').eq(3).text("车龄↓")
            }
        })
        sortopli.eq(4).click(function(){
            sortopli.eq(4)[0].cont=-sortopli.eq(4)[0].cont;
            cursorttype=sortopli.eq(4)[0].cont;  
            ajaxAddCar(nowpage,pageSize,sortopli.eq(4)[0].cont)
            for(var i=0;i<5;i++){
            $('.sort_way_ul li a').eq(i).css("color","#495056")  
             }
             $('.sort_way_ul li a').eq(4).css("color","#22ac38")
             if(sortopli.eq(4)[0].cont==4){
                $('.sort_way_ul li a').eq(4).text("里程↑")
            }
            else{
                $('.sort_way_ul li a').eq(4).text("里程↓")
            }
        })
    }
    sort()
    //搜索
    $(".search input[type='button']").click(function(){
        ajaxAddCar(nowpage,pageSize,cursorttype,1)
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
}



