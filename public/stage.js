class Stage extends Touchable{
	onClick = null;
	myAvatar = null;
	avatars = [];
	constructor(myAvatar,avatars){
		super();
	    // setup
	    this.avatars = [];
	    for (let i =0; i < avatars.length;i++){
	    	this.avatars.push(new Avatar(avatars[i].name,avatars[i].id,avatars[i].x,avatars[i].y,
	    		avatars[i].size,avatars[i].angle));
	    }

	    this.myAvatar = new Avatar(myAvatar.name,myAvatar.id,myAvatar.x,myAvatar.y,
	    				myAvatar.size,myAvatar.angle);


  	}
	draw(){
		super.draw()
		this.myAvatar.draw();
    	for (let i =0; i < this.avatars.length;i++){
    		this.avatars[i].draw();
    	}

	}

	isClicked(mouseX, mouseY){
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

}