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
  
  