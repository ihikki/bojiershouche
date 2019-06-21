var express=require('express');
var router=express.Router();

  router.get('/',function(req,res){
    if(req.session.username!=""){
      loginmessage=`<a href="/user">${req.session.username}</a><em>&nbsp;|&nbsp;</em><a href="/loginout">注销</a>`
      res.render('sellcar',{loginmess:loginmessage,gujiastr:`<a href="/gujia">`})
    }
    else{
    loginmessage=`<a href="javascript:;">登录</a> `
    res.render('sellcar',{loginmess:loginmessage,gujiastr:`<a href="javascript:;">`})
    }
  });

  module.exports=router;