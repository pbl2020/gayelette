const express = require('express');
const { Sequelize } = require('sequelize');
const router = express.Router();

const sqlite3 = require('sqlite3');

//DB objectの取得
const db = require('./models/index');

router.use(express.json());

var userData = {};

router.get('/', (req, res, next) => {
    db.Room.findAll(
      {
        where: {id: req.query.roomId}
      }
    ).then(usrs => {
      res.json(usrs);
    });
});

module.exports = router;