function CheckHit (attacker) {
    if (attacker == "player") {
        if (player.attackBox.x - player.attackBox.offset + player.attackBox.width >= enemy.position.x && player.attackBox.x - player.attackBox.offset <= enemy.position.x + enemy.width && player.position.y + player.attackBox.height >= enemy.position.y && player.position.y <= enemy.position.y + enemy.height && player.damage && player.frameCurrent == 5) {
            //enemy.health -= 20
            enemy.takeDamage("enemy")
            //document.getElementById("enemyHealth").style.width = enemy.health + "%"
            gsap.to('#enemyHealth', {
                width: enemy.health + '%'
              })
            return true;
            
        }
    }
    else {
        if (enemy.attackBox.x - enemy.attackBox.offset + enemy.attackBox.width >= player.position.x && enemy.attackBox.x - enemy.attackBox.offset <= player.position.x + player.width && enemy.position.y + enemy.attackBox.height >= player.position.y && enemy.position.y <= player.position.y + player.height && enemy.damage && enemy.frameCurrent == 2) {
            //player.health -= 20
            player.takeDamage("player")
            //document.getElementById("playerHealth").style.width = player.health + "%"
            gsap.to('#playerHealth', {
                width: player.health + '%'
              })
            return true;
        }
    }

    return false;
}

const timer = document.getElementById("timer")
let time = 5
function decreaseTimer() { 
    timer.innerHTML = time
    time--
    checkWinner()
    if (time <= -1) {
        clearInterval(t);
        window.removeEventListener("keydown", keyDown)
        // window.removeEventListener("keyup", keyUp)
    }
    
    
}


function checkWinner () {
    const status = document.getElementById("status");
    if (time <= -1) {

        if (player.health > enemy.health) {
            status.innerHTML = "Player One Won"
        }
        else if (player.health == enemy.health) {
            status.innerHTML = "Tie"
        }
        else {
            status.innerHTML = "Player Two Won"
        }
    }
    else if (time > 0) {
        if (player.health <= 0) {
            status.innerHTML = "Player Two Won"
            clearInterval(t)
        }
        if (enemy.health <= 0) {
            status.innerHTML = "Player One Won"
            clearInterval(t)
        }
    }
}

function animate() {
    reqAnimation = window.requestAnimationFrame(animate)
    // c.fillStyle = 'black'
    // c.fillRect(0, 0, canvas.width, canvas.height)

    

    //NEED TO UPDATE
    // if (player.dX != 0) {
    //     player.dX = player.dX < 0 ? player.dX + .2 : player.dX - .2
    //     if (Math.abs(player.dX) < .4) {
    //         player.dX = 0
    //     }
    // }
    // //console.log(player.dX)
    // if (keys.a && player.key == 'left') {
    //     player.dX = -5
    // }
    // else if (keys.d && player.key == 'right') {
    //     player.dX = 5
    // }
    
    if (keys.a) {
        player.movement('left')
    }
    else if (keys.d) {
        player.movement('right')
    }
    else {
        player.movement()
    }

    if (keys.ArrowLeft) {
        enemy.movement('left')
    }
    else if (keys.ArrowRight) {
        enemy.movement('right')
    }
    else {
        enemy.movement()
    }


    if (player.isAttacking && CheckHit("player")) {
        console.log("hit")
        player.damage = false
    }

    if (enemy.isAttacking && CheckHit("enemy")) {
        console.log("hit")
        enemy.damage = false
    }


    background.update()
    shop.update()

    // c.fillStyle = "black"
    // console.log(enemy.attackBox.offset)
    // c.fillRect(enemy.attackBox.x - enemy.attackBox.offset, enemy.attackBox.y, enemy.attackBox.width, enemy.attackBox.height)
    // c.fillRect(player.attackBox.x, player.attackBox.y, player.attackBox.width, player.attackBox.height)
    

    // c.fillStyle = "red"
    // c.fillRect(player.position.x, player.position.y, player.width, player.height)
    // c.fillRect(enemy.position.x, enemy.position.y, player.width, player.height)
    

    c.fillStyle = 'rgba(255,255,255,0.1)'
    c.fillRect(0,0, gameContainer.width, gameContainer.height)
    player.update()

    //console.log(player.position.y)
    enemy.update()

    

    //CheckHit("enemy")
    
    
}
