function easeInOutQuad(x) {
	return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

class Touchable{

	onClick = null;

	_prevMouseIsPressed = false;

	_shouldEventExecute(){
		if(!this._prevMouseIsPressed && mouseIsPressed && this.isClicked(mouseX, mouseY))
			this.onClick && this.onClick();
		this._prevMouseIsPressed = mouseIsPressed;
	}

	isClicked(x, y){
		return false;
	};

	setClickHandler(event){
		this.onClick = event;
	}

	draw(){
		this._shouldEventExecute();
	}
}

class MenuItem extends Touchable{
	x = 100;
	y = 100;
	width = 100;
	height = 50;

	name = "";
	icon = "";
	img = null;
	color = "#000000";

	constructor({
		x,
		y,
		width,
		height,
		name,
		icon,
		color,
		onClick
	}){
		super();
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.name = name;
		this.icon = icon;
		this.color = color;
		this.onClick = onClick;

		if(icon) this.img = loadImage(icon)
	}

	isClicked(mouseX, mouseY){
		const fragX = this.x < mouseX && mouseX < this.x + this.width;
		const fragY = this.y < mouseY && mouseY < this.y + this.height;
		return fragX && fragY;
	}

	setPosition(x, y){
		this.x = x;
		this.y = y;
	}

	draw(){
		super.draw();

		const padding = 5;
		const r2 = this.height - padding * 2;
		const fontSize = 10;

		ellipse(this.x + r2 / 2 + padding, this.y + r2 / 2 + padding, r2, r2);
		text(this.name, this.x + r2 + padding * 4, this.y + this.height / 2 + fontSize / 2);
		this.img && image(this.img, this.x + padding, this.y + padding, r2, r2);
	}
}

class MenuList{
	mx = 100;
	my = 100;

	x = 100;
	y = 100;
	width = 300;
	height = 300;

	isOpen = false;
	frameRate = 50;
	f = 50;

	items = [];
	constructor(x, y, onClick){
		this.x = x;
		this.y = y;
		this.mx = x;
		this.my = y;

		this.items = [
			new MenuItem({
				x: 100,
				y: 100,
				width: 200,
				height: 50,
				icon: "https://cdn.discordapp.com/avatars/384897317389729792/cd84001b41e614baf9b11e01680b8917.png?size=128",
				name: "Kaito"
			}),
			new MenuItem({
				x: 100,
				y: 100,
				width: 200,
				height: 50,
				icon: "https://cdn.discordapp.com/avatars/279493175125737472/d999dc661fad845b0bb3c35097196e93.png?size=128",
				name: "Shimizu"
			})
		];
	}

	open(){
		if(this.isOpen || this.f !== this.frameRate) return;
		this.isOpen = true;
		this.f = 0;
	}

	close(){
		if(!this.isOpen || this.f !== this.frameRate) return;
		this.isOpen = false;
		this.f = 0;
	}

	handleClickItem(item){
		console.log(item.name);
	}

	draw(){

		const paddingItems = 15;
		const iconSize = 50;

		if(this.isOpen && this.f != this.frameRate){
			this.mx = this.x + (this.width - iconSize) * easeInOutQuad(this.f / this.frameRate);
			this.f += 1;
		}
		if(!this.isOpen && this.f != this.frameRate){
			this.mx = (this.x + this.width - iconSize) - (this.width - iconSize) * easeInOutQuad(this.f / this.frameRate);
			this.f += 1;
		}
		
		rect(this.mx, this.my, this.width, this.height);
		this.items.forEach((item, i) =>{
			item.setPosition(this.mx, this.my + (item.height + paddingItems) * i);
			item.setClickHandler(() =>{
				if(this.isOpen) this.close()
				else this.open()
				this.handleClickItem(item)
			})
			item.draw();
		})
	}
}