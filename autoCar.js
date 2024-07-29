var xEnd = 0;
var yEnd = 0;
var xStart = 0;
var yStart = 0;
let track = [[1, "straight", -2040, 0, 1423, 0], [2, "corner", 1423, 0, 1660, 250, 20], [3, "straight", 1660, 250, 1660, 1015], [4, "corner", 1660, 1015, 1440, 1220, 30], [5, "straight", 1440, 1220, -2050, 1220], [6, "corner", -2050, 1220, -2250, 1000, 20], [7, "straight", -2250, 1000, -2243, 210], [8, "corner", -2243, 210, -2040, 0, 30], [9, "pits", -1880, 0, -1180, 440, -180, 440, 840, 440, 1026, 20]]
export default class car {
    constructor(image, position, speed, x, y, rotation, part) {
        this.car = new Image();
        this.car.src = image;
        this.rotation = rotation;
        this.position = position;
        this.speed = speed;
        this.x = x;
        this.y = y;
        this.part = part;
    }

    move() {
        if (this.position == "straight") {
            if (this.rotation == 0) {
                this.x += this.speed;
            } else if (rotation == 90) {
                this.y += this.speed;
            } else if (rotation == 180) {
                this.x -= this.speed;
            } else if (rotation == 270) {
                this.y -= this.speed;
            }
        } else if (this.position == "corner") {
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
        else if (track[this.part][1] === "straight") {
            xEnd = track[this.part][4]
            yEnd = track[this.part][5]
            if (xEnd >= this.x + 2300 && xEnd <= this.x + 2310 && yEnd >= this.y + 1650 && yEnd <= this.y + 1660) {
                this.part++;
            }
            var tempRotation = this.rotation - (90 * Math.PI / 180);
            if (this.rotation - (90 * Math.PI / 180) < 0) {
                tempRotation = (360 * Math.PI / 180) + this.rotation - (90 * Math.PI / 180);
            }
            if (tempRotation == 0) {
                this.y += Math.abs(Math.sin(tempRotation) * this.speed);
                this.x += Math.abs(Math.cos(tempRotation) * this.speed);
            }
            if (tempRotation > 0 && tempRotation <= (90 * Math.PI / 180)) {
                this.y -= Math.abs(Math.sin(tempRotation) * this.speed);
                this.x -= Math.abs(Math.cos(tempRotation) * this.speed);
            } else if (tempRotation > (90 * Math.PI / 180) && tempRotation <= (180 * Math.PI / 180)) {
                this.y += Math.abs(Math.sin(tempRotation) * this.speed);
                this.x -= Math.abs(Math.cos(tempRotation) * this.speed);
            } else if (tempRotation > (180 * Math.PI / 180) && tempRotation <= (270 * Math.PI / 180)) {
                this.y += Math.abs(Math.sin(tempRotation) * this.speed);
                this.x += Math.abs(Math.cos(tempRotation) * this.speed);
            } else if (tempRotation > (270 * Math.PI / 180) && tempRotation <= (360 * Math.PI / 180)) {
                this.y += Math.abs(Math.sin(tempRotation) * this.speed);
                this.x += Math.abs(Math.cos(tempRotation) * this.speed);
            }
            //backgroundX = this.x + 2300;
            //backgroundY = this.y + 1650;
            this.move()
        }
        else if (track[currentPart][1] === "pits") {
            let result = pitting(currentPart)
            this.rotation = result.rotation
            this.x = result.this.x
            this.y = result.this.y
            currentPart = result.part;
            this.move()
        }
    }
}