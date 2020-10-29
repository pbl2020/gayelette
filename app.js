/**
 * /app.js
 */
// express モジュールのインスタンス作成

"use strict";
var express = require("express");
var app = express();
app.use(express.static("wwwroot"));
app.get("/",function(req,res){
  res.sendFile("D:/github/gayelette-server/wwwroot/test.html");
});

let port1 = 3000;
let port2 = 3001;

//httpサーバ
var http = require("http").Server(app);
http.listen(port1,function(){
  console.log("\tサーバがポート%dで起動しました。モード:%s",port1,app.settings.env)
});

//httpsサーバ
var fs = require("fs");
var opt = {
  key:  fs.readFileSync("D:/github/gayelette-server/ssl/server.key"),
  cert: fs.readFileSync("D:/github/gayelette-server/ssl/server.crt"),
};
var https = require("https").Server(opt,app);
https.listen(port2,function(){
  console.log("\tサーバがポート%dで起動しました。モード:%s",port2,app.settings.env)
});
