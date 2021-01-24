const express = require('express');
const { Sequelize } = require('sequelize');
const router = express.Router();

const sqlite3 = require('sqlite3');

//DB objectの取得
const db = require('./models/index');

router.use(express.json());

var userData = {};

router.get('/', (req, res, next) => {
	db.User.findAll(
		{
			where: {id: req.query.userId}
		}
	).then(usrs => {
		res.json(usrs);
	});
});

router.post("/", (req, res) =>{
	const id = Date.now().toString();
	db.User.create({
		id: id,
		name: req.body.name,
		mail: req.body.mail,
		pass: req.body.pass
	}).then(() =>{
		res.status(200).json({
			id: id
		})
	}).catch((err) =>{
		res.status(500).send(err);
	})
})

module.exports = router;