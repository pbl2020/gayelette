class Screen {
    menu = null;
    avatar = null;
    stage = null;
    moveX = 0;
    moveY = 0;
    hypo = 0;
    moveAngle = 0;

    user = {
        name: "koyama",
        id: "0312018086",
        x: 100,
        y: 200,
        size: 30,
        angle: 0
    };
    otheruser = [{
            name: "shimizu",
            id: "0312018087",
            x: 150,
            y: 250,
            size: 30,
            angle: 90
        },

        {
            name: "masuda",
            id: "0312018088",
            x: 200,
            y: 300,
            size: 30,
            angle: 45
        }
    ]

    constructor() {
        this.menu = new MenuList(windowWidth - 300, 0);
        this.stage = new Stage(this.user);
        this.stage.setClick(this.handleClick.bind(this));
        console.log(this.otheruser);
        this.setData(this.otheruser);
    }
    handleClick() {
        let moveX = mouseX - this.user.x;
        let moveY = mouseY - this.user.y;
        let hypo = Math.sqrt(Math.pow(moveX, 2) + Math.pow(moveY, 2));
        let moveAngle = (Math.atan2(moveY, moveX) * (180 / Math.PI) + 90 + 360) % 360;
        this.stage.setMyAvatar(mouseX, mouseY, moveAngle);

        this.user = { ...this.user, x: mouseX, y: mouseY, angle: moveAngle }
    }
    setData(otheruser) {
        this.otheruser = otheruser;
        this.stage.setAvatars(otheruser);
        console.log(this.otheruser);

    }
    draw() {

    var primaryColor = "#2d4262";
    var primaryVariant = "#73605b";
    var secondaryColor ="#2d4262";
    var secondaryVariant ="#d09683";
    var fontColor =" #FFFFFF";
        push();
        clear();
        background(primaryColor);
        pop();
        push();
        fill(primaryVariant);
        this.menu.draw();
        pop();

        this.stage.draw();

    }
}

var screen;

function setup() {
    createCanvas(windowWidth, windowHeight);

    screen = new Screen();
}

function draw() {
    screen.draw();
    var primaryColor = "#2d4262";
    var primaryVariant = "#73605b";
    var secondaryColor = "#2d4262";
    var secondaryVariant = "#d09683";
    var fontColor = " #FFFFFF";
    push();
    clear();
    background(primaryColor);
    pop();
    push();
    fill(primaryVariant);
    this.menu.draw();
    pop();

    this.stage.draw();

}

var screen;

function setup() {
    createCanvas(windowWidth, windowHeight);

    screen = new Screen();

}

function draw() {

    //fill("#363237");
    screen.draw();

}