class Screen {
	menu = null;
	avatar = null;
	stage = null;
	moveX = 0;
	moveY = 0;
	hypo = 0;
	moveAngle = 0;
	user = {
		name: "koyama",
		id: "0312018086",
		x: 100,
		y: 200,
		size: 30,
		angle: 0
	};
	otheruser = [{
			name: "shimizu",
			id: "0312018087",
			x: 150,
			y: 250,
			size: 30,
			angle: 90
		},

		{
			name: "masuda",
			id: "0312018088",
			x: 200,
			y: 300,
			size: 30,
			angle: 45
		}
	]

	constructor() {
		this.menu = new MenuList(windowWidth - 300, 0);
		this.stage = new Stage(this.user);
		this.stage.setClick(this.handleClick.bind(this));
		console.log(this.otheruser);
		this.setData(this.otheruser);
		setTimeout(() => {
			this.setData([{
					name: "shimi",
					id: "0312018087",
					x: 400,
					y: 400,
					size: 30,
					angle: 90
				},
				{
					name: "koyama",
					id: "0312018062",
					x: 100,
					y: 100,
					size: 30,
					angle: 90
				},
				{
					name: "oota",
					id: "0312018063",
					x: 300,
					y: 100,
					size: 30,
					angle: 90
				}
			])
		}, 5000);
	}
	handleClick() {
		let moveX = mouseX - this.user.x;
		let moveY = mouseY - this.user.y;
		let hypo = Math.sqrt(Math.pow(moveX, 2) + Math.pow(moveY, 2));
		let moveAngle = (Math.atan2(moveY, moveX) * (180 / Math.PI) + 90 + 360) % 360;
		this.stage.setMyAvatar(mouseX, mouseY, moveAngle);

		this.user = { ...this.user, x: mouseX, y: mouseY, angle: moveAngle }
	}
	setData(otheruser) {
		this.otheruser = otheruser;
		this.stage.setAvatars(otheruser);
		this.menu.setMenuData(otheruser);
		console.log(this.otheruser);

	}
	draw() {

		clear();
		this.menu.draw();
		this.stage.draw();
	}
}

var screen;

function setup() {
	createCanvas(windowWidth, windowHeight);
	screen = new Screen();

}

function draw() {
	screen.draw();
}