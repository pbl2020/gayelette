class ContextMenuItem extends Touchable{
	text = "";
	x = 0;
	y = 0;
	zIndex = 5;
	width = 150;
	height = 20;

	constructor(text){
		super();
		this.text = text;
	}

	setPosition(x, y){
		this.x = x;
		this.y = y;
	}

	isHover(x, y){
		const fragX = this.x < x && x < this.x + this.width;
		const fragY = this.y < y && y < this.y + this.height;
		return fragX && fragY;
	}

	draw(){
		super.draw();

		const padding = 5;
		const fontSize = 10;

		push();
			fill("#888");
		if(this.isHover(mouseX, mouseY)){
			rect(this.x, this.y, this.width, this.height);
		}
		text(this.text, this.x + padding * 4, this.y + this.height / 2 + fontSize / 2);
		pop();
	}
}

class ContextMenu{
	x = 0;
	y = 0;
	visible = false;

	width = 150;
	paddingY = 5;
	itemHeight = 20;

	item = [{
		text: "sample",
		onClick: () => {}
	}];
	constructor(item){
		this.item = item.map(i => {
			const obj = new ContextMenuItem(i.text);
			obj.setClickHandler(i.onClick);
			return obj;
		});
	}

	setItem(item){
		this.item = item.map(i => {
			const obj = new ContextMenuItem(i.text);
			obj.setClickHandler(i.onClick);
			return obj;
		});
	}

	setVisible(visible){
		this.visible = visible;
	}

	setPosition(x, y){
		this.x = x;
		this.y = y;
	}

	draw(){
		if(!this.visible)
			return;

		push();
		drawingContext.shadowBlur = 2;
  	drawingContext.shadowColor = 'black';
  	stroke("#FFFFFF")
  	fill("#FFFFFF")
  	rect(this.x, this.y, this.width, this.paddingY * 2 + this.itemHeight * this.item.length);
		pop();
		for(let i = 0; i < this.item.length; i++){
			const x = this.x;
			const y = this.y + this.paddingY + i * this.itemHeight;
			this.item[i].setPosition(x, y);
			this.item[i].draw();
		}
	}
}