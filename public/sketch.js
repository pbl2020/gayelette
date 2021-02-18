class Screen{
	menu = null;
	avatar = null;
	stage = null;
	contextMenu = null;
	moveX = 0;
	moveY = 0;
	hypo = 0;
	moveAngle = 0;
	user = {
		name: "YourName",
		id: "YourId",
		x: 100,
		y: 200,
		angle: 0,
		isMe : 1
	};
	otheruser = []

	constructor(){
		this.menu = new MenuList(windowWidth - 300, 0);
		this.stage = new Stage(this.user);
		this.contextMenu = new ContextMenu([{
			text: "新規作成",
			onClick: () => {console.log("新規作成")}
		}, {
			text: "  会議室",
			onClick: () => {console.log("会議室")}
		}, {
			text: "  プレゼンテーション",
			onClick: () => {console.log("プレゼンテーション")}
		}]);
		this.stage.setClick(this.handleClick.bind(this));
		this.setData(this.otheruser);
	}
	handleClick(){
		this.contextMenu.setVisible(false);

		if(mouseButton === LEFT){
			let moveX = mouseX - this.user.x;
			let moveY = mouseY - this.user.y;
			let moveAngle = (degrees(Math.atan2(moveY,moveX)) + 360) % 360;
			this.stage.setMyAvatar(mouseX,mouseY,moveAngle);

			sendPosture(mouseX, mouseY, moveAngle);

			this.user = {...this.user, x: mouseX, y: mouseY ,angle: moveAngle}
		}else if(mouseButton === RIGHT){
			this.contextMenu.setVisible(true);
			this.contextMenu.setPosition(mouseX, mouseY - 5);
		}
	}
	setData(otheruser){
		console.log(otheruser);
		this.otheruser = otheruser;
		this.stage.setAvatars(otheruser);
	}
	draw(){
		if(config.tick % 150 === 0){
			getPosture(config.room.id).then(res => {
				const user = res.filter(user => user.userId !== config.user.id);
				this.setData(user)
			});
		}

		if(config.tick % 150 === 0){
			this.otheruser.forEach(u =>{
				const volume = calcVolume(this.user, u);
				controlVolume(u.skywayId, volume);
			})
		}

		clear();
		this.menu.draw();
		this.stage.draw();
		this.contextMenu.draw();
	}
}

var screen;

function setup() {
	createCanvas(windowWidth, windowHeight);
	screen = new Screen();
}
function draw(){
	config.tick += 1;
	screen.draw();
}
document.oncontextmenu = (e) => {
	e.preventDefault();
}