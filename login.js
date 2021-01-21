const express = require('express');
const { Sequelize } = require('sequelize');
const router = express.Router();

const sqlite3 = require('sqlite3');

//DB objectの取得
const db = require('./models/index');

router.use(express.json());

router.post("/", (req, res) =>{
	const {mail, pass} = req.body;

	// ここに 「mail, pass が一致するユーザが存在するか？」
	// 「存在するならば 200 とユーザIdを返す」
	// 「存在しないならば 500 を返す」
	// 処理を書く
	db.User.count(
		{
			where: {mail: mail, pass: pass}
		}
	).then(dataCount => {
			if(dataCount > 0)
				db.User.findAll({
					attribute: ['userId'],
					where: {mail: mail, pass: pass}
				}).then(usrs => {
					res.status(200).json(usrs);
				});
			else
				res.status(500).send("Not found");
	});
});

module.exports = router;