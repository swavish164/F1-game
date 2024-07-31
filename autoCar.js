var xEnd = 0;
var yEnd = 0;
var tempRotation = 0;
var xStart = 0;
var yStart = 0;
var endOfStraightX = 0;
var endOfStraightY = 0;
var distance = 0;
var steps = 0;
var howMany = 0;
var rotation;
var rotation2;
let track = [[1, "straight", -2040, 0, 1423, 0], [2, "corner", 1423, 0, 1660, 250, 20], [3, "straight", 1660, 250, 1660, 1015], [4, "corner", 1660, 1015, 1440, 1220, 30], [5, "straight", 1440, 1220, -2050, 1220], [6, "corner", -2050, 1220, -2250, 1000, 20], [7, "straight", -2250, 1000, -2243, 210], [8, "corner", -2243, 210, -2040, 0, 30], [9, "pits", -1880, 0, -1180, 440, -180, 440, 840, 440, 1026, 20]]
export default class car {
    constructor(image, position, speed, x, y, rotation, part) {
        this.car = new Image();
        this.car.src = image;
        this.rotation = rotation*(Math.PI / 180);
        this.position = position;
        this.speed = speed;
        this.x = x;
        this.y = y;
        this.part = part;
    }

    move() {
        if (track[this.part][1] == "straight") {
            this.speed = 0.5;
            endOfStraightX = track[this.position][4];
            endOfStraightY = track[this.position][5];
            tempRotation = this.rotation-(270*(Math.PI / 180));
            if(tempRotation < 0){
                tempRotation = (360*(Math.PI /180))+tempRotation;
            }
            if (tempRotation == 0) {
                this.x += this.speed;
            } else if (tempRotation == (90*(Math.PI / 180))) {
                this.y += this.speed;
            } else if (tempRotation == (180*(Math.PI / 180))) {
                this.x-= this.speed;
            } else if (tempRotation == (270*(Math.PI / 180))) {
                this.y -= this.speed;
            }
            switch(this.part){
                case 0:
                        if(this.x >= endOfStraightX){
                            this.part += 1;
                        }
                    break;
                case 2:
                    if(this.y >= endOfStraightY){
                        this.part += 1;
                    }
                    break;
                case 4:
                    if(this.x <= endOfStraightX){
                        this.part += 1;
                    }
                    break;
                case 6:
                    if(this.y <= endOfStraightY){
                        this.part +=1;
                    }
                    break;
            }
        } else if (track[this.part][1] == "corner") {
            console.log("Truening")
            this.speed = 0.5;
            xStart = track[this.part][2];
            yStart = track[this.part][3];
            xEnd = track[this.part][4];
            yEnd = track[this.part][5];
            distance = Math.sqrt((xEnd - xStart) ** 2 + (yEnd - yStart) ** 2);
            steps = distance / 1080 * this.speed
            howMany = distance / (90 / steps)
            rotation2 = rotation / (Math.PI / 180)
            if (rotation2 > 0 && this.rotation2 <= 90) {
                this.x += Math.abs(Math.cos(rotation2) * howMany);
                this.y += Math.abs(Math.sin(rotation2) * howMany);
                this.rotation2 -= steps;
                if (rotation2 <= 0) {
                    this.rotation2 = 360;
                    this.part += 1;
                    this.x = track[this.part][2] - 2300;
                    this.y = track[this.part][3] - 1650;
                }
            } else if (rotation2 > 90 && this.rotation2 <= 180) {
                this.x += Math.abs(Math.cos(rotation2) * howMany);
                this.y -= Math.abs(Math.sin(rotation2) * howMany);
                this.rotation2 -= steps;
                if (rotation2 <= 90) {
                    this.rotation2 = 90;
                    if (pit != true) {
                        if (part + 1 == track.length - 1) {
                            part = 0;
                        } else {
                            part += 1;
                        }
                    } else {
                        part += 1;
                        pitting(this.part)
                    }
                    this.x = track[this.part][2] - 2300;
                    this.y = track[this.part][3] - 1650;
                }
            } else if (rotation2 > 180 && this.rotation2 <= 270) {
                this.x -= Math.abs(Math.cos(rotation2) * howMany);
                this.y -= Math.abs(Math.sin(rotation2) * howMany);
                this.rotation2 -= steps;
                if (rotation2 <= 180) {
                    this.rotation2 = 180;
                    this.part += 1;
                    this.x = track[this.part][2] - 2300;
                    this.y = track[this.part][3] - 1650;
                }
            } else if (rotation2 > 270 && this.rotation2 <= 360) {
                this.x -= Math.abs(Math.cos(rotation2) * howMany);
                this.y += Math.abs(Math.sin(rotation2) * howMany);
                this.rotation2 -= steps;
                if (rotation2 <= 270) {
                    this.part += 1;
                    this.x = track[this.part][2] - 2300;
                    this.y = track[this.part][3] - 1650;
                    this.rotation2 = 270;
                }
            }
        }
        else if (track[this.part][1] === "pits") {
            let result = pitting(this.part)
            this.rotation = result.rotation
            this.x = result.this.x
            this.y = result.this.y
            currentPart = result.part;
        }
        return [this.x, this.y, this.rotation * (Math.PI / 180)]
    }
    getImage(){
        return this.car;
    }
}