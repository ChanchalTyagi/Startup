var db=require("./model.js");
const jsStringify = require('js-stringify');  

module.exports.home=(req, res) => {
    var sql = "SELECT * FROM `search_table` group by `current_id`";
    db.query(sql, function (err, result) {
      if (err) throw err;
      if (result.length <= 0)
        message = "items not found";
        else
         message=" ";
        var sql1="SELECT * FROM `search_table` ORDER BY `currentdate` LIMIT 12";
        db.query(sql1, function (err, results) {
          if (err) throw err;
          if (results.length <= 0)
            message = "items not found"; 
            res.status(200).render('home.pug', {jsStringify, data:result,data1:results,message:message});
        });
    });
  };
  
  module.exports.Search=(req, res) => {
    var name = req.body.search;
    var sql = "SELECT * FROM `search_table` WHERE `product`='" + name + "' ORDER BY `price` ASC";
    db.query(sql, function (err, result) {
      if (err) throw err;
      if (result.length <= 0)
        message = "items not found!";
      else
        message=" ";
      res.render('home.pug', {jsStringify, data: result,message:message });
    });
  };

  module.exports.Cooler=(req, res) => {
    var name = `cooler`;
    var sql = "SELECT * FROM `search_table` WHERE `product`='" + name + "' ORDER BY `price` ASC";
    db.query(sql, function (err, result) {
      if (err) throw err;
      if (result.length <= 0)
        message = "items not found!";
        var sql1="SELECT * FROM `search_table` ORDER BY `currentdate` LIMIT 12";
        db.query(sql1, function (err, results) {
          if (err) throw err;
          if (results.length <= 0)
            message = "items not found";
            else
        message=" ";
            res.status(200).render('home.pug', {jsStringify, data:result,data1:results,message:message});
        });
    });
  };

  module.exports.Cycle=(req, res) => {
    var name = `cycle`;
    var sql = "SELECT * FROM `search_table` WHERE `product`='" + name + "' ORDER BY `price` ASC";
    db.query(sql, function (err, result) {
      if (err) throw err;
      if (result.length <= 0)
        message = "items not found!";
        var sql1="SELECT * FROM `search_table` ORDER BY `currentdate` LIMIT 12";
        db.query(sql1, function (err, results) {
          if (err) throw err;
          if (results.length <= 0)
            message = "items not found";
            else
        message=" ";
            res.status(200).render('home.pug', {jsStringify, data:result,data1:results,message:message});
        });
    });
  };
  
  module.exports.Iron=(req, res) => {
    var name = `iron`;
    var sql = "SELECT * FROM `search_table` WHERE `product`='" + name + "' ORDER BY `price` ASC";
    db.query(sql, function (err, result) {
      if (err) throw err;
      if (result.length <= 0)
        message = "items not found!";
        var sql1="SELECT * FROM `search_table` ORDER BY `currentdate` LIMIT 12";
        db.query(sql1, function (err, results) {
          if (err) throw err;
          if (results.length <= 0)
            message = "items not found";
            else
        message=" ";
            res.status(200).render('home.pug', {jsStringify, data:result,data1:results,message:message});
        });
    });
  };
  
  module.exports.Books=(req, res) => {
    var name = `books`;
    var sql = "SELECT * FROM `search_table` WHERE `product`='" + name + "' ORDER BY `price` ASC";
    db.query(sql, function (err, result) {
      if (err) throw err;
      if (result.length <= 0)
        message = "items not found!";
        var sql1="SELECT * FROM `search_table` ORDER BY `currentdate` LIMIT 12";
        db.query(sql1, function (err, results) {
          if (err) throw err;
          if (results.length <= 0)
            message = "items not found";
            else
        message=" ";
            res.status(200).render('home.pug', {jsStringify, data:result,data1:results,message:message});
        });
    });
  };
  
  module.exports.Kettle=(req, res) => {
    var name = `kettle`;
    var sql = "SELECT * FROM `search_table` WHERE `product`='" + name + "' ORDER BY `price` ASC";
    db.query(sql, function (err, result) {
      if (err) throw err;
      if (result.length <= 0)
        message = "items not found!";
        var sql1="SELECT * FROM `search_table` ORDER BY `currentdate` LIMIT 12";
        db.query(sql1, function (err, results) {
          if (err) throw err;
          if (results.length <= 0)
            message = "items not found";
            else
        message=" ";
            res.status(200).render('home.pug', {jsStringify, data:result,data1:results,message:message});
        });
    });
  };
  
  module.exports.Image=(req, res) => {
    var id = req.params.id;
    var sql="SELECT * FROM `search_table` WHERE `current_id`='" + id + "'";
    db.query(sql, function (err, result) {
      if (result.length <= 0)
        message = "Profile not found!";
      res.render('image.pug', {jsStringify, data: result});
    });
  };

  module.exports.Cancel=(req, res) => {
    var id = req.params.id;
    var sql = "SELECT * FROM `search_table` WHERE `id`='" + id + "'";
    db.query(sql, function (err, result) {
      if (result.length <= 0)
        message = "Profile not found!";
      res.render('image.pug', {jsStringify, data: result });
    });
  };

  module.exports.Profile_get=(req, res) => {
    var id = req.params.id;
    var sql = "SELECT * FROM `customers` WHERE `user_id`='" + id + "'";
    db.query(sql, function (err, result) {
      if (result.length <= 0)
      {
        var sql1="INSERT INTO `customers`(`user_id`) VALUES ('" + id + "')";
        db.query(sql1,function(err,results){
        if(err){
          console.log(err);
        }
        else
        res.render('profile.pug',{data:''}) 
      })
      }
      else{
        res.render('profile.pug', {jsStringify, data: result });
      }
    });
  };

  module.exports.Profile_post=(req, res) => {
    if(req.body.address)
    console.log("chanchal")
    var id = req.params.id;
    console.log(id);
    if(req.body.address)
    console.log("chanchal")
    var sql = "UPDATE `customers` SET `fname`='"+req.body.fname+"',`lname`='"+req.body.lname+"',`gender`='"+req.body.gender+"',`phone`='"+req.body.phone+"',`address`='"+req.body.address+"',`state`='"+req.body.state+"',`city`='"+req.body.city+"',`pincode`='"+req.body.pincode+"',`country`='"+req.body.country+"'  WHERE `user_id`='" + id + "'";
    db.query(sql, function (err, result) {
      if (err){
        console.log(err);
      }
      else{
        res.render('profile.pug', {jsStringify, data: result });
      }
    });
  };

  module.exports.Cart_get=(req, res) => {
    const token=req.cookies.jwt;
    jwt.verify(token,process.env.JWT_SECRET,function(err,decodedToken){
    if(err){
        res.redirect('/api/login');
    }else{
      var sql = "SELECT  `customers` SET `fname`='"+req.body.fname+"',`lname`='"+req.body.lname+"',`gender`='"+req.body.gender+"',`phone`='"+req.body.phone+"',`address`='"+req.body.address+"',`state`='"+req.body.state+"',`city`='"+req.body.city+"',`pincode`='"+req.body.pincode+"',`country`='"+req.body.country+"'  WHERE `user_id`='" + id + "'";
      db.query(sql, function (err, result) {
        if (err){
          console.log(err);
        }
        else{
          res.render('profile.pug', {jsStringify, data: result });
        }
      });
    }
  })
  };


  
  