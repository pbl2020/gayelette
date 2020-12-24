function CheckObjectDiff( newObject, oldObject,instance)
{

	var check =[];
	for (let j = 0; j < newObject.length; j++){
		let flag = false;
		for(let i =0; i < oldObject.length;i++){
			//idが同じだったら
			if(oldObject[i].id == newObject[j].id){
				flag = true;
				if(oldObject[i].x != newObject[j].x || oldObject[i].y != newObject[j].y || oldObject[i].angle != newObject[j].angle){
					for (let k = 0; k < instance.length; k++){
						if(newObject[j].id != instance[k].id){
							continue;
						}
						instance[k].setPosition(newObject[i].x,newObject[i].y,newObject[i].angle);							
					}

				}
			}
		}
		if(flag == false){
	    	instance.push(new Avatar(newObject[j].name,newObject[j].id,newObject[j].x,newObject[j].y,newObject[j].size,newObject[j].angle));

		}
	}

	for(let i =0; i < oldObject.length;i++){
		let flag = false;
		for (let j = 0; j < newObject.length; j++){
			if(oldObject[i].id == newObject[j].id){
				flag = true;
		}


	}
		if(flag == false){
		for (let k = 0; k < instance.length; k++){
			if(oldObject[i].id == instance[k].id){
				instance.splice(k,1);
				break;
			}
		}
	}
}


	return instance;
}
class Stage extends Touchable{
	onClick = null;
	myAvatar = null;
	avatars = [];
	oldAvatars = [];
	constructor(myAvatar){
		super();
	    // setup

	    /*
	    this.avatars = [];
	    for (let i =0; i < avatars.length;i++){
	    	this.avatars.push(new Avatar(avatars[i].name,avatars[i].id,avatars[i].x,avatars[i].y,
	    		avatars[i].size,avatars[i].angle));
	    }
	    */

	    this.myAvatar = new Avatar(myAvatar.name,myAvatar.id,myAvatar.x,myAvatar.y,
	    				myAvatar.size,myAvatar.angle);


  	}
	draw(){
		super.draw()
		this.myAvatar.draw();
    	for (let i =0; i < this.avatars.length;i++){
    		if(this.avatars[i])
	    		this.avatars[i].draw();
    	}
	}

	isHover(mouseX, mouseY){
		const fragX = mouseX < windowWidth - 300;
		const fragY = mouseY < windowHeight;
		console.log(fragX, fragY)
		return fragX && fragY;
	}
	setClick(onClick){
		this.onClick = onClick;
	}
	setMyAvatar(x,y,angle){
		this.myAvatar.setPosition(x,y,angle);
	}

	setAvatars(avatars){
		//this.avatars =[];
		this.avatars=CheckObjectDiff(avatars,this.oldAvatars,this.avatars);
		console.log(this.avatars);
		this.oldAvatars = avatars;
	}

}