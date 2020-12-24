class Touchable{

	static frame = 0;
	static objList = [];
	static _prevMouseIsPressed = false;

	onClick = null;
	zIndex = 1;


	_shouldEventExecute(){
		if(this.frame !== config.tick){
			// クリックされたならzIndexが高い順に探索し、クリックされたオブジェクトのonClickを発火させる
			if(!this._prevMouseIsPressed && mouseIsPressed){
				this.objList.sort((a, b) => b.zIndex - a.zIndex);
				for(let i = 0; i < this.objList.length; i++){
					const obj = this.objList[i];
					if(obj.isHover(mouseX, mouseY) && obj.onClick){
						obj.onClick();
						break;
					}
				}
			}

			this.frame = config.tick;
			this.objList = [];
		}

		this.objList.push(this);
		this._prevMouseIsPressed = mouseIsPressed;
	}

	isHover(x, y){
		return false;
	};

	setClickHandler(event){
		this.onClick = event;
	}

	draw(){
		this._shouldEventExecute();
	}
}