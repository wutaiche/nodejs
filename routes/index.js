var express = require('express');
var router = express.Router();
var userModel = require("../model/userModel");
var multiparty = require("multiparty");
var goodsModel = require("../model/goodsModel");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/login",function(req,res){
	res.render("login",{});
});
router.get("/admin",function(req,res){
	res.render("admin",{});
})

router.post("/cart4form",function(req,res){
    console.log(req.body);
    var form = new multiparty.Form ({
      uploadDir:"public/images"
    })
    form.parse(req,function(err,fields,files){
        console.log(files);
        console.log(fields);
         // var goods_name = fields.goods_name[0];
         // var price = fields.price[0];
         // var detail = fields.detail[0];
         // var size = files["img"][0].size;
         // var img = files["img"][0].path;
         // var name = files["img"][0].originalFilename;

    })
})
// router.get("/test",function(req,res){
//   //第一次请求为输入网站请求的值，res.render("test")。
//   //后面的请求为ajax的值，res.render("admin")会返回给success中的data值。
//    console.log(req.query.template);
//   if(req.query.template=="login"){
//   console.log("login");
//   res.render("login");

// }

//   else if(req.query.template=="admin"){
//      console.log("admin");
//     res.render("admin");
//   }else{
//     res.render("test");
//   }

// })

router.post("/login4ajax",function(req,res){
   var username = req.body.username;
   var psw = req.body.psw;
   var code = req.body.code;
   var captcha = req.body.captcha;
   console.log(2);
   var result = {
      code:1,
      mes:"登陆成功"

   }
   // // console.log(username);
   // var um = new userModel();
   //  um.username = username;
   //  um.psw = psw;
   //  um.save(function(err){
   //    if(!err){
   //    	console.log("成功");
   //    }
   //  })

  // console.log(userModel);
   userModel.find({username:username},function(err,docs){
   	      console.log(docs);
   	    // console.log(docs==true);
   	     console.log(docs[0].psw==psw);
       if(docs&&docs[0].psw==psw){//
          if(code.toUpperCase()!=captcha.toUpperCase()){
             
          
          	result.mes="验证码错误";
          	result.code=-110;
          }

       }else{
       	   result.mes="账号或密码错误";
       	  //console.log();
       	  result.code=-109;
       }
     //  console.log(result);
       res.send(result);

   })
    
})


module.exports = router;
