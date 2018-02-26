var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var user = new Schema({
    username: String,
    psw     : String,
    create_date :{
    	         type:Date,default:Date.now
    }




});

var userModel =mongoose.model("user",user);

module.exports = userModel;