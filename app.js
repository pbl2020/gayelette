const express = require('express');
const app = express();
const path = require('path');

const userRouter = require("./user.js");

app.listen(8080, () => {
  console.log('Running at Port 8080...');
});

app.use(express.static(path.join(__dirname, 'public')));
app.use("/user", userRouter);

app.use((req, res) => {
  res.sendStatus(404);
});