const express=require('express');
var path=require('path');
const app=express();
// const cookieParser=require('cookie-parser')
// const session = require('express-session');
// const bodyParser=require('body-parser');
// const FileStore=require('session-file-store')(session);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static('./public'));

// app.use(bodyParser());
// app.use(cookieParser());
// app.use(session({
//     store:new FileStore(),
//     cookie:{maxAge:200000},
//     secret:"123",
//     saveUninitialized:false,
//     resave:true
// }))
const db=require('./conn');

var route_index=require('./routes/index');
var route_buycar=require('./routes/buycar');
var route_sellcar=require('./routes/sellcar');
var route_gujia=require('./routes/gujia');
var route_user=require('./routes/user');
var route_showcar=require('./routes/showcar');

app.use('/',route_index);
app.use('/index',route_index);
app.use('/buycar',route_buycar);
app.use('/sellcar',route_sellcar);
app.use('/gujia',route_gujia);
app.use('/user',route_user);
app.use('/showcar',route_showcar);

app.listen(3000);
console.log('you are listening to port 3000');
