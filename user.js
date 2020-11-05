const express = require('express');
const router = express.Router();

router.use(express.json());

var userData = {};

router.get("/", (req, res) =>{
	res.send(userData);
})

router.post("/", (req, res) =>{
	const date = Date.now();

	userData[date] = req.body;
	res.status(200).send("OK!");
})

module.exports = router;