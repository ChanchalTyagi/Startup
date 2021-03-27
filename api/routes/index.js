var express=require("express");
const route = express.Router()
var {sign_get,sign_post,email_activate_get,email_activate_post,forgot_password,reset_password,login_get,login_post}=require("./controllers/register.js");
var {home,Search,Cooler,Cycle,Iron,Books,Kettle,Image,Cancel}=require("./controllers/home.js");
var {Sell,donate}=require("./controllers/upload.js");

route.get('/',home);
route.post("/search",Search);
route.get("/cooler",Cooler);
route.get("/cycle",Cycle);
route.get("/kettle",Kettle);
route.get("/books",Books);
route.get("/iron",Iron);
route.post("/sell",Sell);
route.post("/donate",donate);
route.get("/image/:id",Image);
route.get("/cancel/:id",Cancel);
route.get("/SignUp",sign_get);  
route.post("/SignUp",sign_post);
route.get("/email-activate",email_activate_get);
route.get("/email-activate",email_activate_post);
route.put("/reset-password",reset_password);
route.put("/forgot-password",forgot_password);
route.get("/login",login_get);
route.post("/login",login_post);

module.exports=route;