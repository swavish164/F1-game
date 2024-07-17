
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
let carSpeed = 1;
let cars = [];
const maxSpeed = 50;
let track = [[1,"straight"],[2,"corner",20],[3,"straight"],[4,"corner",30],[5,"straight"],[6,"corner",20],[7,"straight"],[8,"corner",30]]
var pit = false;
var overtake = false;
var rotation = 90 * (Math.PI /180);
var currentPart = 0;
var key_left = false;
var key_right = false;
var brake = false;
var accelerate = false;
class car {

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
function running(){
    if(track[currentPart][1] === "corner"){
        console.log("corner");
        corner();
    }
    draw();
    player();
    var tempRotation = rotation - (90*Math.PI/180);
    if(rotation - (90*Math.PI/180) < 0){
        tempRotation = (360*Math.PI/180) + rotation - (90*Math.PI/180);
    }
    console.log("CharX: " + charX + " CharY: " + charY);
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

setInterval(function(){running()},50);
//debugger;