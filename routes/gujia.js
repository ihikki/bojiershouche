var express=require('express');
var router=express.Router();
var mongoose = require('mongoose');
var fs=require('fs');
var province=require('../public/datajson/provincedata.json');
var city=require('../public/datajson/citydata.json');
var carsys=require('../public/datajson/carsys.json');
var usergujia=fs.readFileSync('./views/usergujia.ejs');
var gujiachema=mongoose.Schema({
    carfrom:String,
    cartype:String,
    sptime:String,
    distance:Number,
    hadtru:String,
    carprice:Number,
    carlevel:String,
    username:Number,
    status:Number
  });
  const Pinggu=mongoose.model('pinggu',gujiachema);

router.get('/',function(req,res){
    if(req.session.username){
        var loginmessage=`<a href="/user">${req.session.username}</a><em>&nbsp;|&nbsp;</em><a href="/loginout">注销</a>`
        console.log(req.session.username)
        var username=1*req.session.username
        Pinggu.find({username:username,status:{$in:[0,1]}},(err,pinggu)=>{
            if(err) throw err;
            console.log("查询结果")
            console.log(pinggu)
            if(pinggu.length==0){
                res.render('gujia',{loginmess:loginmessage,state:"您没有评估中的车辆"})
            }
            else if(pinggu[0].status==0){
                res.render('gujia',{loginmess:loginmessage,state:"您的车辆还在评估中,请耐心等待"})
            }
            else if(pinggu[0].status==1){
                console.log(1234)
                res.render('gujia',{loginmess:loginmessage,state:usergujia})
                
            }
        })
        // {loginmess:loginmessage,picture:"",level:"",carfrom:"",cartype:"",sptime:"",distance:"",hadtru:"",gprice:""}
      }
    else{   
    loginmessage=`<a href="javascript:;">登录</a> `
    res.render('index',{loginmess:loginmessage,state:"您尚未登录"})
   
    console.log("gujia")}
  });
router.get('/provincelist',function(req,res){
    var json = province;
    var {callback} = req.query;
    if(callback){
        res.end(`${callback}(${JSON.stringify(json)})`)
    }else{
        res.json({"name":"1"})
    }
});

router.get('/carsys',function(req,res){
    
    var {carbrand,callback} = req.query;
    var json = carsys[carbrand];
    if(callback){
        res.end(`${callback}(${JSON.stringify(json)})`)
    }else{
        res.json({"name":"1"})
    }
});
router.get('/citylist',(req,res)=>{
    var {province,callback} = req.query;
    var json = city[province];
    console.log(province,json);
    if(callback){
        res.end(`${callback}(${JSON.stringify(json)})`)
    }else{
        res.json({"name":"1"})
    }
})
router.get('/pinggu',(req,res)=>{
    var {gjinfo,callback}=req.query;
    var gj=new  Pinggu({
        carfrom:gjinfo[0]+gjinfo[1],
        cartype:gjinfo[2]+gjinfo[3],
        sptime:gjinfo[4]+"-"+gjinfo[5],
        distance:1*gjinfo[6],
        hadtru:gjinfo[7],
        carprice:null,
        carlevel:null,
        username:req.session.username,
        status:0
    });
    
    gj.save((err,gj)=>{
        if(err) throw err;
    })  
    if(callback){
        res.send(`${callback}("success")`)
    }
})
router.get('/getmypinggu',(req,res)=>{
    var callback=req.query.callback;
    console.log(6666)
    Pinggu.findOneAndUpdate({username:1*req.session.username,status:1},{status:2},(err,pinggu)=>{
        console.log(pinggu)
        res.send(`${callback}(${JSON.stringify(pinggu)})`)
    })
})
  module.exports=router;