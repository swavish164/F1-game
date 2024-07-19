const canvas = document.getElementById('myCanvas');
document.addEventListener('keydown',handleKeyDown,false)
document.addEventListener('keyup',handleKeyUp,false)
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 500;
const background = new Image();
const cornerColor = new Image();
background.src = "Images/background.png";
cornerColor.src = "Images/greenCorner.png";
const carImage = new Image();
carImage.src = "Images/playerCar.png" 
const cornerRed = new Image();
const cornerOrange = new Image();
const cornerGreen = new Image();
cornerRed.src = "Images/redCorner.png";
cornerOrange.src = "Images/orangeCorner.png";
cornerGreen.src = "Images/greenCorner.png";
var charX = -2300;
var charY = -1650;
var howMany = 0;
var temp = 0;
var rotation2 = 0;
var backgroundX = 0;
var backgroundY = 0;
let carSpeed = 1;
let cars = [];
const maxSpeed = 50;
let track = [[1,"straight",0,0,1423,0],[2,"corner",1423,0,1660,250,20],[3,"straight",1690,280,1785,995],[4,"corner",30],[5,"straight"],[6,"corner",20],[7,"straight"],[8,"corner",30]]
var pit = false;
var overtake = false;
var rotation = 90 * (Math.PI /180);
var currentPart = 0;
var endX = track[currentPart][4]
var endY = track[currentPart][5]
var key_left = false;
var key_right = false;
var brake = false;
var accelerate = false;
console.log("End X "+ endX);
class car {
    constructor(image,position,speed,x,y,rotation,part) {
        this.car = new Image();
        this.car.src = image;
        this.rotation = rotation;
        this.position = position;
        this.speed = speed;
        this.x = x;
        this.y = y;
        this.part = part;
      }

    move(){
        ctx.rotate(this.rotation);
        ctx.drawImage(this.car,this.x,this.y,75,100);
        ctx.rotate(-this.rotation);
        if(this.position == "straight"){
            if(rotation == 0){
                this.x += this.speed;
            }else if(rotation == 90){
                this.y += this.speed;
            }else if(rotation == 180){
                this.x -= this.speed;
            }else if(rotation == 270){
                this.y -= this.speed;
            }
        }else if(this.position == "corner"){
            xStart = track[this.part][2];
            yStart = track[this.part][3];
            xEnd = track[this.part][4];
            yEnd = track[this.part][5];
            distance = Math.sqrt((xEnd - xStart) ** 2 + (yEnd - yStart) ** 2);
            steps = distance / 90 * this.speed
            if(rotation >= 0 && rotation <= 90){
                this.x += Math.cos(rotation) * this.speed;
                this.y += Math.sin(rotation) * this.speed;
                rotation += steps;
                if(rotation >= 90){
                    this.part += 1;
                }
            }else if(rotation >= 90 && rotation <= 180){
                this.x += Math.cos(rotation) * this.speed;
                this.y -= Math.sin(rotation) * this.speed;
                rotation -= steps;
                if(rotation <= 180){
                    this.part += 1;
                }
            }else if(rotation >= 180 && rotation <= 270){
                this.x -= Math.cos(rotation) * this.speed;
                this.y -= Math.sin(rotation) * this.speed;
                rotation += steps;
                if(rotation >= 270){
                    this.part += 1;
                }
            }else if(rotation >= 270 && rotation <= 360){
                this.x -= Math.cos(rotation) * this.speed;
                this.y += Math.sin(rotation) * this.speed;
                rotation -= steps;
                if(rotation <= 360){
                    this.part += 1;
                    rotation = 0;
                }
            }
        }
    }
}

class camera{

}
function corner() {
    if(carSpeed <= 2){
        ctx.drawImage(cornerGreen, charX, charY, 5000, 2000);
    }else if(carSpeed > 2 && carSpeed < 3){
        ctx.drawImage(cornerOrange, charX, charY, 5000, 2000);
    }else{
        ctx.drawImage(cornerRed, charX, charY, 5000, 2000);
    }
}
function draw() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.translate(CANVAS_WIDTH/2,CANVAS_HEIGHT/2)
    //ctx.translate(charX,charY);
    ctx.rotate(rotation);
    //ctx.drawImage(background, -2300, -1650, 5000, 2000);
    ctx.drawImage(background, charX, charY, 5000, 2000);
    corner()
    ctx.rotate(-rotation);
    //ctx.translate(-charX,-charY)
    ctx.translate(-CANVAS_WIDTH/2,-CANVAS_HEIGHT/2)
    i = 0
    ctx.drawImage(carImage, CANVAS_WIDTH/2-25, CANVAS_HEIGHT/2-50, 75, 100);

}
function turning(part,temp){
    if(track[part][1] == "corner"){
        xStart = track[part][2];
        yStart = track[part][3];
        xEnd = track[part][4];
        yEnd = track[part][5];
        distance = Math.sqrt((xEnd - xStart) ** 2 + (yEnd - yStart) ** 2);
        steps = distance / 1080 *carSpeed
        howMany = distance / (90/steps)
        if(temp == 0){
            rotation2 = rotation / (Math.PI/180)
            temp++;
        }
        if(rotation2 > 0 && rotation2 <= 90){
            charX += Math.abs(Math.cos(rotation2) * howMany);
            charY += Math.abs(Math.sin(rotation2) * howMany);
            rotation2 -= steps;
            if(rotation2 <= 0){
                rotation2 = 360;
                charX = track[part][4]-2300;
                charY = track[part][5]-1650;
                part += 1;
            }
    }else if(rotation2 > 90 && rotation2 <= 180){
            charX += Math.cos(rotation2) * howMany;
            charY -= Math.sin(rotation2) * howMany;
            rotation2 -= steps;
            console.log(rotation2)
            if(rotation2 <= 90){
                rotation2 = 90;
                part += 1;
            }
    }else if(rotation2 > 180 && rotation2 <= 270){
            charX -= Math.cos(rotation2) * howMany;
            charY -= Math.sin(rotation2) * howMany;
            rotation2 -= steps;
            if(rotation2 <= 180){
                rotation2 = 180;
                part += 1;
            }
    }else if(rotation2 > 270 && rotation2 <= 360){
            charX -= Math.cos(rotation2) * howMany;
            charY += Math.sin(rotation2) * howMany;
            rotation2 -= steps;
            if(rotation2 <= 270){
                part += 1;
                rotation2 = 270;
            }
        }
    }
    console.log("returning")
    return { rotation: rotation2 * (Math.PI / 180), charX: charX, charY: charY, temp: temp, part: part }; 
}
function running(){
    if(track[currentPart][1] === "corner"){
        corner();
        draw();
        player();
        console.log("Before: "+rotation/(Math.PI/180))
        let result = turning(currentPart,temp); // Store the returned object
        rotation = result.rotation;
        charX = result.charX;
        charY = result.charY;
        temp = result.temp;
        currentPart = result.part;
        console.log("Char X: "+charX+" Char Y: "+charY);
    }else if(track[currentPart][1] === "straight"){
        if(endX >= backgroundX && endX <= backgroundX +10 && endY >= backgroundY && endY <= backgroundY+10){
        console.log("Why")
        currentPart++;
        temp = 0;
    }
    draw();
    player();
    var tempRotation = rotation - (90*Math.PI/180);
    if(rotation - (90*Math.PI/180) < 0){
        tempRotation = (360*Math.PI/180) + rotation - (90*Math.PI/180);
    }
    //console.log("CharX: " + backgroundX + " CharY: " + backgroundY);
    if(tempRotation == 0){
        charY += Math.abs(Math.sin(tempRotation) * carSpeed);
        charX += Math.abs(Math.cos(tempRotation) * carSpeed);
    }
    if(tempRotation >0 && tempRotation <= (90*Math.PI /180)){
        charY += Math.abs(Math.sin(tempRotation) * carSpeed);
        charX += Math.abs(Math.cos(tempRotation) * carSpeed);
    }else if(tempRotation > (90*Math.PI /180) && tempRotation <= (180*Math.PI /180)){
        charY += Math.abs(Math.sin(tempRotation) * carSpeed);
        charX += Math.abs(Math.cos(tempRotation) * carSpeed);
    }else if(tempRotation > (180*Math.PI /180) && tempRotation <= (270*Math.PI /180)){
        charY += Math.abs(Math.sin(tempRotation) * carSpeed);
        charX += Math.abs(Math.cos(tempRotation) * carSpeed);
    }else if(tempRotation > (270*Math.PI /180) && tempRotation <= (360*Math.PI /180)){
        charY += Math.abs(Math.sin(tempRotation) * carSpeed);
        charX += Math.abs(Math.cos(tempRotation) * carSpeed);
    }
    backgroundX = charX +2300;
    backgroundY = charY + 1650;
        }
}

function player(){
    if (key_right) {
        if (carSpeed < 50) {
            charX += carSpeed}
        if (rotation/(Math.PI /180) < 0) {
            rotation = 360*(Math.PI /180);
        }else{
            rotation -= 1 * (Math.PI / 180);}
    }

    if(key_left) {
        if(carSpeed>0){
            charX -= carSpeed};
        if(rotation/(Math.PI /180) > 360){
            rotation = 0;
        }else{
            rotation +=1 * (Math.PI /180);
        }
        }
    if(brake) {if(carSpeed >0){carSpeed -= 0.5;}else{carSpeed = 0;}}
    if(accelerate) {carSpeed += 0.5;}    
}


function handleKeyDown(event){
    if(event.keyCode == 37){
        key_left = true;
    }else if(event.keyCode == 39){
        key_right = true;
    }else if(event.keyCode == 40){
        brake = true;
    }else if(event.keyCode == 38){
        accelerate = true;
    }
}
function handleKeyUp(event){
    if(event.keyCode == 37){
        key_left = false;
    }else if(event.keyCode == 39){
        key_right = false;
    }else if(event.keyCode == 40){
        brake = false;
    }else if(event.keyCode == 38){
        accelerate = false;
    }
}

setInterval(function(){running()},1);
//debugger;