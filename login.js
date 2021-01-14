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
	// 「存在するならば 200 を返す」
	// 「存在しないならば 500 を返す」
	// 処理を書く

})

module.exports = router;