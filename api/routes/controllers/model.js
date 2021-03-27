var mysql = require("mysql");
const dotenv=require('dotenv');
dotenv.config({path:'./.env'});
var con = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
  });

  con.connect;
  global.db = con;

  module.exports=db;