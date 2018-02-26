var express = require('express');
var router = express.Router();
var userModel = require("../model/userModel");
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
