class Screen{
	menu = null;
	avatar = null;
	constructor(){
		this.menu = new MenuList(windowWidth - 300, 0);
		this.avatar = new Avatar(100,200,30,30);
	}
	draw(){
		clear();
		this.menu.draw();
		this.avatar.draw();
	}
}

var screen;
function setup(){
	createCanvas(windowWidth, windowHeight);
	screen = new Screen();
}

function draw(){
	screen.draw();
}