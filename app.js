const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const app = express();

const userRouter = require("./user.js");

const csr = fs.readFileSync("./server.csr");
const key = fs.readFileSync("./server.key");

const options = {
  key:  key,
  cert: csr
};

const server = https.createServer(options, app);

const port = 8080;

server.listen(port);

app.use(express.static(path.join(__dirname, 'public')));
app.use("/user", userRouter);

app.use((req, res) => {
  res.sendStatus(404);
});