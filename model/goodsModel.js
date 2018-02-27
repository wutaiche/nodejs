var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var goods = new Schema({
    goods_name: String,
    goods_sn    : String,
    goods_category:String,
    goods_brand :String,
    shop_price:String,
    virtual_sales:String,
    goods_img:String,
    goods_thumb:String,


    create_date :{
    	         type:Date,default:Date.now
    }




});

var goodsModel =mongoose.model("goods",goods);

module.exports = goodsModel;