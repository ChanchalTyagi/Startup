const dotenv=require('dotenv');
dotenv.config({path:'./.env'});
var mysql = require("mysql");
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const cookieParser=require('cookie-parser');                           
const mailgun = require("mailgun-js");
const DOMAIN = 'sandboxbc3c3d3d05794be29b12bdc44a87f655.mailgun.org';
const mg = mailgun({apiKey:process.env.MAILGUN_APIKEY, domain:DOMAIN});
dotenv.config({path:'./.env'});
var db=require("./model.js");

module.exports.sign_get=(req, res) => {
    const params = {}
    res.status(200).render('signUp.pug', params);
  };
  
module.exports.sign_post=(req,res)=>{
    var email=req.body.email;
    var password=req.body.psw;
    var passwordConfirm=req.body.pswconfirm;
      if(!email||!password||!passwordConfirm){
        return res.status(400).render('signUp.pug',{message:'Please provide an email and password'})
      }
      db.query('SELECT email FROM `login-sign` WHERE email=?',[email],async (err,results,fields)=>{
       if(err)
       {
         console.log(err);
       }
       if(results.length>0){
         return res.render('signUp.pug',{message:'The email is already in use'})
       }
       else if(password!=passwordConfirm){
         return res.render('signUp.pug',{message:'Password doesnt match'})
       }
       const token=jwt.sign({email,password},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
      });
  
       const data = {
        from: 'chanchaltyagi3727@gmail.com',
        to: email,
        subject: 'Account Activation Link',
        html:`
            <h2>Please click on given link to activate your account</h2>
            <p>${process.env.CLIENT_URL}/authentication/activate/${token}</p>
        `
      };  
      mg.messages().send(data, function (error, body) {
        if(error)
        {
          return res.json({
            error:err.message
          })
        }
        return res.json({message:'Email has been sent , kindly activate your account'});
      });
      });
  };

  module.exports.email_activate_get=(req,res)=>{
    const params={}
    res.status(200).render('otp.pug',params)
  };
  
  module.exports.email_activate_post=(req,res)=>{
    const {token}=req.body;
    if(token)
    {
      jwt.verify(token,process.env.JWT_SECRET,function(err,decodedToken){
        if(err){
          return res.status(400).json({error:"Incorrect or Expired link"})
        }
        const {email,password}=decodedToken;
        db.query('SELECT email FROM `login-sign` WHERE email=?',[email],async (err,results,fields)=>{
          if(err)
          {
            console.log(err);
          }
          if(results.length>0){
            return res.render('signUp.pug',{message:'The email is already in use'})
          }
          let hashedPassword=await bcrypt.hash(password,8);
          var sql="INSERT INTO `login-sign`(`email`,`password`) VALUES ('" + email + "','" + hashedPassword + "')";
          db.query(sql,function(err,results){
            if(err){
              console.log("Error in signup while account activation link: ",err);
              return res.status(400).json({error:'Error activating account'})
            }
            else
            res.json({message:"Signup success"}) 
          })
        })
      })
    }else{
      return res.json({error:"Something went wrong"})
    }
  };
  
  module.exports.forgot_password=(req,res)=>{
      const {email}=req.body;
      db.query('SELECT email FROM `login-sign` WHERE email=?',[email],async (err,results,fields)=>{
        if(err||results.length<=0)
        {
          return res.send({message:'Email doesnt exists'})
        }
        const token=jwt.sign({id:results[0].id},process.env.JWT_RESET_KEY,{
          expiresIn:process.env.JWT_EXPIRES_IN
        });
    
         const data = {
          from: 'chanchaltyagi3727@gmail.com',
          to: email,
          subject: 'Reset Password Link',
          html:`
              <h2>Please click on given link to reset your account</h2>
              <p>${process.env.CLIENT_URL}/resetPassword/${token}</p>
          `
        }; 
      var sql1="UPDATE `login-sign` SET `resetlink` = ${token} WHERE `id`='"+ results[0].id+"'";
      db.query(sql1,function(err,results){
        if(err){
          return res.status(400).json({error:'Reset Password Link error'})
        }
        else
        {
          mg.messages().send(data, function (error, body) {
            if(error)
            {
              return res.json({
                error:err.message
              })
            }
            return res.json({message:'Email has been sent , kindly follow the instructions'});
          });
        }
      })
      })
    };
    
  module.exports.reset_password=(req,res)=>{
    const {resetLink,newPass}=req.body;
    if(resetLink)
    {
      jwt.verify(resetLink,process.env.JWT_RESET_KEY,function(err,decodedToken){
        if(err){
          return res.status(400).json({error:"Incorrect or Expired link"})
        }
        db.query('SELECT * FROM `login-sign` WHERE `resetlink`=?',[resetLink],async (err,results,fields)=>{
          if(err||results.length<=0)
          {
            return res.status(400).json({message:'The user with this token doesnt exists'})
          }
          let hashedPassword=await bcrypt.hash(newPass,8);
          var sql="UPDATE `login-sign` SET `password` = ${hashedPassword} WHERE `resetlink`=${resetLink}";
          db.query(sql,function(err,results){
            if(err){
              return res.status(400).json({error:'Reset Password Link error'})
            }
            else
            {
                return res.json({message:'Your password has been changed'});
            }
          });
        });
      });
    } 
    else{
      return res.status(401).json({Error:'Authentication error'})
    }
  };

  module.exports.login_get=(req, res) => {
    const params = {}
    res.status(200).render('login.pug', params);
  };

  module.exports.login_post=async (req,res)=>{
    try{
      const email=req.body.email;
      const password=req.body.psw;
      if(!email||!password){
        return res.status(400).render('login.pug',{message:'Please provide an email and password'})
      }
      db.query('SELECT * FROM `login-sign` WHERE email=?',[email],async (err,results,fields)=>{
        if(!results||!(await bcrypt.compare(password,results[0].password))){
          res.status(401).render('login.pug',{message:'Email or password is incorrect'})
        }
        else{
          const id=results[0].id;
          const token=jwt.sign({ id },process.env.JWT_SECRET,{
            expiresIn:process.env.JWT_EXPIRES_IN
          });
          console.log('The token is:'+token);
          const cookieOptions={
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRES*24*60*60*1000
            ),
            httpOnly: true
          }
          res.cookie('jwt',token,cookieOptions);
          res.status(200).redirect('/');
        }
      })
    }catch(err){
       console.log(err);
    }
    };
  