const multer=require("multer");
var db=require("./model.js");

const storage = multer.diskStorage({
    destination:function(req,file,cb){
      cb(null,'static/upload_images/')
    },
    filename:function(req,file,cb){
      cb(null,file.originalname);
    }
  });
  
  var upload=multer({storage:storage});
  
  module.exports.Sell=upload.array('myimage',5),function(req,res,next){
    res.send(req.body.name)
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
          console.log("Data inserted")
        });
    }
    res.send(imageArray);
  };

  module.exports.donate=upload.array('myimage',5),function(req,res,next){
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
      var sql = "INSERT INTO `donate_table`(`name`,`product`,`mob_no`,`old` ,`image`,`year`,`descript`,`currentdate`,`current_id`) VALUES ('" + name + "','" + product + "','" + mob + "','" + old + "','" + img_name + "','"+ year +"','"+ descript +"',now(),'"+ currentId +"')";
        db.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted, ID: " + result.insertId);
          console.log("Data inserted")
        });
    }
    res.send(imageArray);
  };