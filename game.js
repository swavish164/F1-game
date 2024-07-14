
const canvas = document.getElementById('myCanvas');
document.addEventListener('keydown',handleKeyDown,true)
document.addEventListener('keyup',handleKeyUp,true)
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
const background = new Image();
background.src = "Images/bacckground.jpeg";
const carImage = new Image();
carImage.src = "Images/playerCar.jpg" 
var charX = 100;
var charY = 100;
let carSpeed = 0.1;
let cars = [];
const maxSpeed = 50;
let track = [[1,"straight"],[2,"corner",20],[3,"straight"],[4,"corner",30],[5,"straight"],[6,"corner",20],[7,"straight"],[8,"corner",30]]
var pit = false;
var overtake = false;
var rotation = 0;
var currentPart = 1;
class car {

}

class camera{

}
function corner() {
    if(carSpeed <= track[currentPart]){
        cornerColour = "green"
    }else if(carSpeed > track[currentPart] && carSpeed < track[currentPart * 1.5]){
        cornerColour = "orange"
    }else{
        cornerColour = "red"
    }
}
function draw() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(background, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(carImage, charX, charY, 50, 100);
}
const running = () => {
    console.log("Test");
    if(track[currentPart][1] == "corner"){
        corner();
    }
    draw();
    player();
    charY += carSpeed;
    running();
}
const player = () => {
        if(key_right) {if(carSpeed<50){charX += carSpeed;}}
        if(key_left) {if(carSpeed>0){charX -= carSpeed;}}
        if(brake) {carSpeed -= 5;}
        if(accelerate) {carSpeed += 5;}
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
background.onload = function () {
    running();
};
debugger;