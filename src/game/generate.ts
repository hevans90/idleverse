import { StarProps } from "./star";

const numArms = 5;
const armSeparationDistance = 2 * Math.PI / numArms;
const armOffsetMax = 0.5;
const rotationFactor = 5;
const randomOffsetXY = 0.02;

export const InitializeStars = (canvasWidth: number, canvasHeight: number): StarProps[] => {
    let starPositions: StarProps[] = [];
    for(let i = 0; i < 5000; i++) {
        // Choose a distance from the center of the galaxy.
        let distance = Math.random();
        distance = Math.pow(distance, 2);

        // Choose an angle between 0 and 2 * PI.
        let angle = Math.random() * 2 * Math.PI;
        let armOffset = Math.random() * armOffsetMax; // 0.5
        armOffset = armOffset - (armOffsetMax / 2); // 0.5 - 0.25 = 0.25
        armOffset = armOffset * (1 / distance);

        let squaredArmOffset = Math.pow(armOffset, 2);
        if(armOffset < 0)
            squaredArmOffset = squaredArmOffset * -1;
        armOffset = squaredArmOffset;

        let rotation = distance * rotationFactor;

        angle = (angle / armSeparationDistance) * armSeparationDistance + armOffset + rotation;

        // Convert polar coordinates to 2D cartesian coordinates.
        let x = Math.cos(angle) * distance;
        let y = Math.sin(angle) * distance;

        
        let randomOffsetX = Math.random() * randomOffsetXY;
        let randomOffsetY = Math.random() * randomOffsetXY;

        x += randomOffsetX;
        y += randomOffsetY;

        let scale = Math.max(...[canvasWidth / 4 - -canvasWidth / 4,
            -canvasHeight / 4 - canvasHeight / 4])
        // Now we can assign xy coords.
        starPositions[i] = {x: x * scale + canvasWidth / 2, y: y * scale + canvasHeight / 2};
    }
    return starPositions;
}