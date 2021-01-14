const express = require('express');
const { Sequelize } = require('sequelize');
const router = express.Router();

const sqlite3 = require('sqlite3');

//DB objectの取得
const db = require('./models/index');

router.use(express.json());

var usrPar = {};



router.post('/', (req, res) => {
  db.RoomParticipant.update(
    {x: req.body.x, y: req.body.y, angle: req.body.angle},
    {where: {roomId: req.body.roomId, userId: req.body.userId}}
  ).then(() => {})
  res.sendStatus(200).send("OK");
});

/*
router.post("/", (req, res) =>{ //addUser
	const date = Date.now();

	userData[date] = req.body;
	res.status(200).send("OK!");
})
*/

module.exports = router;