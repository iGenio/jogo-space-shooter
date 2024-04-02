const yourShip = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-play-area');
const aliensImg = ['img/monster-1.png','img/monster-2.png','img/monster-3.png'];
const instructionsText = document.querySelector('.game-instructions');
const startButton = document.querySelector('.start-button')
let alienInterval;

// Movimento e tiro da nave
function flyShip(event) {
    if (event.key === 'w') {
        event.preventDefault();
        moveUp();
    } else if (event.key === 's') {
        event.preventDefault();
        moveDown();
    } else if (event. key === " ") {
        event.preventDefault();
        fireLaser();
    }
}

function moveUp() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    if (topPosition === "0px") {
        return
    } else {
        let position = parseInt(topPosition);
        position -= 25;
        yourShip.style.top = `${position}px`

    }
}


function moveDown() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    if (topPosition === "525px") {
        return
    } else {
        let position = parseInt(topPosition);
        position += 25;
        yourShip.style.top = `${position}px`

    }
}

function fireLaser() {
    let laser = createLaserElement();
    playArea.appendChild(laser);
    moveLaser(laser);
}

function createLaserElement() {
    let positionX = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'))
    let positionY = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'))
    
    let newLaser = document.createElement('img');
    newLaser.src = 'img/shoot.png';
    newLaser.classList.add('laser');
    newLaser.style.left = `${positionX}px`
    newLaser.style.top = `${positionY -  10}px`

    return newLaser
}

function moveLaser(laser) {
    let laserInterval = setInterval(() => {
        let positionX = parseInt(laser.style.left)
        let aliens = document.querySelectorAll('.alien')

        aliens.forEach((alien) => {
            if (checkLaserCollision(laser,alien)) {
                alien.src = 'img/explosion.png'
                alien.classList.remove();
                alien.classList.add('dead-alien')
            }
        })

        if (positionX === 340) {
            laser.remove()
        } else {
            laser.style.left = `${positionX + 8}px`
        }
    }, 10);
}

function createAliens() {
    let newAlien = document.createElement('img');
    let alienSprite = aliensImg[Math.floor(Math.random() * aliensImg.length)]
    newAlien.src = alienSprite
    newAlien.classList.add('alien')
    newAlien.classList.add('alien-transition')
    newAlien.style.left = '370px'
    newAlien.style.top = `${Math.floor(Math.random() * 330)  + 30}px`
    playArea.appendChild(newAlien)

    moveAlien(newAlien)
}

function moveAlien(alien) {
    let moveAlienInterval = setInterval(() => {
        let positionX = parseInt(window.getComputedStyle(alien).getPropertyValue('left'))

        if (positionX <= 50) {
            if (Array.from(alien.classList).includes('dead-alien')) {
                alien.remove()
            } else {
                gameOver()
            }
        } else {
            alien.style.left = `${positionX - 4}px`
        }
    }, 30);
}

function checkLaserCollision(laser,alien) {
    let laserTop = parseInt(laser.style.top);
    let laserLeft = parseInt(laser.style.left);
    let laserBottom = laserTop - 20;
    let alienTop = parseInt(alien.style.top);
    let alienLeft = parseInt(alien.style.left);
    let alienBottom = alienTop - 30;

    if (laserLeft != 340 && laserLeft + 40 >= alienLeft) {
        if (laserTop <= alienTop && laserTop >= alienBottom) {
            return true;
        } else {
            return false;
        }
    } else {
        return false
    }
}


//! Inicio do JOGO
startButton.addEventListener('click', (event) => {
    playGame();
})

function playGame() {
    startButton.style.display = 'none';
    instructionsText.style.display = 'none';
    window.addEventListener('keydown',flyShip);
    alienInterval = setInterval(() => {
        createAliens()
    }, 2000);
}


window.addEventListener('keydown', flyShip)


//! Fim do JOGO
function gameOver() {
    window.removeEventListener('keydown', flyShip)
    clearInterval(alienInterval);
    let aliens = document.querySelectorAll('.alien')
    aliens.forEach((alien) => alien.remove())
    let lasers = document.querySelectorAll('.laser')
    lasers.forEach((laser) => laser.remove())
    
    setTimeout(() => {
       alert('Game Over!');
       yourShip.style.top = "250px"
       startButton.style.display = "block"
       instructionsText.style.display = "block"
    });
}