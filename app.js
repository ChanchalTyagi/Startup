const express = require("express");
var path = require("path");
var http = require("http");
const dotenv=require('dotenv');
dotenv.config({path:'./api/routes/controllers/.env'});
const cookieParser=require('cookie-parser');       
const app = express();
const bodyParser = require("body-parser");
const jsStringify = require('js-stringify');  
const webpush=require("web-push");      
var cors=require('cors');                        
const port = 8080; 
var routes=require("./api/routes/index.js"); 
var db=require("./api/routes/controllers/model.js");  
app.set('views', path.join(__dirname, 'views'));   
app.set('view engine', 'pug'); 
app.use('/static', express.static('static'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use("/api",routes);
webpush.setVapidDetails(
  "mailto:chanchaltyagi3727@gmail.com",
  process.env.PUBLIC_KEY,
  process.env.PRIVATE_KEY
);

app.post("/subscribe", (req, res) => {
  const subscription = req.body;
  res.status(201).json({});
  const payload = JSON.stringify({ title: "Push Test" });
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

// var mysql       = require('mysql');
const server    = require('http').createServer(app);
const io        = require('socket.io')(server);

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules', )));
let clientSocketIds = [];
let connectedUsers= [];

app.post('/api/login-chat', (req, res) =>{
    db.query(`SELECT user_name, user_id, user_full_name, user_image from chat_users where user_name="${req.body.username}" AND user_password="${req.body.password}"`, function (error, results, fields) {
        if (error) throw error;
        if(results.length == 1) {
            res.send({status:true, data: results[0]})
        } else {
            res.send({status:false})
        }
    });
})

const getSocketByUserId = (userId) =>{
    let socket = '';
    for(let i = 0; i<clientSocketIds.length; i++) {
        if(clientSocketIds[i].userId == userId) {
            socket = clientSocketIds[i].socket;
            break;
        }
    }
    return socket;
}

io.on('connection', socket => {
    console.log('connected')
    socket.on('disconnect', () => {
        console.log("disconnected")
        connectedUsers = connectedUsers.filter(item => item.socketId != socket.id);
        io.emit('updateUserList', connectedUsers)
    });

    socket.on('loggedin', function(user) {
        clientSocketIds.push({socket: socket, userId:  user.user_id});
        connectedUsers = connectedUsers.filter(item => item.user_id != user.user_id);
        connectedUsers.push({...user, socketId: socket.id})
        io.emit('updateUserList', connectedUsers)
    });

    socket.on('create', function(data) {
        console.log("create room")
        socket.join(data.room);
        let withSocket = getSocketByUserId(data.withUserId);
        socket.broadcast.to(withSocket.id).emit("invite",{room:data});
    });
    
    socket.on('joinRoom', function(data) {
        socket.join(data.room.room);
    });

    socket.on('message', function(data) {
        socket.broadcast.to(data.room).emit('message', data);
    })
});

app.get('/api/contact', (req, res) => {
  const params = {}
  res.status(200).render('contact.pug', params);
});

app.get('/api/sell', (req, res) => {
  const params = {}
  res.status(200).render('sell.pug', params);
});

app.get('/api/about', (req, res) => {
  const params = {}
  res.status(200).render('about.pug', params);
});

app.get('/api/cart/:id', (req, res) => {
  const params = {}
  res.status(200).render('cart.pug', params);
});

app.get('/api/services', (req, res) => {
  const params = {}
  res.status(200).render('services.pug', params);
});

app.get('/api/login-chat',(req,res)=>{
  const params={}
  res.status(200).render('chat.pug',params)
});

app.get('/api/donate',(req,res)=>{
  const params={}
  res.status(200).render('donate.pug',params)
});

// app.get('/profile/:id', (req, res) => {
//   var message = '';
//   var id = req.params.id;
//   var sql = "SELECT * FROM `search_table` WHERE `id`='" + id + "'";
//   db.query(sql, function (err, result) {
//     if (result.length <= 0)
//       message = "Profile not found!";
//     res.render('profile.pug', {jsStringify, data: result, message: message });
//   });
// });

app.get('/api/donation',(req,res)=>{
  const params={}
  res.status(200).render('donation.pug',params)
});

server.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});

