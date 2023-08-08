class Sprite {
    constructor ({position, imageSrc, scale = 1, frameCount = 1, offset = {x: 0, y:0}}) {
        this.position = position
        this.offset = offset
        this.image = new Image()
        this.image.src = imageSrc
        this.frameCount = frameCount
        this.image.width
        this.image.height
        this.width = 50
        this.height = 150
        this.frameCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 10 //how fast the animation is
        this.scale = scale
    }

    draw() {
        c.drawImage(
            this.image,
            this.frameCurrent * (this.image.width / this.frameCount),
            0,
            this.image.width / this.frameCount,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.frameCount) * this.scale,
            this.image.height * this.scale
          )
    }

    animate() {
        this.framesElapsed++
        if (this.framesElapsed % this.framesHold == 0) {
            this.frameCurrent++
            if (this.frameCurrent == this.frameCount) {
                this.frameCurrent = 0
            }
        }
    }

    update () {
        this.animate()
        this.draw()
        
        
    }
}

const canvasHeight = 97
class Fighter extends Sprite {
    constructor({position, velocity, jumpConst = -20, color, offset, attackOffset = 0, imageSrc, scale = 1, frameCount = 1, sprites}) {
        super({
            position,
            imageSrc,
            scale,
            frameCount,
            offset
        })
        
        this.jumpConst = jumpConst
        this.dX = velocity.x;
        this.dY = velocity.y;
        this.key = '',
        this.attackBox = {
            x: this.position.x,
            y: this.position.y,
            width: 200,
            height: 150,   
            offset : attackOffset
                     
        }
        this.color = color;
        this.isAttacking = false
        this.damage = false
        this.hit = false
        this.dead = false
        this.health = 100;
        this.frameCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5

        this.sprites = sprites

        for (const sprite in this.sprites) {
            
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }

        //console.log(this.sprites.run.image)

        //this.image = this.sprites.run.image




       
    }

    deathAnimation() {
        console.log("here")
        //window.cancelAnimationFrame(reqAnimation)
        window.removeEventListener("keydown", keyDown)
        //window.removeEventListener("keyup",keyUp)
        this.dead = true
        
    }

    takeDamage(p) {
        this.hit = true;
        this.health -=20
        if (this.health <= 0) {
            this.deathAnimation()
        }
    }
    attack() { 
        this.isAttacking = true;
        this.damage = true;
        // setTimeout(() => {
        //     this.isAttacking = false
        // }, 100)
    }

    // draw() {
    //     c.fillStyle = this.color
    //     c.fillRect(this.position.x, this.position.y, this.width, this.height);
    //     if (this.isAttacking) {
    //         c.fillStyle = 'green'
    //         c.fillRect(this.attackBox.x, this.attackBox.y, this.attackBox.width, this.attackBox.height);
    //     }
        
    // }

    updateFrames(movement) {
        this.frameCount = this.sprites[movement].frameCount
        this.frameCurrent = 0
    }

    movement(key) {
        if (this.dX != 0) {
            this.dX = this.dX < 0 ? this.dX + .2 : this.dX - .2
            if (Math.abs(this.dX) < .4) {
                this.dX = 0
            }
        }
        //console.log(this.dX)
        if (key == 'left' && this.key == 'left') {
            this.dX = -5
        }
        else if (key == 'right' && this.key == 'right') {
            this.dX = 5
        }
    }
    movementSprite() {
        if (this.dead) {
            if (this.image != this.sprites.death.image) {
                this.image = this.sprites.death.image
                this.updateFrames("death")
            }
            if (this.frameCurrent == this.frameCount - 1) {
                this.framesElapsed = 0.5
            }
            return
        }
        else if (this.hit) {
            if (this.image != this.sprites.takeHit.image) {
                this.image = this.sprites.takeHit.image
                this.updateFrames("takeHit")
                this.isAttacking = false
                this.damage = false
            }
            if (this.frameCurrent == this.frameCount - 1) {
                this.hit = false
            }
            return
        }
        else if (this.isAttacking) {
            if (this.image != this.sprites.attack.image) {
                this.image = this.sprites.attack.image
                this.updateFrames("attack")
            }
            if (this.frameCurrent == this.frameCount - 1) {
                this.isAttacking = false
                this.damage = false
            }
            return
            
        }

        //else 
        if (this.dY == 0) {
            if (this.dX !== 0) {
                if (this.image != this.sprites.run.image) {
                    this.image = this.sprites.run.image
                    this.updateFrames("run")
                }
                
            }
            else {
                if (this.image != this.sprites.idle.image) {
                    this.image = this.sprites.idle.image
                    this.updateFrames("idle")
                }
            }
        }
        else {
            if (this.dY>0) {
                if (this.image != this.sprites.jump.image) {
                    this.image = this.sprites.jump.image
                    this.updateFrames("jump")
                }
            }
            else {
                if (this.image != this.sprites.fall.image) {
                    this.image = this.sprites.fall.image
                    this.updateFrames("fall")
                }
            }   
        }
        
        

    }
    update() {
        //console.log(this.position.y)
        this.position.y += this.dY
        this.position.x += this.dX
        if (this.position.y + this.height >= gameContainer.height - canvasHeight) {
            this.position.y = gameContainer.height - this.height - canvasHeight
            this.dY = 0 
        }
        else {
            this.dY +=gravity
        }

        this.attackBox.x = this.position.x; 
        this.attackBox.y = this.position.y;


        this.movementSprite()
        //(this.image.src)
        this.animate()    
        this.draw()

        
        
    }
}






