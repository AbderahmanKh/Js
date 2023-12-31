const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.65

class Sprite {
    constructor({ position, velocity, offset }) {
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.atackbox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50
        }
        this.isAttacking
        this.health = 100
    }

    draw() {
        if (this === chirir) {
            c.fillStyle = 'yellow'; // Set color to yellow for chirir
        } else {
            c.fillStyle = 'red'; // Default color for other sprites
        }
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        // Atacking box 
        if (this.isAttacking) {
            c.fillStyle = 'green'
            c.fillRect(
                this.atackbox.position.x,
                this.atackbox.position.y,
                this.atackbox.width,
                this.atackbox.height
            )
        }
    }



    update() {
        this.draw()
        this.atackbox.position.x = this.position.x + this.atackbox.offset.x
        this.atackbox.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y


        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else this.velocity.y += gravity
    }

    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }

}

const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    }
})


const chirir = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: -50,
        y: 0
    }
})

console.log([player])

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },

    ArrowLeft: { pressed: false },

    ArrowRight: { pressed: false },
}

let lastkey

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.atackbox.position.x + rectangle1.atackbox.width >= rectangle2.position.x &&
        rectangle1.atackbox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.atackbox.position.y + rectangle1.atackbox.height >= rectangle2.position.y &&
        rectangle1.atackbox.position.y <= rectangle2.position.y + rectangle2.height
    );

}

function Winner({player, chirir, TimerId}) {
    clearTimeout(TimerId)
    document.querySelector('#DisplayEnd').style.display = 'flex'
    if (player.health === chirir.health) {
        document.querySelector('#DisplayEnd').innerHTML = 'Ta3adol'
    } else if (player.health > chirir.health) {
        document.querySelector('#DisplayEnd').innerHTML = 'Wa rbe7 la3ib 1'
    }else if (player.health < chirir.health) {
        document.querySelector('#DisplayEnd').innerHTML = 'Wa rbe7 la3ib 2'
    }
}

let timer = 60
let TimerId
function DecreaseTimer() {
    if (timer > 0) {
        TimerId = setTimeout(DecreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }
    if (timer === 0) {
        
        Winner({player, chirir, TimerId})
    }
}

DecreaseTimer()

function Animation() {
    window.requestAnimationFrame(Animation)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    chirir.update()

    player.velocity.x = 0
    chirir.velocity.x = 0


    // player mvt
    if (keys.a.pressed && lastkey === 'a') {
        player.velocity.x = -5
    } else if (keys.d.pressed && lastkey === 'd') {
        player.velocity.x = 5
    }


    // chirir mvt hehe
    if (keys.ArrowLeft.pressed && chirir.lastkey === 'ArrowLeft') {
        chirir.velocity.x = -5
    } else if (keys.ArrowRight.pressed && chirir.lastkey === 'ArrowRight') {
        chirir.velocity.x = 5
    }

    // coliision detection 
    if (rectangularCollision({
        rectangle1: player,
        rectangle2: chirir
    })
        && player.isAttacking) {
        player.isAttacking = false
        chirir.health -= 10
        document.querySelector('#enemyhealth').style.width = chirir.health + '%'
        console.log('Player is attacking')
    }

    if (rectangularCollision({
        rectangle1: chirir,
        rectangle2: player
    })
        && chirir.isAttacking) {
        chirir.isAttacking = false
        player.health -= 10
        document.querySelector('#playerhealth').style.width = player.health + '%'
        console.log('Enemy is attacking')
    }

    // end game by health

    if (chirir.health <= 0 || player.health <= 0) {
        Winner({player, chirir, TimerId})
    }
}


Animation()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            lastkey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            lastkey = 'a'
            break
        case 'w':
            player.velocity.y = -20
            break
        case 'f':
            player.attack()
            break

        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            chirir.lastkey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            chirir.lastkey = 'ArrowLeft'
            break
        case 'ArrowUp':
            chirir.velocity.y = -20
            break
        case 'l':
            chirir.attack()
            break

    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
    }

    //chirir keys hehe
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }
}) 
