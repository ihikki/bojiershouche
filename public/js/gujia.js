$(function(){
    //获取省份
    $.ajax({
        url:"http://127.0.0.1:3000/gujia/provincelist",
       data:{},
       dataType:"jsonp",
       success:function(data){
           //然后根据请求到的数据结合模板变成html字符串
        console.log(data)
        var province=data;
           function addprovince(province){
            var provinceList=$("#province");
            for(var i=0;i<province.length;i++)
            {
                var temp=province[i];
                var newoption=document.createElement("option");
                newoption.value=temp;
                newoption.innerHTML=`${temp}`
                provinceList.append(newoption);
            }
        }
        addprovince(province);
       }
   });
   //获取城市
   $("#province").change(function(){
      var pve=$(this).val();
      var cityList=$("#city2");
      cityList.html(`<option disabled selected value="0">城市</option>`);
      console.log(pve)
      $.ajax({
        url:"http://127.0.0.1:3000/gujia/citylist",
       data:{province:pve},
       dataType:"jsonp",
       success:function(data){
           //然后根据请求到的数据结合模板变成html字符串
        console.log(data)
        var city=data;
           function addcity(city){
            for(var i=0;i<city.length;i++)
            {
                var temp=city[i];
                var newoption=document.createElement("option");
                newoption.innerHTML=temp;
                cityList.append(newoption);
            }
        }
        addcity(city);
       }
    });
   })
   //获取车系
   $("#carbrand").change(function(){
    var carbrand=$(this).val();
    var carsys=$("#carsys");
    carsys.html(`<option disabled selected value="0">车系</option>`);
    console.log(carbrand)
    $.ajax({
      url:"http://127.0.0.1:3000/gujia/carsys",
     data:{carbrand:carbrand},
     dataType:"jsonp",
     success:function(data){
         //然后根据请求到的数据结合模板变成html字符串
      console.log(data)
      var carsysitem=data;
         function addcarsys(carsysitem){
          for(var i=0;i<carsysitem.length;i++)
          {
              var temp=carsysitem[i];
              var newoption=document.createElement("option");
              newoption.innerHTML=temp;
              carsys.append(newoption);
          }
      }
      addcarsys(carsysitem);
     }
  });
 })
 //年份,月份
 function addyear(){
    var yearselect=$("#year");
    var nowyear=(new Date()).getFullYear();
    for(var i=0;i<20;i++){
        var temp=nowyear-i;
        var newoption=document.createElement("option");
        newoption.innerHTML=temp;
        yearselect.append(newoption);
    }
    yearselect
 }
 addyear()
 function addmonth(){
    var monthselect=$("#month");
    for(var i=1;i<13;i++){
        var newoption=document.createElement("option");
        newoption.innerHTML=i;
        monthselect.append(newoption)
    }
 }
 addmonth()
   //评估模态框
    if($('.panel-body').html().trim()=="您没有评估中的车辆"){
        $('#myModal').modal('show')
    }    
    //开始估价
    $('.btn-primary').click(function(){
       var reg=/^([1-9]\d*|0)(\.\d{1,2})?$/;
       var str1=$("#province").val();
       var str2=$('#city2').val();
       var str3=$('#carbrand').val();
       var str4=$('#carsys').val();
       var str5=$('#year').val();
       var str6=$('#month').val();
       var str7=$('#xingshilicheng').val();
       var str8=$('#hastru').val();
       var flag=reg.test($('#xingshilicheng').val());

        if(str1&&str2&&str3&&str4&&str5&&str6&&str7&&str8&&flag&&(str5==(new Date()).getFullYear()&&str6>(new Date()).getMonth()+1)==false)
        {   
            var gjinfo=[];
            gjinfo.push(
                $("#province").val(),
                $('#city2').val(),
                $('#carbrand').val(),
                $('#carsys').val(),
                $('#year').val(),
                $('#month').val(),
                $('#xingshilicheng').val(),
                $('#hastru').val()
                )
                $.ajax({
                    url:'http://127.0.0.1:3000/gujia/pinggu',
                    data:{gjinfo:gjinfo},
                    dataType:"jsonp",
                    success:function(data){
                        if(data=="success"){
                            $('#myModal').modal('hide');
                            $('.panel-body').html("请耐心等待您的评估结果");
                        }
                    }
                })
                console.log(gjinfo)
        }
        else{
            if($('#xingshilicheng').val()!=""&&!reg.test($('#xingshilicheng').val())){
                alert("车辆里程输入有误")
            }
            else if(str5==(new Date()).getFullYear()&&str6>(new Date()).getMonth()+1){
                alert("上牌时间输入有误")
            }
            else{
                alert("信息填写不完整")
            }
        }
        
    })
})