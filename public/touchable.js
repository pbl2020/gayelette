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