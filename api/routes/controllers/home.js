var db = require("./model.js");
const jsStringify = require('js-stringify');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

module.exports.home = (req, res) => {
  var sql = "SELECT * FROM `sell_table` group by `current_id`";
  db.query(sql, function (err, result) {
    if (err) throw err;
    if (result.length <= 0)
      message = "items not found";
    else
      message = " ";
    var sql1 = "SELECT * FROM `sell_table` ORDER BY `currentdate` LIMIT 12";
    db.query(sql1, function (err, results) {
      if (err) throw err;
      if (results.length <= 0)
        message = "items not found";
      res.status(200).render('home.pug', { jsStringify, data: result, data1: results, message: message });
    });
  });
};

module.exports.Search = (req, res) => {
  var name = req.body.search;
  var sql = "SELECT * FROM `sell_table` WHERE `product`='" + name + "' ORDER BY `price` ASC";
  db.query(sql, function (err, result) {
    if (err) throw err;
    if (result.length <= 0)
      message = "items not found!";
    else
      message = " ";
    res.render('home.pug', { jsStringify, data: result, message: message });
  });
};

module.exports.Cooler = (req, res) => {
  var name = `cooler`;
  var sql = "SELECT * FROM `sell_table` WHERE `product`='" + name + "' ORDER BY `price` ASC";
  db.query(sql, function (err, result) {
    if (err) throw err;
    if (result.length <= 0)
      message = "items not found!";
    var sql1 = "SELECT * FROM `sell_table` ORDER BY `currentdate` LIMIT 12";
    db.query(sql1, function (err, results) {
      if (err) throw err;
      if (results.length <= 0)
        message = "items not found";
      else
        message = " ";
      res.status(200).render('home.pug', { jsStringify, data: result, data1: results, message: message });
    });
  });
};

module.exports.Cycle = (req, res) => {
  var name = `cycle`;
  var sql = "SELECT * FROM `sell_table` WHERE `product`='" + name + "' ORDER BY `price` ASC";
  db.query(sql, function (err, result) {
    if (err) throw err;
    if (result.length <= 0)
      message = "items not found!";
    var sql1 = "SELECT * FROM `sell_table` ORDER BY `currentdate` LIMIT 12";
    db.query(sql1, function (err, results) {
      if (err) throw err;
      if (results.length <= 0)
        message = "items not found";
      else
        message = " ";
      res.status(200).render('home.pug', { jsStringify, data: result, data1: results, message: message });
    });
  });
};

module.exports.Iron = (req, res) => {
  var name = `iron`;
  var sql = "SELECT * FROM `sell_table` WHERE `product`='" + name + "' ORDER BY `price` ASC";
  db.query(sql, function (err, result) {
    if (err) throw err;
    if (result.length <= 0)
      message = "items not found!";
    var sql1 = "SELECT * FROM `sell_table` ORDER BY `currentdate` LIMIT 12";
    db.query(sql1, function (err, results) {
      if (err) throw err;
      if (results.length <= 0)
        message = "items not found";
      else
        message = " ";
      res.status(200).render('home.pug', { jsStringify, data: result, data1: results, message: message });
    });
  });
};

module.exports.Books = (req, res) => {
  var name = `books`;
  var sql = "SELECT * FROM `sell_table` WHERE `product`='" + name + "' ORDER BY `price` ASC";
  db.query(sql, function (err, result) {
    if (err) throw err;
    if (result.length <= 0)
      message = "items not found!";
    var sql1 = "SELECT * FROM `sell_table` ORDER BY `currentdate` LIMIT 12";
    db.query(sql1, function (err, results) {
      if (err) throw err;
      if (results.length <= 0)
        message = "items not found";
      else
        message = " ";
      res.status(200).render('home.pug', { jsStringify, data: result, data1: results, message: message });
    });
  });
};

module.exports.Kettle = (req, res) => {
  var name = `kettle`;
  var sql = "SELECT * FROM `sell_table` WHERE `product`='" + name + "' ORDER BY `price` ASC";
  db.query(sql, function (err, result) {
    if (err) throw err;
    if (result.length <= 0)
      message = "items not found!";
    var sql1 = "SELECT * FROM `sell_table` ORDER BY `currentdate` LIMIT 12";
    db.query(sql1, function (err, results) {
      if (err) throw err;
      if (results.length <= 0)
        message = "items not found";
      else
        message = " ";
      res.status(200).render('home.pug', { jsStringify, data: result, data1: results, message: message });
    });
  });
};

module.exports.Image = (req, res) => {
  var id = req.params.id;
  var sql = "SELECT * FROM `sell_table` WHERE `current_id`='" + id + "'";
  db.query(sql, function (err, result) {
    if (result.length <= 0)
      message = "Profile not found!";
    res.render('image.pug', { jsStringify, data: result });
  });
};

module.exports.Cancel = (req, res) => {
  var id = req.params.id;
  var sql = "SELECT * FROM `sell_table` WHERE `id`='" + id + "'";
  db.query(sql, function (err, result) {
    if (result.length <= 0)
      message = "Profile not found!";
    res.render('image.pug', { jsStringify, data: result });
  });
};

module.exports.Profile_get = (req, res) => {
  var id = req.params.id;
  var sql = "SELECT * FROM `customers` WHERE `user_id`='" + id + "'";
  db.query(sql, function (err, result) {
    if (result.length <= 0) {
      var sql1 = "INSERT INTO `customers`(`user_id`) VALUES ('" + id + "')";
      db.query(sql1, function (err, results) {
        if (err) {
          console.log(err);
        }
        else
          res.render('profile.pug', { data: '' });
      })
    }
    else {
      res.render('profile.pug', { jsStringify, data: result });
    }
  });
};

module.exports.edit_get = (req, res) => {
  var id = req.params.id;
  var sql = "SELECT * FROM `customers` WHERE `user_id`='" + id + "'";
  db.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    else {
      res.render('profile_edit.pug', { jsStringify, data: result });
    }
  });
};

module.exports.edit_post = (req, res) => {
  var user_id = parseInt(req.params.id);
  console.log(user_id);
  if (req.body.address)
    console.log("chanchal")
  var sql = "UPDATE `customers` SET `fname`='" + req.body.fname + "',`lname`='" + req.body.lname + "',`gender`='" + req.body.gender + "',`phone`='" + req.body.phone + "',`address`='" + req.body.address + "',`state`='" + req.body.state + "',`city`='" + req.body.city + "',`pincode`='" + req.body.pcode + "',`country`='" + req.body.country + "'  WHERE `user_id`='" + user_id + "'";
  db.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    else {
      var sql1 = "SELECT * FROM `customers` WHERE `user_id`='" + user_id + "'";
      db.query(sql1, function (er, results) {
        if (er) {
          console.log(err);
        }
        else {
          res.render('profile.pug', { jsStringify, data: results });
        }
      });
    }
  });
};

module.exports.Cart_get = (req, res) => {
  const token = req.cookies.jwt;
  jwt.verify(token, process.env.JWT_SECRET, function (err, decodedToken) {
    if (err) {
      res.redirect('/api/login');
    } else {
      var sql = "SELECT `current_id` from `cart_products` WHERE `user_id`='" + decodedToken.id + "' and `is_active`=1";
      db.query(sql, function (err, result) {
        if (err) {
          console.log(err);
        } else if (result.length <= 0) {
          res.render('cart.pug', { jsStringify, data: "" });
        }
        else {
          let ans = JSON.parse(JSON.stringify(result))
          let arr = [];
          for (var i = 0; i < ans.length; i++) {
            arr[i] = ans[i].current_id;
          }
          var sql1 = "SELECT * from `sell_table` WHERE `current_id` in  (" + arr + ") group by `current_id`";
          db.query(sql1, function (err, results) {
            if (err) {
              console.log(err);
            }
            else {
              res.render('cart.pug', { jsStringify, data: results });
            }
          })
        }
      });
    }
  })
};

module.exports.addProduct = (req, res) => {
  const token = req.cookies.jwt;
  var id = req.params.id;
  jwt.verify(token, process.env.JWT_SECRET, function (err, decodedToken) {
    if (err) {
      res.redirect('/api/login');
    } else {
      var sql = "INSERT into `cart_products`(`user_id`,`current_id`) VALUES('" + decodedToken.id + "','" + id + "')";
      db.query(sql, function (err, result) {
        if (err) {
          console.log(err);
        }
        else {
          res.redirect('/api/cart');
        }
      })
    }
  })
};

module.exports.delProduct = (req, res) => {
  const token = req.cookies.jwt;
  var id = req.params.id;
  jwt.verify(token, process.env.JWT_SECRET, function (err, decodedToken) {
    if (err) {
      res.redirect('/api/login');
    } else {
      var sql = "UPDATE `cart_products` SET `is_active`=0  WHERE `user_id`='" + decodedToken.id + "' and `current_id`='" + id + "'";
      db.query(sql, function (err, result) {
        if (err) {
          console.log(err);
        }
        else {
          res.redirect('/api/cart');
        }
      })
    }
  })
};





