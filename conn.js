let mongoose=require('mongoose');
var url="mongodb://localhost:27017/bobo";
var option={useNewUrlParser: true}
mongoose.connect(url,option)
.then(db=>console.log("连接成功"))
.catch(error=>console.log("连接失败"));
module.exports=mongoose


