const multer=require("multer");
var db=require("./model.js");
var upload=require("./multer.js");

module.exports.Sell_get=(req,res)=>{
  return res.render('sell.pug');
}

module.exports.donate_get=(req,res)=>{
  return res.render('donate.pug');
}

  module.exports.Sell_post=function(req,res,next){
    upload(req, res, function(err) {
      if (err) {
          return res.end("Something went wrong!");
      }
    var imageArray={};
    for (var i = 0; i < req.files.length; i++) {
    imageArray[i]=req.files[i].filename
    }
    var name = req.body.name;
    var product = req.body.product;
    var old = req.body.old;
    var price = req.body.price;                    
    var mob = req.body.mob_no;                  
    var year=req.body.year;
    var descript=req.body.descript;  
    var currentId=Date.now();
    for(var i=0;i<req.files.length;i++)   
    {
      var img_name=imageArray[i];
      var sql = "INSERT INTO `search_table`(`name`,`product`,`mob_no`,`price`, `old` ,`image`,`year`,`descript`,`currentdate`,`current_id`) VALUES ('" + name + "','" + product + "','" + mob + "','" + price + "','" + old + "','" + img_name + "','"+ year +"','"+ descript +"',now(),'"+ currentId +"')";
        db.query(sql, function (err, result) {  
          if (err) throw err;
          console.log("1 record inserted, ID: " + result.insertId);
        });
    }
    res.redirect("/api");
  });
  };
  
  module.exports.donate_post=function(req,res,next){
    upload(req, res, function(err) {
      if (err) {
          return res.end("Something went wrong!");
      }
  var imageArray={};
  for (var i = 0; i < req.files.length; i++) {
  imageArray[i]=req.files[i].filename
  }
    var name = req.body.name;
    var product = req.body.product;
    var old = req.body.old;                 
    var mob = req.body.mob_no;                  
    var year=req.body.year;
    var descript=req.body.descript;
    var currentId=Date.now();
    for(var i=0;i<req.files.length;i++)
    {
      var img_name=imageArray[i];
      var sql = "INSERT INTO `donate_table`(`name`,`product`,`mob_no`,`old` ,`image`,`year`,`descript`,`current_date`,`current_id`) VALUES ('" + name + "','" + product + "','" + mob + "','" + old + "','" + img_name + "','"+ year +"','"+ descript +"',now(),'"+ currentId +"')";
        db.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted, ID: " + result.insertId);
        });
    }
    res.redirect("/api");
  });
  };