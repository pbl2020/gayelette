class Touchable{

	static frame = 0;
	static objList = [];
	static _prevMouseIsPressed = false;

	onClick = null;
	zIndex = 1;

	_shouldEventExecute(){
		if(Touchable.frame !== config.tick){
			// クリックされたならzIndexが高い順に探索し、クリックされたオブジェクトのonClickを発火させる
			if(!Touchable._prevMouseIsPressed && mouseIsPressed){
				Touchable.objList.sort((a, b) => b.zIndex - a.zIndex);
				for(let i = 0; i < Touchable.objList.length; i++){
					const obj = Touchable.objList[i];
					if(obj.isHover(mouseX, mouseY) && obj.onClick){
						obj.onClick();
						break;
					}
				}
			}

			Touchable.frame = config.tick;
			Touchable.objList = [];
		}

		Touchable.objList.push(this);
		Touchable._prevMouseIsPressed = mouseIsPressed;
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