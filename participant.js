const express = require('express');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;
const router = express.Router();

const sqlite3 = require('sqlite3');

//DB objectの取得
const db = require('./models/index');

router.use(express.json());

var usrPar = {};


router.post('/', (req, res) => {
  db.RoomParticipant.count(
		{
			where: {roomId: req.body.roomId, userId: req.body.userId,}
		}
	).then(dataCount => {
    if(dataCount > 0){
      db.RoomParticipant.update(
        {x: req.body.x, y: req.body.y, angle: req.body.angle, time: Date.now(), skywayId: req.body.skywayId},
        {where: {roomId: req.body.roomId, userId: req.body.userId}}
      ).then(() => {})
      res.sendStatus(200);
    }
    else{
      db.RoomParticipant.create({
        roomId: req.body.roomId,
        userId: req.body.userId,
        username: req.body.username || "",
        role: req.body.role,
        x: req.body.x,
        y: req.body.y,
        angle: req.body.angle,
        time: Date.now(),
        skywayId: req.body.skywayId
      }).then(() => {})
      res.sendStatus(200);
    }
  });
});

router.get('/', (req, res, next) => {
  var t = Date.now() - 60000;
  db.RoomParticipant.findAll(
    {
      attribute: ['userId', 'x', 'y', 'angle', 'skywayId'],
      where: {roomId: req.query.roomId,time:{[Op.gte]: t}}
    }
  ).then(usrs => {
    res.json(usrs);
  });
});

module.exports = router;