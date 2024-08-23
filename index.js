let express = require('express')
let app = express()
let http  = require('http')
const path = require('path')
let socket  = require('socket.io')
const server = http.createServer(app)
let io = socket(server)

app.set("view engine","ejs")

app.use(express.static('public'));

io.on("connection", function (socket){
    socket.on("send-location" , function (data){
        io.emit("receive-location", {id:socket.id,...data});
    });
    console.log("connected")
});

app.get('/',(req,res)=>{
    res.render("index")
})



app.listen(3000,()=>{
    console.log("sever is running on port no : 3000")
})