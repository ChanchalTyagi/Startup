const multer = require("multer");
const jwt = require('jsonwebtoken')
var db = require("./model.js");
const dotenv = require('dotenv');
dotenv.config({ path: './../controllers/.env' });
var upload = require("./multer.js");

module.exports.Sell_get = (req, res) => {
  return res.render('sell.pug');
}

module.exports.donate_get = (req, res) => {
  return res.render('donate.pug');
}

module.exports.contact_get = (req, res) => {
  return res.render('contact.pug');
}

module.exports.Sell_post = function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      return res.end("Something went wrong!");
    }
    var imageArray = {};
    for (var i = 0; i < req.files.length; i++) {
      imageArray[i] = req.files[i].filename
    }
    var name = req.body.name;
    var product = req.body.product;
    var old = req.body.old;
    var price = req.body.price;
    var mob = req.body.mob_no;
    var year = req.body.year;
    var descript = req.body.descript;
    var currentId = Date.now();
    const token = req.cookies.jwt;
    var user_id;
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        db.query('SELECT * FROM `users` WHERE id=?', [decodedToken.id], async (err, results, fields) => {
          if (err) {
            console.log(err);
          }
          else {
            let ans = JSON.parse(JSON.stringify(results));
            user_id = ans[0].id;
            console.log(user_id)
            for (var i = 0; i < req.files.length; i++) {
              var img_name = imageArray[i];
              var sql = "INSERT INTO `sell_table`(`name`,`product`,`mob_no`,`price`, `old` ,`image`,`year`,`descript`,`currentdate`,`current_id`) VALUES ('" + name + "','" + product + "','" + mob + "','" + price + "','" + old + "','" + img_name + "','" + year + "','" + descript + "',now(),'" + currentId + "')";
              db.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted, ID: " + result.insertId);
              })
            }
            var sql1 = "SELECT * FROM `user_sell_products` WHERE `user_id`='" + user_id + "'";
            db.query(sql1, function (err, result1) {
              if (err)
                console.log(err);
              else if (result1.length <= 0) {
                var sql2 = "INSERT INTO `user_sell_products`(`user_id`,`sell`) VALUES ('" + user_id + "',1)";
                db.query(sql2, function (er, result2) {
                  if (er) {
                    console.log(er);
                  }
                });
              } else {
                var val=parseInt(result1[0].sell)+1;
                var sql2 = "UPDATE `user_sell_products` SET `sell`='" + val + "' WHERE `user_id`='" + user_id + "'";
                db.query(sql2, function (err, result2) {
                  if (err) {
                    console.log(err);
                  }
                });
              }
            });
          };
        });
      }
    });
    res.redirect("/api");
  });
};

module.exports.donate_post = function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      return res.end("Something went wrong!");
    }
    var imageArray = {};
    for (var i = 0; i < req.files.length; i++) {
      imageArray[i] = req.files[i].filename
    }
    var name = req.body.name;
    var product = req.body.product;
    var old = req.body.old;
    var mob = req.body.mob_no;
    var year = req.body.year;
    var descript = req.body.descript;
    var currentId = Date.now();
    const token = req.cookies.jwt;
    var user_id;
    
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        db.query('SELECT * FROM `users` WHERE id=?', [decodedToken.id], async (err, results, fields) => {
          if (err) {
            console.log(err);
          }
          else {
            let ans = JSON.parse(JSON.stringify(results));
            user_id = parseInt(ans[0].id);
            console.log(user_id)
            for (var i = 0; i < req.files.length; i++) {
              var img_name = imageArray[i];
              var sql = "INSERT INTO `donate_table`(`name`,`product`,`mob_no`,`old` ,`image`,`year`,`descript`,`current_date`,`current_id`,`user_id`) VALUES ('" + name + "','" + product + "','" + mob + "','" + old + "','" + img_name + "','" + year + "','" + descript + "',now(),'" + currentId + "','"+user_id+"')";
              db.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted, ID: " + result.insertId);
              })
            }
            var sql1 = "SELECT * FROM `user_sell_products` WHERE `user_id`='" + user_id + "'";
            db.query(sql1, function (err, result1) {
              if (err)
                console.log(err);
              else if (result1.length <= 0) {
                var sql2 = "INSERT INTO `user_sell_products`(`user_id`,`donate`) VALUES ('" + user_id + "',1)";
                db.query(sql2, function (er, result2) {
                  if (er) {
                    console.log(er);
                  }
                });
              } else {
                var val=parseInt(result1[0].donate)+1;
                var sql2 = "UPDATE `user_sell_products` SET `donate`='" + val + "' WHERE `user_id`='" + user_id + "'";
                db.query(sql2, function (err, result2) {
                  if (err) {
                    console.log(err);
                  }
                });
              }
            });
          };
        });
      }
    });
    res.redirect("/api");
  });
};

module.exports.contact_post = function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      return res.end("Something went wrong!");
    }
    var name = req.body.name;
    var address = req.body.address;
    var mob = req.body.phone;
    var descript = req.body.desc;
    var email = req.body.email;
    var sql = "INSERT INTO `contact_table`(`name`,`mob_no`,`email`,`address`,`descript`,`created_on`) VALUES ('" + name + "','" + mob + "','" + email + "','" + address + "','" + descript + "',now())";
    db.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted, ID: " + result.insertId);
    });
    res.redirect("/api");
  });
};