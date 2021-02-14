class Avatar{
	x = 0
	y = 0
	frame=30
	angleFlame = 10
	dx=0
	dy=0
	ff=0
	dAngle =0
	constructor(name,id,x, y,size,angle){
		// setup
		this.name = name
		this.id = id
		this.x = x
		this.y = y
		this.size = size
		this.angle = angle
	}
	draw(){
		push()
		if(this.ff != 0){
			this.x += this.dx
			this.y += this.dy
			this.ff--

		}
		let viewColor = "#B5FF144D";
		let ellipseColor ="#FFFFFF";
		let strokeColor  ="#FFFFFF00"
		let pointy = this.size
		let pointx = this.size/2
		// draw
		translate(this.x,this.y)
		rotate(radians(this.angle))
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
				fill("#505160")
				arc(0, 0, volume.len, volume.len, radians(-nextVolume.angle),radians(nextVolume.angle), PIE);
			}
		}

		fill(ellipseColor);
		ellipse(0,0,this.size,this.size)

		//triangle(0,0,-180,-180,180,180);

		point(this.x,this.y)

		pop()

	}
	setPosition(x,y,angle){
		this.angle = angle
		this.dx = (x-this.x) / this.frame
		this.dy = (y-this.y) / this.frame
		this.ff = this.frame    


	}
}
