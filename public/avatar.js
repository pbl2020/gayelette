class Avatar{
	x = 0
	y = 0
	frame=30
	angleFlame = 10
	dx=0
	dy=0
	ff=0
	dAngle =0
	size = 30
	constructor(name,id,x,y,angle,isMe){
		// setup
		this.name = name
		this.id = id
		this.x = x
		this.y = y
		this.angle = angle
		this.isMe = isMe
	}
	draw(){
		push()
		if(this.ff != 0){
			this.x += this.dx
			this.y += this.dy
			this.ff--

		}
		let viewColor;
		let ellipseColor;
		let strokeColor;
		let circlesStrokeColor;
		if(this.isMe == 1){
			viewColor = "#B5FF144D";
			ellipseColor ="#7cfc00";
			circlesStrokeColor  ="#FFFFFF";
			strokeColor = "#FFFFFF00";
		}else{
			viewColor = "#14d4ff4d";
			ellipseColor ="#FFFFFF";
			circlesStrokeColor  ="#FFFFFF00";	
			strokeColor = "#FFFFFF00";
		}

		// draw
		translate(this.x,this.y);
		rotate(radians(this.angle));
		//triangle(0,0-pointy,0-pointx,0,0+pointx,0)

		fill(viewColor);
		
		stroke(strokeColor);
		// ellipse(0,0,90,90);
		// fill("#505160");
		// arc(0, 0, 90, 90, radians(-config.volumeAngle),radians(config.volumeAngle), PIE);
		//fill(viewColor);
		//arc(0, 0, 180, 180, radians(-65),radians(65), PIE);
		//fill("#505160");
		//arc(0, 0, 180, 180, radians(-65),radians(65), PIE);
		// fill(viewColor);
		// arc(0, 0, 230, 230, radians(-config.volumeAngle),radians(config.volumeAngle), PIE);

		for(let i = 0; i < config.volumeAngle.length; i++){
			fill(viewColor);
			const volume = config.volumeAngle[i];
			const nextVolume = config.volumeAngle[i + 1];
			arc(0, 0, volume.len, volume.len, radians(-volume.angle),radians(volume.angle), PIE);
			if(nextVolume){
				fill(backgroundColor)
				arc(0, 0, volume.len, volume.len, radians(-nextVolume.angle),radians(nextVolume.angle), PIE);
			}
		}

		fill(ellipseColor);
		stroke(circlesStrokeColor);
		strokeWeight(3);
		circle(0,0,this.size);
		//ellipse(0,0,this.size,this.size);

		//triangle(0,0,-180,-180,180,180);
		pop()

	}
	setPosition(x,y,angle){
		this.angle = angle
		this.dx = (x-this.x) / this.frame
		this.dy = (y-this.y) / this.frame
		this.ff = this.frame    


	}
}
