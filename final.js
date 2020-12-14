let shapeButton = document.getElementById('shape')
let randomColorButton = document.getElementById('randomColor')
let strokeSizeButton = document.getElementById('strokeSize')
let userFeedbackEl = document.getElementById('colorShape')
let strokeSizeFeedbackEl = document.getElementById('strokeSizeFeedback')
let resetStrokeButton = document.getElementById('resetStrokeSize')

//variables
let points = []
let shapes = []
let size = 50
let isDrawing = false
let color1 = 0
let color2 = 0
let color3 = 0
let strokeColor = 255
let shapePrompt1 = 0
let colorPrompt = 0
let sW = 6 //short for strokeWeight
let userX = getRandomInt(300) //random x coordinate to draw user shapes
let userY = getRandomInt(700) //random y coordinate to draw user shapes
let inputs = []
let smileyFaceT = false
let smileyX = 200
let smileyY = 200
let isMovingRight = false
let isMovingLeft = false
let isMovingUp = false
let isMovingDown = false
let background1 = false
let background2 = false

function setup() {
    createCanvas(800, 800)
    angleMode(DEGREES)
}

function draw() {
    background(241, 235, 255)

    backgrounds()
    drawUserShapes()
    smileyFace()
    drawShapes()
    drawDots()
    drawLines()
    if (isDrawing) {
        drawMouseDot()
    }

    move()
    clock()
}

function shapeColorPrompt() {
    shapePrompt1 = prompt(`What shape would you like to draw?`)
    colorPrompt = prompt(`What color would you like the shape to be?`)
    randomUserXY()
    userFeedbackEl.innerHTML = `You drew a ${colorPrompt} ${shapePrompt1} at (${userX}, ${userY})`
    console.log(`${shapePrompt1}`)
    console.log(`${colorPrompt}`)
}

function backgrounds() {
    if (background1) {
        for(let row = 0; row < 16; row++) {
            for (let col = 0; col < 16; col++) {
                if (row % 2 === 0) {
                    if(col % 2 === 0) { //even #
                        fill('lightblue')
                    } else {
                        fill('pink')
                    }       
                } else {
                    if(col % 2 === 0) { //even #
                        fill('pink')
                    } else {
                        fill('lightblue')
                    }
                }
                rect(10 + 60*col, 50 + 60*row, size, size)
            }
        }
    }
    if (background2) {
        for(let row = 0; row < 16; row++) {
            for (let col = 0; col < 16; col++) {
                if (row % 2 === 0) {
                    if(col % 2 === 0) { //even #
                        fill('lightblue')
                    } else {
                        fill('yellow')
                    }       
                } else {
                    if(col % 2 === 0) { //even #
                        fill('yellow')
                    } else {
                        fill('lightblue')
                    }
                }
                ellipse(10 + 60*col, 50 + 60*row, size, size)
            }
        }
    }
}
//draws user shapes

function drawUserShapes() {
    stroke(`${colorPrompt}`)
    fill(`${colorPrompt}`)
    // for (let i = 0; i < 2; i++) {
    //     inputs[i] = getRandomInt(300)
    // }
    // if(shapePrompt1 === 'square') {
    //     rect(inputs[0], inputs[1], size, size)
    // }
    if (shapePrompt1 === 'square') {
        rect(userX, userY, 100, 100)
    }
    if (shapePrompt1 === 'circle') {
        if(userX < 50 || userY < 50) {
            userX += 50
            userY += 50
        }
        ellipse(userX, userY + 50, 100)
    }
    if (shapePrompt1 === 'triangle') {
        if(userY < 100) {
            userY += 100
        }
        triangle(userX, userY, userX + 100, userY - 100, userX + 200, userY)
    }

}

function smileyFace() {
    fill(0)
    stroke(0)
    if(smileyFaceT) {
        for(i = 1; i < 3; i++) {
            ellipse(i * smileyX, smileyY, 50, 50)
        }
        arc(smileyX + 100, smileyY + 100, 200, 200, 0, 180)
        // for(i = 1; i < 4; i++) {
        //     ellipse(i * 20 + 180, i * 40 + 250, 25, 25)
        // }
        // for(i = 1; i < 4; i++) {
        //     ellipse(i * 30 + 250, 3 * 40 + 250, 25, 25)
        // }
        // for(i = 3; i > 0; i--) {
        //     ellipse(i * -20 + 435, i * 40 + 250, 25, 25)
        // }
    }
    if(smileyX < 0 || smileyX > 800){
        smileyX = 200
    }
    if(smileyY < 0 || smileyY > 800) {
        smileyY = 200
    }
}

function randomUserXY() {
    userX = getRandomInt(500)
    userY = getRandomInt(700)
}

//randomizes strokecolor
function randomColor() {
    color1 = getRandomInt(168)
    color2 = getRandomInt(168)
    color3 = getRandomInt(168)
}

//random function
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max) + 1)
}

//increase stroke size       note: sW is short for strokeWeight because when I wrote strokeWeight as a variable it glitched out and said it was not a function
function increaseStrokeSize() {
    sW += 2
    strokeSizeFeedbackEl.innerHTML = `Stroke Size: ${sW}`
}

function resetStrokeSize() {
    sW = 6
    strokeSizeFeedbackEl.innerHTML = `Stroke Size: ${sW}`
}

//see if mouse is pressed and will keep drawing or not
function mousePressed() {
    if (isDrawing && currentPointIsCloseToFirst()) {
        shapes.push(points)
        clearDots()
    } else {
        isDrawing = true
        points.push({x: mouseX, y: mouseY})
    }
}

//used to clear dots
function keyPressed() {
    if(keyCode === 32) { // spacebar
        clearDots()
    } else if(keyCode === 13) { // enter
        smileyFaceT = !smileyFaceT
    } else if(keyCode === 40) { //arrow down
        isMovingDown = !isMovingDown
    } else if(keyCode === 38) { //arrow up
        isMovingUp = true
    } else if(keyCode === 37) { //arrow left
        isMovingLeft = true
    } else if(keyCode === 39) { //arrow right
        isMovingRight = true
    } else if (keyCode === 49) { // 1
        background2 = false
        background1 = true
    } else if(keyCode === 50) { // 2
        background1 = false
        background2 = true
    } else if(keyCode === 48) { // 0
        background1 = false
        background2 = false
    }
}

function keyReleased() {
    if(keyCode === 40) { //arrow down
        isMovingDown = false
    } else if(keyCode === 38) { //arrow up
        isMovingUp = false
    } else if(keyCode === 37) { //arrow left
        isMovingLeft = false
    } else if(keyCode === 39) { //arrow right
        isMovingRight = false
    }
}

function move(){
    if(isMovingUp){
        smileyY -= 10
    }
    if(isMovingDown){
        smileyY += 10
    }
    if(isMovingRight){
        smileyX += 10
    }
    if(isMovingLeft){
        smileyX -= 10
    }
}

//used to draw the dots that have already been placed
function drawDots() {
    fill('darkred') 
    noStroke()

    points.forEach(point => {
        circle(point.x, point.y, size)
    })
}

//draws the lines to connect the dots 
function drawLines() {
    stroke(color1, color2, color3)
    strokeWeight(sW)

    for (let i = 0; i < points.length - 1; i++) {
        // points[i], points[i+1]
        line(points[i].x, points[i].y,
            points[i+1].x, points[i+1].y)
    }
}

//draws a dot around the point of the mouse
function drawMouseDot() {
    fill('cyan')
    if (currentPointIsCloseToFirst()) {
        fill('purple')
    }
    noStroke()

    circle(mouseX, mouseY, size)
    stroke(color1, color2, color3)
    strokeWeight(sW)

    line(mouseX, mouseY,
        points[points.length-1].x, points[points.length-1].y)
}

//finalizes shape and turns the line blue
function drawShapes() {
    stroke('blue')
    strokeWeight(sW)

    shapes.forEach(shape => {
        for (let i = 0; i < shape.length - 1; i++) {
            line(shape[i].x, shape[i].y, 
                shape[i+1].x, shape[i+1].y)
        }
        line(shape[0].x, shape[0].y,
            shape[shape.length-1].x,
            shape[shape.length-1].y)
    })
}

function clearDots() {
    points = []
    isDrawing = false
    randomColor()
    sw = 6
}

function distance(pt1, pt2) {
    let deltaX = pt2.x - pt1.x
    let deltaY = pt2.y - pt1.y
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY)
}

function currentPointIsCloseToFirst() {
    return distance({x: mouseX, y: mouseY}, points[0]) < size
}

shapeButton.addEventListener('click', shapeColorPrompt)
randomColorButton.addEventListener('click', randomColor)
strokeSizeButton.addEventListener('click', increaseStrokeSize)
resetStrokeButton.addEventListener('click', resetStrokeSize)

//you can see what time it is when you are drawing
function clock() {
    translate(50, 50)
    rotate(-90)
    let hr = hour()
    let mn = minute() 
    let sc = second()
    
    noFill()
    stroke(0)
    text(hr + ':' + mn + ':' + sc, 100, 100)
    //text(hr + ':' + mn + ':' + sc, 10, 10)
    strokeWeight(4)
    stroke('lightblue')
    let scEnd = map(sc, 0, 60, 0, 360)
    arc(0, 0, 85, 85, 0, scEnd)

    push()
    rotate(scEnd)
    stroke('lightblue')
    line(0, 0, 25, 0)
    pop()

    stroke('hotpink')
    let mnEnd = map(mn, 0, 60, 0, 360)
    arc(0, 0, 75, 75, 0, mnEnd)


    push()
    rotate(mnEnd)
    stroke('hotpink')
    line(0, 0, 18.75, 0)
    pop()

    stroke('black')
    let hrEnd = map(hr % 12, 0, 12, 0, 360)
    arc(0, 0, 65, 65, 0, hrEnd)

    push()
    rotate(hrEnd)
    stroke('black')
    line(0, 0, 12.5, 0)
    pop()
}