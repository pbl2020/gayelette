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
    this.angle = -angle
  }
  draw(){
    push()
    if(this.ff != 0){
      this.x += this.dx
      this.y += this.dy
      this.ff--

    }
  	let pointy = this.size
  	let pointx = this.size/2
    // draw
    translate(this.x,this.y)
    rotate(radians(this.angle))
    triangle(0,0-pointy,0-pointx,0,0+pointx,0)
    ellipse(0,0,this.size,this.size)

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