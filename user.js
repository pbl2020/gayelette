const express = require('express');
const { Sequelize } = require('sequelize');
const router = express.Router();

const sqlite3 = require('sqlite3');

//DB objectの取得
const db = require('./models/index');

router.use(express.json());

var userData = {};

router.get('/', (req, res, next) => {
  db.User.findAll().then(usrs => {
    res.json(usrs);
  });
});

router.post("/", (req, res) =>{ //addUser
	const date = Date.now();

	userData[date] = req.body;
	res.status(200).send("OK!");
})


module.exports = router;