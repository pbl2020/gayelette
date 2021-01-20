const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require("http")
const https = require('https');
const app = express();

const userRouter = require("./user.js");
const participantRouter = require("./participant.js");
const roomRouter = require("./room.js");
const loginRouter = require("./login.js");

const port1 = 3000;
const port2 = 3001;

// const PATH = "D:/github/gayelette-server";
const PATH = "C:/Users/S.Kite/Documents/Github/gayelette";
// const PATH = "/Users/ok/Documents/GitHub/gayelette";

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get("/",function(req,res){
  res.sendFile(PATH + "/public/welcome.html");
});
app.use(express.static(path.join(__dirname, 'public')));
app.use("/user", userRouter);
app.use("/participant", participantRouter);
app.use("/room", roomRouter);
app.use("/login", loginRouter);


app.use((req, res) => {
  res.sendStatus(404);
});

const httpServer = http.Server(app);
httpServer.listen(port1,function(){
  console.log("\tサーバがポート%dで起動しました。モード:%s",port1,app.settings.env)
});

const opt = {
  key:  fs.readFileSync(PATH + "/ssl/server.key"),
  cert: fs.readFileSync(PATH + "/ssl/server.crt"),
};
const httpsServer = https.Server(opt, app);
httpsServer.listen(port2,function(){
  console.log("\tサーバがポート%dで起動しました。モード:%s",port2,app.settings.env)
});