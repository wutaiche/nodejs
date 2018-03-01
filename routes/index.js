var express = require('express');
var router = express.Router();
var userModel = require("../model/userModel");
var multiparty = require("multiparty");
var goodsModel = require("../model/goodsModel");
var fs = require("fs");
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
router.get("/goodsList",function(req,res){
    // goodsModel.find({},function(err,docs){
    //     if(!err){
    //         var data = docs;
    //         goodsModel.count({},function(err,count){
    //           var count = count;
    //           res.render("goodsList",{data,count})
    //         })



    //     }
       

    // });
   // console.log(req.query);
    var flag = req.query.flag||"";
    var pageCurrent = req.query.pageCurrent||1;
    var pageSize = parseInt(req.query.pageSize)||2;
   // console.log(pageSize);
    if(flag =="delete"){

     var goods_num = req.query.goods_num;
     goodsModel.remove({goods_num},function(err){
        if(!err){
            goodsModel.find({})
        .skip((pageCurrent-1)* pageSize)
        .limit(pageSize)
        .sort({'_id':-1})
        .exec(function(err,docs){

          if(!err){
            //console.log(docs);
            var data = docs;
            goodsModel.count({},function(err,count){
              var count = count;
              var totalPages= parseInt((count-1)/pageSize)+1;

              res.render("goodsList",{data,count,totalPages,pageCurrent,pageSize});
            })
           }
          // console.log(err);

        });
          return;

        }
     })
    };

    if(flag =="search"){
     
     var value = req.query.value;
     console.log(value);
     var query = {};
     query['goods_name']=new RegExp(value);
      goodsModel.find(query)
        .skip((pageCurrent-1)* pageSize)
        .limit(pageSize)
        .sort({'_id':-1})
        .exec(function(err,docs){

          if(!err){
            //console.log(docs);
            var data = docs;
             console.log(data);
              var count = data.length;
              var totalPages= parseInt((count-1)/pageSize)+1;
               console.log(count);
              res.render("goodsList",{data,count,totalPages,pageCurrent,pageSize});
            

           }
          // console.log(err);

        
         

        
     })
        return;
    };
    goodsModel.find({})
        .skip((pageCurrent-1)* pageSize)
        .limit(pageSize)
        .sort({'_id':-1})
        .exec(function(err,docs){

          if(!err){
            //console.log(docs);
            var data = docs;
            goodsModel.count({},function(err,count){
              var count = count;
              var totalPages= parseInt((count-1)/pageSize)+1;

              res.render("goodsList",{data,count,totalPages,pageCurrent,pageSize});
            })
           }
          // console.log(err);

        });

})
router.get("/addGoods",function(req,res){
    res.render("addGoods");
})

router.get("/editGoods",function(req,res){
   var goods_num = req.query.goods_num;
   console.log(goods_num);
   goodsModel.find({goods_num},function(err,docs){
       console.log(docs);
       res.render("editGoods",{data:docs});
   })
})

router.post("/edit4form",function(req,res){
   var form = new multiparty.Form ({
      uploadDir:"public/images"
    })
    form.parse(req,function(err,fields,files){
        console.log(files);
        console.log(fields);
         var goods_name = fields.goods_name[0];
         var goods_sn = fields.goods_sn[0];
         //var goods_num = Date.now();
         var goods_category = fields.goods_category[0];
         var goods_brand  = fields.goods_brand[0];
         var shop_price  = fields.shop_price[0];
         var virtual_sales = fields.virtual_sales[0];
         var goods_num = fields.goods_num[0];
         var img = files["goods_img"][0].path;
         var size = files["goods_img"][0].size;
         var goods_img;
         if(size==0){
             fs.unlink(img);
              goods_img="";
         }else{
          goods_img = img.substr(img.lastIndexOf("\\")+1);
           }
         goodsModel.update({goods_num},{goods_name,goods_sn,goods_category,goods_brand,
          shop_price,virtual_sales,goods_img},function(err,docs){
               if(!err){
                 res.send("商品修改成功");
               }else{
                 res.send("商品修改失败");
               }
          })
    })
});


router.post("/cart4form",function(req,res){
    console.log(req.body);
    var form = new multiparty.Form ({
      uploadDir:"public/images"
    })
    form.parse(req,function(err,fields,files){
        console.log(files);
        console.log(fields);
         var goods_name = fields.goods_name[0];
         var goods_sn = fields.goods_sn[0];
         var goods_num = Date.now();
         var goods_category = fields.goods_category[0];
         var goods_brand  = fields.goods_brand[0];
         var shop_price  = fields.shop_price[0];
         var virtual_sales = fields.virtual_sales[0];

         var img = files["goods_img"][0].path;
         var size = files["goods_img"][0].size;
         var goods_img;
         if(size==0){
             fs.unlink(img);
              goods_img="";
         }else{
          goods_img = img.substr(img.lastIndexOf("\\")+1);
           }
         var gm =new goodsModel();
         gm.goods_num = goods_num;
         gm.goods_name=goods_name;
         gm.goods_sn = goods_sn;
         gm.goods_category = goods_category;
         gm.goods_brand = goods_brand;
         gm.shop_price =shop_price;
         gm.virtual_sales = virtual_sales;
         gm.goods_img =goods_img;
         gm.save(function(err){
          if(!err){
            res.send("商品添加成功");
          }else{
            console.log(err);
            res.send("商品添加失败");
          }
         })

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
