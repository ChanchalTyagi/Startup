var express=require("express");
const route = express.Router()
var {sign_post,login_get,email_activate_get,forgot_password_get,forgot_password_post,reset_password_get,reset_password_post,login_post,logout_get}=require("./controllers/register.js");
var {home,Search,Cooler,Cycle,Iron,Books,Kettle,Image,Cancel}=require("./controllers/home.js");
var {Sell,donate}=require("./controllers/upload.js");
const { router } = require("websocket");
var {requireAuth,checkUser}=require('./middleware/auth');

route.get('*',checkUser)
route.get('/',home);
route.post("/search",Search);
route.get("/cooler",Cooler);
route.get("/cycle",Cycle);
route.get("/kettle",Kettle);
route.get("/books",Books);
route.get("/iron",Iron);
route.post("/sell",requireAuth,Sell);
route.post("/donate",requireAuth,donate);
route.get("/image/:id",requireAuth,Image);
route.get("/cancel/:id",requireAuth,Cancel);
route.get('/login',login_get);
route.post("/signup",sign_post);
route.get('/reset-password',reset_password_get)
route.get('/authentication/activate/:token',email_activate_get);
route.get("/forgot-password",forgot_password_get);
route.post("/forgot-password",forgot_password_post);
route.get('/resetPassword/:token',reset_password_get);
route.post('/resetPassword/:token',reset_password_post);
route.post("/signin",login_post);
route.get('/logout',logout_get);

module.exports=route;


