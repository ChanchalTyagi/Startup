const jwt = require('jsonwebtoken')
const bcrypt=require('bcryptjs');
const dotenv=require('dotenv');
dotenv.config({path:'./../controllers/.env'});
var db=require("./../controllers/model.js");
const requireAuth = (req, res, next) => {
    const token=req.cookies.jwt;
    if(token)
    {
        jwt.verify(token,process.env.JWT_SECRET,function(err,decodedToken){
        if(err){
            res.redirect('/api/login');
        }else{
            next();
        }
    });
    }else{
        res.redirect('/api/login');
    }
}

const checkUser = (req, res, next) => {
    const token=req.cookies.jwt;
    if(token)
    {
        jwt.verify(token,process.env.JWT_SECRET,async(err,decodedToken)=>{
            if(err){
                console.log(err);
                res.locals.user=null;
                next();
            }else{
                db.query('SELECT * FROM `users` WHERE id=?',[decodedToken.id],async (err,results,fields)=>{
                    if(err)
                    console.log(err)
                    else{
                        let ans=JSON.parse(JSON.stringify(results))
                        res.locals.user=ans[0];
                        next();
                    }
                })
            }
        })
    }
    else
    {
        res.locals.user='';
        next();
    }
}

module.exports = {requireAuth,checkUser};