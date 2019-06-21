var express=require('express');
var router=express.Router();
var fs = require("fs");
var mybook = fs.readFileSync('./views/mybook.ejs');
var myinfo =fs.readFileSync('./views/myinfo.ejs');
var mysellcar=fs.readFileSync('./views/mysellcar.ejs');
router.use(express.static('./public'));

  router.get('/',function(req,res){
    if(req.session.username!=""){
      loginmessage=`${req.session.username}<em>&nbsp;|&nbsp;</em><a href="/loginout">注销</a>`
      res.render('user',{loginmess:loginmessage,userN:req.session.username,content:mybook,txt:"我的预约"})
    }
    else{
    loginmessage=`<a href="javascript:;">登录</a> `
    res.render('user',{loginmess:loginmessage,userN:req.session.username,content:mybook,txt:"我的预约"})
    }
  });
  router.get('/mybook',function(req,res){
    res.render('user',{loginmess:loginmessage,userN:req.session.username,content:mybook,txt:"我的预约"})
  });
  router.get('/myinfo',function(req,res){
    res.render('user',{loginmess:loginmessage,userN:req.session.username,content:myinfo,txt:"个人信息"})
  });
  router.get('/mysellcar',function(req,res){
    res.render('user',{loginmess:loginmessage,userN:req.session.username,content:mysellcar,txt:"我在卖的车"})
  });
  // router.get('/loginout',(req,res)=>{
  //   console.log("user被调用了")
  //   req.session.destroy(function(err) {
  //    if(err) console.log(err)
  //   })
  //   res.redirect('/');
  // })
  module.exports=router;