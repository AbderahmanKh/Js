const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.65

class Sprite {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.height = 150
    }

    draw() {
        if (this === chirir) {
            c.fillStyle = 'yellow'; // Set color to yellow for chirir
        } else {
            c.fillStyle = 'red'; // Default color for other sprites
        }
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        

        if (this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
        } else this.velocity.y += gravity
    }

}

const player = new Sprite({
    position:{
    x: 0,
    y: 0
},
velocity:{
    x: 0, 
    y: 0
}
})


const chirir = new Sprite({
    position:{
    x: 400,
    y: 100
},
velocity:{
    x: 0, 
    y: 0 
}
})

console.log([player])

const keys = {
    a : {
        pressed : false
    },
    d : {
        pressed : false
    },

    ArrowLeft: { pressed: false },

    ArrowRight: { pressed: false },
}

let lastkey

function Animation() {
    window.requestAnimationFrame(Animation)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas .height)
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
}
Animation()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd' :
            keys.d.pressed = true
            lastkey = 'd'
            break
        case 'a' :
            keys.a.pressed = true
            lastkey = 'a'
            break
        case 'w' :
            player.velocity.y = -20
            break
        
        case 'ArrowRight' :
            keys.ArrowRight.pressed = true
            chirir.lastkey = 'ArrowRight'
            break
        case 'ArrowLeft' :
            keys.ArrowLeft.pressed = true
            chirir.lastkey = 'ArrowLeft'
            break
        case 'ArrowUp' :
            chirir.velocity.y = -20
            break

    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd' :
            keys.d.pressed = false
            break
        case 'a' :
            keys.a.pressed = false
            break
    }

    //chirir keys hehe
    switch (event.key) {
        case 'ArrowRight' :
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft' :
            keys.ArrowLeft.pressed = false
            break
    }
}) 
