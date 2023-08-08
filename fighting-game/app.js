const gameContainer = document.getElementById("gameContainer")
const c = gameContainer.getContext('2d')
gameContainer.width = 1024
gameContainer.height = 576
const gravity = 1.0
const jumpConst = 20
const height = 100
const width = 50


// const canv = document.getElementById("test")
// const elem = document.createElement("canvas")
// elem.innerHTML = "hello"
// elem.style.position = 'absolute'
// elem.style.top = "576px"
// elem.style.color = 'black'
// const d = canv.getContext('2d')
// canv.appendChild(elem)

// canv.width = 1024
// canv.height = 576
// d.fillStyle = 'black'
// d.fillRect(0,0,canv.width,canv.height)

const background = new Sprite ({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
})

const shop = new Sprite ({
    position: {
        x: 600,
        y: 163
    },
    imageSrc: './img/shop.png',
    scale: 2.5,
    frameCount: 6
})

const player = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'red',
    offset: {
        x: 173,
        y: 93
    },
    imageSrc: './img/samuraiMack/Idle.png',
    frameCount: 8,
    scale: 2,
    sprites: {
        idle: {
            imageSrc: './img/samuraiMack/Idle.png',
            frameCount: 8
        },
        run: {
            imageSrc: './img/samuraiMack/Run.png',
            frameCount: 8
        },
        jump: {
            imageSrc: './img/samuraiMack/Jump.png',
            frameCount: 2
        },
        fall: {
            imageSrc: './img/samuraiMack/Fall.png',
            frameCount: 2
        },
        attack: {
            imageSrc: './img/samuraiMack/Attack1.png',
            frameCount: 6
        },
        takeHit: {
            imageSrc: './img/samuraiMack/Take Hit - white silhouette.png',
            frameCount: 4
        },
        death: {
            imageSrc: './img/samuraiMack/Death.png',
            frameCount: 6
        }
    }
})

const enemy = new Fighter({
    position: {
        x: 400,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
    offset: {
        x: 170,
        y: 107
    },
    attackOffset: 150,
    imageSrc: './img/kenji/Idle.png',
    frameCount: 4,
    scale: 2,
    sprites: {
        idle: {
            imageSrc: './img/kenji/Idle.png',
            frameCount: 4
        },
        run: {
            imageSrc: './img/kenji/Run.png',
            frameCount: 8
        },
        jump: {
            imageSrc: './img/kenji/Jump.png',
            frameCount: 2
        },
        fall: {
            imageSrc: './img/kenji/Fall.png',
            frameCount: 2
        },
        attack: {
            imageSrc: './img/kenji/Attack1.png',
            frameCount: 4
        },
        takeHit: {
            imageSrc: './img/kenji/Take Hit.png',
            frameCount: 3
        },
        death: {
            imageSrc: './img/kenji/Death.png',
            frameCount: 7
        }
    }
})


const keys = {
    a: false,
    d: false,
    w: false,
    ArrowRight: false,
    ArrowLeft: false,
    ArrowUp: false,
    enemyKey: '',
    playerKey: ''
}

animate() 

const t = setInterval(decreaseTimer, 1000)





function keyDown (event) {
    console.log(event.key)
    switch (event.key) {
        case 'd':
            keys.d = true;
            player.key = 'right';
            break;
        case 'a':
            keys.a = true;
            player.key = 'left';
            break;
        case 'w':
            keys.w = true;
            player.dY = player.jumpConst;
            break;
    }

    //Shitty Code
    if (event.key == ' ' && player.isAttacking == false) {
        player.attack();
    }

    switch (event.key) {
        case 'ArrowLeft':
            keys.ArrowLeft = true;
            enemy.key = 'left';
            break;
        case 'ArrowRight':
            keys.ArrowRight = true;
            enemy.key = 'right';
           
            break;
        case 'ArrowUp':
            keys.ArrowUp = true;
            enemy.dY = enemy.jumpConst;
            break;
    }

    if (event.key == 'ArrowDown' && enemy.isAttacking == false) {
        console.log("here")
        enemy.attack();
    }
} 
window.addEventListener('keydown', keyDown)


function keyUp(event) {
    switch(event.key) {
        case 'd':
            keys.d = false;
            break;
        case 'a':
            keys.a = false;
            break;
        case 'w':
            keys.w = false;
            break;
    }

    switch (event.key) {
        case 'ArrowLeft':
            keys.ArrowLeft = false;
            break;
        case 'ArrowRight':
            keys.ArrowRight = false;
            break;
        case 'ArrowUp':
            keys.ArrowUp = false;
            break;
    }
}

window.addEventListener('keyup', keyUp)