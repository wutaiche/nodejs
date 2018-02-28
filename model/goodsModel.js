var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var goods = new Schema({
    goods_name: String,
    goods_sn    : {type:String, unique:true },
    goods_category:String,
    goods_brand :String,
    shop_price:String,
    virtual_sales:String,
    goods_img:String,
    goods_thumb:String,


    create_date :{
    	         type:Date,default:Date.now
    },
    goods_num :{
                 type:Number, unique:true 
    },




});

var goodsModel =mongoose.model("goods",goods);

module.exports = goodsModel;