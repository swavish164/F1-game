import autoCar from './autoCar.js';
const canvas = document.getElementById('myCanvas');
document.addEventListener('keydown', handleKeyDown, false)
document.addEventListener('keyup', handleKeyUp, false)
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
var partOfPit = 0;
var rotation2 = 0;
var backgroundX = 0;
var backgroundY = 0;
let carSpeed = 1;
let cars = [];
let newCar = new autoCar('Images/car.png', 0, 40, -2350, -1650, 0, 0)
const maxSpeed = 50;
let track = [[1, "straight", -2040, 0, 1423, 0], [2, "corner", 1423, 0, 1660, 250, 20], [3, "straight", 1660, 250, 1660, 1015], [4, "corner", 1660, 1015, 1440, 1220, 30], [5, "straight", 1440, 1220, -2050, 1220], [6, "corner", -2050, 1220, -2250, 1000, 20], [7, "straight", -2250, 1000, -2243, 210], [8, "corner", -2243, 210, -2040, 0, 30],
[9, "pits", -1880, 0, -1180, 440, -180, 440, 840, 440, 1026, 20]]
var pit = false;
var overtake = false;
var rotation = 90 * (Math.PI / 180);
var currentPart = 0;
var endX = track[currentPart][4]
var endY = track[currentPart][5]
var key_left = false;
var key_right = false;
var brake = false;
var accelerate = false;

class camera {

}
function corner() {
    if (carSpeed <= 2) {
        ctx.drawImage(cornerGreen, charX, charY, 5000, 2000);
    } else if (carSpeed > 2 && carSpeed < 3) {
        ctx.drawImage(cornerOrange, charX, charY, 5000, 2000);
    } else {
        ctx.drawImage(cornerRed, charX, charY, 5000, 2000);
    }
}
function draw() {
    newCar.move()
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)
    //ctx.translate(charX,charY);
    ctx.rotate(rotation);
    //ctx.drawImage(background, -2300, -1650, 5000, 2000);
    ctx.drawImage(background, charX, charY, 5000, 2000);
    corner()
    ctx.rotate(-rotation);
    //ctx.translate(-charX,-charY)
    ctx.translate(-CANVAS_WIDTH / 2, -CANVAS_HEIGHT / 2)
    i = 0
    ctx.drawImage(carImage, CANVAS_WIDTH / 2 - 25, CANVAS_HEIGHT / 2 - 50, 75, 100);

}
function pitting(part) {
    if (partOfPit == 0) {
        charX += carSpeed
    }
    else {
        xStart = track[8][partOfPit];
        yStart = track[8][partOfPit + 1];
        xEnd = track[8][partOfPit + 2];
        yEnd = track[8][partOfPit + 3];
    }
    if (Math.trunc(charX) + 2300 >= track[8][2] && Math.trunc(charY) + 1650 >= track[8][3] && partOfPit < 3) {
        partOfPit = 2;
    }
    if (partOfPit == 2) {
        distance = Math.sqrt((xEnd - xStart) ** 2 + (yEnd - yStart) ** 2) / 1500 * carSpeed;
        angle = Math.atan2(yEnd - yStart, xEnd - xStart);
        rotation = (90 * (Math.PI / 180)) - angle;
        charX += Math.abs(Math.sin(rotation) * distance);
        charY += Math.abs(Math.cos(rotation) * distance);
        if (charX + 2300 >= xEnd && charY + 1650 >= yEnd && charX + 2300 <= xEnd + 10 && charY + 1650 <= yEnd + 10) {
            charX = -1180 - 2300;
            charY = 440 - 1650;
            partOfPit += 2;
            xStart = track[8][partOfPit];
            yStart = track[8][partOfPit + 1];
            xEnd = track[8][partOfPit + 2];
            yEnd = track[8][partOfPit + 3];
            counting = 0;
        }
    }
    if (partOfPit == 4) {
        rotation = 90;
        if (charX + 2300 >= xEnd && charY + 1650 >= yEnd && charX + 2300 <= xEnd + 10 && charY + 1650 <= yEnd + 10) {
            counting++;
            if (counting >= 500) {
                charX += carSpeed;
                partOfPit = 6;
                xStart = track[8][partOfPit];
                yStart = track[8][partOfPit + 1];
                xEnd = track[8][partOfPit + 2];
                yEnd = track[8][partOfPit + 3];
            }
        }
        else {
            charX += carSpeed
        }
    }
    if (partOfPit == 6) {
        charX += carSpeed
        console.log("Test")
        if (charX + 2300 >= xEnd && charY + 1650 >= yEnd && charX + 2300 <= xEnd + 10 && charY + 1650 <= yEnd + 10) {
            partOfPit = 8;
            xStart = track[8][partOfPit];
            yStart = track[8][partOfPit + 1];
            xEnd = track[8][partOfPit + 2];
            yEnd = track[8][partOfPit + 3];
        }
    }
    if (partOfPit == 8) {
        console.log("8")
        distance = Math.sqrt((xEnd - xStart) ** 2 + (yEnd - yStart) ** 2) / 1500 * carSpeed;
        angle = Math.atan2(yEnd - yStart, xEnd - xStart);
        rotation = (90 * (Math.PI / 180)) + angle;
        charX += Math.abs(Math.sin(rotation) * distance);
        charY -= Math.abs(Math.cos(rotation) * distance);
        if (charX + 2300 >= xEnd && charY + 1650 >= yEnd && charX + 2300 <= xEnd + 10 && charY + 1650 <= yEnd + 10) {
            console.log("Moving")
            charX = endX - 2300;
            charY = endY - 1650;
            partOfPit += 2;
            part = 0;
        }
    }
    return { charX: charX, charY: charY, rotation: rotation, part: part }
}
function turning(part, temp) {
    console.log(part)
    if (track[part][1] == "corner") {
        xStart = track[part][2];
        yStart = track[part][3];
        xEnd = track[part][4];
        yEnd = track[part][5];
        distance = Math.sqrt((xEnd - xStart) ** 2 + (yEnd - yStart) ** 2);
        steps = distance / 1080 * carSpeed
        howMany = distance / (90 / steps)
        rotation2 = rotation / (Math.PI / 180)
        if (rotation2 > 0 && rotation2 <= 90) {
            charX += Math.abs(Math.cos(rotation2) * howMany);
            charY += Math.abs(Math.sin(rotation2) * howMany);
            rotation2 -= steps;
            if (rotation2 <= 0) {
                rotation2 = 360;
                part += 1;
                charX = track[part][2] - 2300;
                charY = track[part][3] - 1650;
            }
        } else if (rotation2 > 90 && rotation2 <= 180) {
            charX += Math.abs(Math.cos(rotation2) * howMany);
            charY -= Math.abs(Math.sin(rotation2) * howMany);
            rotation2 -= steps;
            if (rotation2 <= 90) {
                rotation2 = 90;
                if (pit != true) {
                    if (part + 1 == track.length - 1) {
                        part = 0;
                    } else {
                        part += 1;
                    }
                } else {
                    part += 1;
                    pitting(part)
                }
                charX = track[part][2] - 2300;
                charY = track[part][3] - 1650;
            }
        } else if (rotation2 > 180 && rotation2 <= 270) {
            charX -= Math.abs(Math.cos(rotation2) * howMany);
            charY -= Math.abs(Math.sin(rotation2) * howMany);
            rotation2 -= steps;
            if (rotation2 <= 180) {
                rotation2 = 180;
                part += 1;
                charX = track[part][2] - 2300;
                charY = track[part][3] - 1650;
            }
        } else if (rotation2 > 270 && rotation2 <= 360) {
            charX -= Math.abs(Math.cos(rotation2) * howMany);
            charY += Math.abs(Math.sin(rotation2) * howMany);
            rotation2 -= steps;
            if (rotation2 <= 270) {
                part += 1;
                charX = track[part][2] - 2300;
                charY = track[part][3] - 1650;
                rotation2 = 270;
            }
        }
    }
    if (part == track.length) {
        part = 0;
    }
    return { rotation: rotation2 * (Math.PI / 180), charX: charX, charY: charY, temp: temp, part: part };
}
function running() {
    if (track[currentPart][1] === "corner") {
        corner();
        draw();
        player();
        let result = turning(currentPart, temp); // Store the returned object
        rotation = result.rotation;
        charX = result.charX;
        charY = result.charY;
        temp = result.temp;
        currentPart = result.part;
    } else if (track[currentPart][1] === "straight") {
        endX = track[currentPart][4]
        endY = track[currentPart][5]
        if (endX >= charX + 2300 && endX <= charX + 2310 && endY >= charY + 1650 && endY <= charY + 1660) {
            currentPart++;
            temp = 0;
        }
        draw();
        player();
        var tempRotation = rotation - (90 * Math.PI / 180);
        if (rotation - (90 * Math.PI / 180) < 0) {
            tempRotation = (360 * Math.PI / 180) + rotation - (90 * Math.PI / 180);
        }
        if (tempRotation == 0) {
            charY += Math.abs(Math.sin(tempRotation) * carSpeed);
            charX += Math.abs(Math.cos(tempRotation) * carSpeed);
        }
        if (tempRotation > 0 && tempRotation <= (90 * Math.PI / 180)) {
            charY -= Math.abs(Math.sin(tempRotation) * carSpeed);
            charX -= Math.abs(Math.cos(tempRotation) * carSpeed);
        } else if (tempRotation > (90 * Math.PI / 180) && tempRotation <= (180 * Math.PI / 180)) {
            charY += Math.abs(Math.sin(tempRotation) * carSpeed);
            charX -= Math.abs(Math.cos(tempRotation) * carSpeed);
        } else if (tempRotation > (180 * Math.PI / 180) && tempRotation <= (270 * Math.PI / 180)) {
            charY += Math.abs(Math.sin(tempRotation) * carSpeed);
            charX += Math.abs(Math.cos(tempRotation) * carSpeed);
        } else if (tempRotation > (270 * Math.PI / 180) && tempRotation <= (360 * Math.PI / 180)) {
            charY += Math.abs(Math.sin(tempRotation) * carSpeed);
            charX += Math.abs(Math.cos(tempRotation) * carSpeed);
        }
        backgroundX = charX + 2300;
        backgroundY = charY + 1650;
    }
    else if (track[currentPart][1] === "pits") {
        let result = pitting(currentPart)
        rotation = result.rotation
        charX = result.charX
        charY = result.charY
        currentPart = result.part;
        draw();
        player();
    }
}

function player() {
    if (key_right) {
        if (carSpeed < 50) {
            charX += carSpeed
        }
        if (rotation / (Math.PI / 180) < 0) {
            rotation = 360 * (Math.PI / 180);
        } else {
            rotation -= 1 * (Math.PI / 180);
        }
    }

    if (key_left) {
        if (carSpeed > 0) {
            charX -= carSpeed
        };
        if (rotation / (Math.PI / 180) > 360) {
            rotation = 0;
        } else {
            rotation += 1 * (Math.PI / 180);
        }
    }
    if (brake) { if (carSpeed > 0) { carSpeed -= 0.1; } else { carSpeed = 0; } console.log("Part: " + currentPart + "CharX: " + (charX + 2300) + " CharY: " + (charY + 1650)) }
    if (accelerate) { carSpeed += 0.1; }
}


function handleKeyDown(event) {
    if (event.keyCode == 37) {
        key_left = true;
    } else if (event.keyCode == 39) {
        key_right = true;
    } else if (event.keyCode == 40) {
        brake = true;
    } else if (event.keyCode == 38) {
        accelerate = true;
    }
    else if (event.keyCode == 80) {
        pit = true;
        partOfPit = 0;
    }
}
function handleKeyUp(event) {
    if (event.keyCode == 37) {
        key_left = false;
    } else if (event.keyCode == 39) {
        key_right = false;
    } else if (event.keyCode == 40) {
        brake = false;
    } else if (event.keyCode == 38) {
        accelerate = false;
    }
}

setInterval(function() { running() }, 1);
//debugger;