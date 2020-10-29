const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const app = express();

const userRouter = require("./user.js");

const port = 8080;

app.listen(port, () => {
  console.log('Running at Port ' + port + '...');
});
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.use("/user", userRouter);

app.use((req, res) => {
  res.sendStatus(404);
});