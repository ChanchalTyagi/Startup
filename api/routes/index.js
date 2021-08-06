var express=require("express");
const route = express.Router();
var {sign_post,login_get,email_activate_get,forgot_password_get,forgot_password_post,reset_password_get,reset_password_post,login_post,logout_get}=require("./controllers/register.js");
var {home,Search,Cooler,Cycle,Iron,Books,Kettle,Image,Cancel,myItems,Profile_get,edit_post,edit_get,Cart_get,addProductCart,delProductCart,delProductDonate,delProductSell}=require("./controllers/home.js");
var {Sell_post,donate_post,donate_get,Sell_get,contact_get,contact_post}=require("./controllers/upload.js");
const { router } = require("websocket");
var {requireAuth,checkUser}=require('./middleware/auth');

route.get('*',checkUser);
route.get('/',home);
route.post("/search",Search);
route.get("/cooler",Cooler);
route.get("/cycle",Cycle);
route.get("/kettle",Kettle);
route.get("/books",Books);
route.get("/iron",Iron);
route.get('/profile/:id',Profile_get);
route.get('/myitems/:id',myItems);
route.get('/edit/:id',edit_get);
route.post('/edit/:id',edit_post);
route.get("/sell",requireAuth,Sell_get);
route.post("/sell",Sell_post);
route.get('/cart',requireAuth,Cart_get);
route.get("/donate",requireAuth,donate_get);
route.post("/donate",donate_post);
route.get("/contact",requireAuth,contact_get);
route.post("/contact",contact_post);
route.get("/image/:id",requireAuth,Image);
route.get("/cancel/:id",requireAuth,Cancel);
route.get("/add/product/cart/:id",requireAuth,addProductCart);
route.get("/delete/product/cart/:id",requireAuth,delProductCart);
route.get("/delete/product/donate/:id",requireAuth,delProductDonate);
route.get("/delete/product/sell/:id",requireAuth,delProductSell);
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


