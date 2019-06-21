var express=require('express');
var router=express.Router();
var mongoose = require('mongoose');
var Car=require("../modle/carmodle");
  router.get('/',function(req,res){
    var tocarid=req.query.carid;
    Car.findOne({carid:tocarid},(err,cars)=>{
      if(req.session.username!=""){
        loginmessage=`<a href="/user">${req.session.username}</a><em>&nbsp;|&nbsp;</em><a href="/loginout">注销</a>`
        res.render('showcar',{carid:cars.carid,imgsrc:cars.imgsrc[0],imgsrc1:cars.imgsrc[1],title:cars.title,price:cars.price,sprice:cars.sprice,sptime:cars.sptime,distance:cars.distance,pail:cars.pail,biansx:cars.biansx,carowner:cars.carowner,lookcar:cars.lookcar,nianj:cars.nianj,jiaoqx:cars.jiaoqx,loginmess:loginmessage,gujiastr:`<a href="/gujia">`})
      }
      else{
      loginmessage=`<a href="javascript:;">登录</a> `
      res.render('showcar',{carid:cars.carid,imgsrc:cars.imgsrc[0],imgsrc1:cars.imgsrc[1],title:cars.title,price:cars.price,sprice:cars.sprice,sptime:cars.sptime,distance:cars.distance,pail:cars.pail,biansx:cars.biansx,carowner:cars.carowner,lookcar:cars.lookcar,nianj:cars.nianj,jiaoqx:cars.jiaoqx,loginmess:loginmessage,gujiastr:`<a href="javascript:;">`})
      console.log("showcar")
      }
    })
    
  });

  module.exports=router;