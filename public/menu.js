function easeInOutQuad(x) {
	return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

function checkMenuItemDiff(newObject, oldObject, instance) {
	var check = [];
	for (let j = 0; j < newObject.length; j++) {
		let flag = false;
		for (let i = 0; i < oldObject.length; i++) {
			//idが同じだったら
			if (oldObject[i].id == newObject[j].id) {
				for (let k = 0; k < oldObject.length; k ++) {
					if (oldObject[i].id == instance[k].id) {
						instance[k].name = newObject[j].name;
					}
				}
				flag = true;
			}
		}
		if (flag == false) {
			instance.push(new MenuItem({
				...newObject[j],
				width: 200,
				height: 50
			}));
		}
	}

	for (let i = 0; i < oldObject.length; i++) {
		let flag = false;
		for (let j = 0; j < newObject.length; j++) {
			if (oldObject[i].id == newObject[j].id) {
				flag = true;
			}


		}
		if (flag == false) {
			for (let k = 0; k < instance.length; k++) {
				if (oldObject[i].id == instance[k].id) {
					instance.splice(k, 1);
					break;
				}
			}
		}
	}
	return instance;
}
class MenuItem extends Touchable {
	id = "";
	x = 100;
	y = 100;
	width = 100;
	height = 50;

	name = "";
	icon = "";
	img = null;
	color = "#000000";

	oldMenu = [];

	constructor({
		id,
		x,
		y,
		width,
		height,
		name,
		icon,
		color,
		onClick
	}) {
		super();
		this.id = id;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.name = name;
		this.icon = icon;
		this.color = color;
		this.onClick = onClick;

		if (icon) this.img = loadImage(icon)
	}

	isHover(mouseX, mouseY) {
		const fragX = this.x < mouseX && mouseX < this.x + this.width;
		const fragY = this.y < mouseY && mouseY < this.y + this.height;
		return fragX && fragY;
	}

	setPosition(x, y) {
		this.x = x;
		this.y = y;
	}

	draw() {
		super.draw();

		const padding = 5;
		const r2 = this.height - padding * 2;
		const fontSize = 10;

		ellipse(this.x + r2 / 2 + padding, this.y + r2 / 2 + padding, r2, r2);
		text(this.name, this.x + r2 + padding * 4, this.y + this.height / 2 + fontSize / 2);
		this.img && image(this.img, this.x + padding, this.y + padding, r2, r2);
	}
}

class MenuList {
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
	oldItems = [];

	constructor(x, y, onClick) {
		this.x = x;
		this.y = y;
		this.mx = x;
		this.my = y;

		this.items = [];
	}

	open() {
		if (this.isOpen || this.f !== this.frameRate) return;
		this.isOpen = true;
		this.f = 0;
	}

	close() {
		if (!this.isOpen || this.f !== this.frameRate) return;
		this.isOpen = false;
		this.f = 0;
	}

	handleClickItem(item) {
		console.log(item.name);
	}

	draw() {

		const paddingItems = 15;
		const iconSize = 50;

		if (this.isOpen && this.f != this.frameRate) {
			this.mx = this.x + (this.width - iconSize) * easeInOutQuad(this.f / this.frameRate);
			this.f += 1;
		}
		if (!this.isOpen && this.f != this.frameRate) {
			this.mx = (this.x + this.width - iconSize) - (this.width - iconSize) * easeInOutQuad(this.f / this.frameRate);
			this.f += 1;
		}

		rect(this.mx, this.my, this.width, this.height);
		this.items.forEach((item, i) => {
			item.setPosition(this.mx, this.my + (item.height + paddingItems) * i);
			item.setClickHandler(() => {
				if (this.isOpen) this.close()
				else this.open()
				this.handleClickItem(item)
			})
			item.draw();
		})
	}
	setMenuData(items) {
		this.items = checkMenuItemDiff(items, this.oldItems, this.items);
		//this.screen.setMenu(items);
		console.log(this.items);
		this.oldItems = items;
	}
}