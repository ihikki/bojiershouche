var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
const cookieParser=require('cookie-parser')
const session = require('express-session');
const FileStore=require('session-file-store')(session);
router.use(cookieParser());
var userschema = mongoose.Schema({
  username: Number,
  pwd: String,
  name: String,
  sex: String,
  roots: Number
});
router.use(session({
  store:new FileStore(),
  cookie:{maxAge:200000,httpOnly: true},
  secret:"123",
  saveUninitialized:false,
  resave:false
}))
var flag="";
var User = mongoose.model('user', userschema);
router.get('/', (req, res,next)=> {
  req.session.username=flag;
  var loginmessage;
  if(req.session.username!=""){
    console.log(req.session);
    loginmessage=`<a href="/user">${req.session.username}</a><em>&nbsp;|&nbsp;</em><a href="/loginout">注销</a>`
    res.render("index",{loginmess:loginmessage,gujiastr:`<a href="/gujia">`})
  }
  else{
    loginmessage=`<a href="javascript:;">登录</a> `
  res.render('index',{loginmess:loginmessage,gujiastr:`<a href="javascript:;">`})
  console.log("index")
  }
  

});
router.get('/login',function(req,res){
  var {username,pwd,callback}=req.query;
  User.findOne({ "username": username,"pwd":pwd}, function (err, data) {
    if(err)console.log(err);
    else if(data==null){
      console.log("登录失败")
      res.send(`${callback}(${JSON.stringify('账号密码错误，请重新输入')})`)
    }
    else{
      req.session.username=username;
      flag=username;
      res.send(`${callback}(${JSON.stringify(data)})`);
    }
  });

})
router.get('/regist', function (req, res) {
  var { username, pwd, name, sex, callback } = req.query;
  User.findOne({ "username": username }, function (err, data) {
    if (err) console.log(err);
    else if (data=="") {
      res.send(`${callback}(${JSON.stringify('该账号已注册过')})`)
    }
    else {
      var newuser = new User({ username: username, pwd: pwd, name: name, sex: sex, roots: 0 });
      var success = "注册成功2s后将返回首页";
      newuser.save(function (err, newuser) {
        if (err) return console.log(err)
        else console.log(newuser); })
          if (callback) {
            res.end(`${callback}(${JSON.stringify(success)})`)
          } else {
            res.json(success);
          }
        }
  });
});
router.get('/loginout',(req,res)=>{
  console.log("我被调用了")
  flag="";
  req.session.destroy(function(err) {
   if(err) console.log(err)
  })
  res.redirect('/index');
})


module.exports = router;
