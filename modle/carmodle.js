var mongoose = require('mongoose');
var carschema=mongoose.Schema({
    carid:String,
    title:String,
    price:Number,
    sprice:Number,
    sptime:String,
    distance:Number,
    pail:Number,
    biansx:String,
    carowner:String,
    lookcar:String,
    nianj:String,
    jiaoqx:String,
    imgsrc:Array,
    sellsign:String,
    exserve:String,
    mainsign:String,
    cartype:String,
    onsale:Number
  });

  module.exports=mongoose.model('carinfo',carschema);