var express=require('express');
var data = require('../public/datajson/carlistdata.json');
var mongoose = require('mongoose');
var router=express.Router();

var Car=require("../modle/carmodle");
var car1=new Car({ 
  carid:"HC-76544927",
  title:"奔驰E级 2009款 E 350 Coupe(进口)",
  price:16.20,
  sprice:83.40,
  sptime:"2009-11",
  distance:8.83,
  pail:3.5,
  biansx:"自动",
  carowner:"吴先生",
  lookcar:"白云",
  nianj:"2019-11",
  jiaoqx:"2020-2",
  imgsrc:["https://image.guazistatic.com/gz01190327/23/14/7532a431a1b0b1e90b4f7c4b1d9f2628.jpg@base@tag=imgScale&w=600&h=400&c=1&m=2&q=88"],
  sellsign:"",
  exserve:"",
  mainsign:"超值",
  cartype:"跑车",
  onsale:1});
  // car1.save(car1,function(err,car1){
  //   if(err)return console.log(err);
  //   console.log(car1)
  // })
  router.get('/',function(req,res){
    if(req.session.username!=""){
      console.log(req.session)
      loginmessage=`<a href="/user">${req.session.username}</a><em>&nbsp;|&nbsp;</em><a href="/loginout">注销</a>`
      res.render('buycar',{loginmess:loginmessage,gujiastr:`<a href="/gujia">`})
      console.log("buycar");
    }
    else{
    loginmessage=`<a href="javascript:;">登录</a> `
    res.render('buycar',{loginmess:loginmessage,gujiastr:`<a href="javascript:;">`})
    console.log("buycar");
  }
    
  });

    router.get('/carlist',function(req,res){
    var {page,pageSize,querystr,sorttype,callback} = req.query;
    var start = (page-1)*pageSize;
    var end = page*pageSize;
    var pricechose;
    console.log(JSON.stringify(querystr))
//价格区间处理
    if(querystr.chose3){
    if(querystr.chose3.match("上")){
      pricechose=`{"$gt":${querystr.chose3.match(/([1-9]\d*|0)(\.\d{1,2})?/)[0]}}`
    }
    else if(querystr.chose3.match("下")){
      pricechose=`{"$lt":${querystr.chose3.match(/([1-9]\d*|0)(\.\d{1,2})?/)[0]}}`
    }
    else{
      var str=querystr.chose3.split('-');
      var gtstr=str[0];
      var ltstr=str[1].match(/([1-9]\d*|0)(\.\d{1,2})?/)[0];
      pricechose=`{"$gt":${gtstr},"$lt":${ltstr}}`
    }
  }
//年份处理
  if(querystr.chose4){
   var yearchose= (new Date().getFullYear())-querystr.chose4[0];
  }
//查询字符串
  var chosequerystr="";
  if(JSON.stringify(querystr)==`{"chose1":"","chose2":"","chose3":"","chose4":"","chose5":""}`){
    chosequerystr=null;
  }
  else{
    if(querystr.chose1&&querystr.chose2){
      chosequerystr+=`"title":{"$regex":"^(?=.*?${querystr.chose1})(?=.*?${querystr.chose2}).+$"},`;
    }else if(querystr.chose1&&!querystr.chose2){
      chosequerystr+=`"title":{"$regex":"${querystr.chose1}"},`
    }
    else if(!querystr.chose1&&querystr.chose2){
      chosequerystr+=`"title":{"$regex":"${querystr.chose2}"},`
    }
    else if(!querystr.chose1&&!querystr.chose2){
      chosequerystr+=`"title":{"$exists":true},`
    }
    if(querystr.chose3){
      chosequerystr+=`"price":${pricechose},`
    }
    else{
      chosequerystr+=`"price":{"$exists":true},`
    }
    if(querystr.chose4){
      chosequerystr+=`"sptime":{"$gt":${yearchose}},`
    }
    else{
      chosequerystr+=`"sptime":{"$exists":true},`
    }
    if(querystr.chose5){
      chosequerystr+=`"cartype":"${querystr.chose5}"`
    }
    else{
      chosequerystr+=`"cartype":{"$exists":true}`
    }
    chosequerystr="{"+chosequerystr+"}"
  }
  //排序字符串
  var sortobj;
  console.log(sorttype)
  if(sorttype=="0"||sorttype=="1"){
    sortobj=null;
  }
  else if(sorttype=="2"){
    sortobj={"price":1}
  }
  else if(sorttype=="-2"){
    sortobj={"price":-1}
  }
  else if(sorttype=="3"){
    sortobj={"sptime":-1}
  }
  else if(sorttype=="-3"){
    sortobj={"sptime":1}
  }
  else if(sorttype=="4"){
    sortobj={"distance":1}
  }
  else if(sorttype=="-4"){
    sortobj={"distance":-1}
  }
  console.log("a"+sortobj)
// console.log("下面是chosequerystr")
// console.log(chosequerystr)
    Car.find(JSON.parse(chosequerystr),{"carid":1,"imgsrc":1,"title":1,"sptime":1,"distance":1,"price":1,"sprice":1,"sellsign":1,"exserve":1,"mainsign":1},(err,cars)=>{
      if(err) throw err;
      // console.log(cars)
        var json = cars.slice(start,end);
      if(callback){
          res.end(`${callback}(${JSON.stringify(json)})`)
      }else{
          res.json(json)
      }
    }).sort(sortobj)   
});

  module.exports=router;