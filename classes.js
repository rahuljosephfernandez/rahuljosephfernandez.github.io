class BOUNDARY {

    static WIDTH = 60
    static HEIGHT = 60

    constructor({ POSITION }) {
        this.POSITION = POSITION
        this.WIDTH = 60
        this.HEIGHT = 60
    }

    DRAW() {
        CONTEXT.fillStyle = "rgba(255, 255, 255, 0.0)";
        CONTEXT.fillRect(this.POSITION.x, this.POSITION.y, this.WIDTH, this.HEIGHT)
    }

};

class SPRITE {

    constructor({IMAGE, POSITION, VELOCITY, FRAMES = { max: 1 }}) {
        this.IMAGE = IMAGE
        this.POSITION = POSITION
        this.VELOCITY = VELOCITY
        this.FRAMES = { ...FRAMES, VAL: 0, ELAPSED: 0 }
        this.MOVING = false
        this.IDLING = true
    }

    DRAW() {

            CONTEXT.drawImage(
                this.IMAGE,
                this.FRAMES.VAL * 48,
                0,
                this.IMAGE.width / this.FRAMES.max,
                this.IMAGE.height,
                this.POSITION.x,
                this.POSITION.y,
                this.IMAGE.width / this.FRAMES.max,
                this.IMAGE.height)
    
            if (this.MOVING || this.IDLING) {
                if (this.FRAMES.max > 1) 
                    {
                        this.FRAMES.ELAPSED++
                    }
                if (this.FRAMES.ELAPSED % 10 === 0) 
                    {
                        if (this.FRAMES.VAL < this.FRAMES.max - 1) {
                            this.FRAMES.VAL++
                    }
                    else 
                    {
                        this.FRAMES.VAL = 0
                    }
                }
            }

    }

};

class INFORMATION_TILE {

    static WIDTH = 528
    static HEIGHT = 350

    constructor({ POSITION, IMAGE, DISPLAY }) {
        this.IMAGE = IMAGE
        this.POSITION = POSITION
        this.WIDTH = 528
        this.HEIGHT = 350
        this.DISPLAY = DISPLAY
    }

    DRAW() {
        if (this.DISPLAY) {
            CONTEXT.drawImage(this.IMAGE, this.POSITION.x, this.POSITION.y, this.WIDTH, this.HEIGHT)
            // window.location.href = "about/about.html"; // -> THIS WORKS FOR CHANING THE WINDOW
        }
    }

};

class GAMEPLAY_TILES {

    static WIDTH = 572
    static HEIGHT = 172

    constructor({ POSITION, IMAGE, DISPLAY }) {
        this.IMAGE = IMAGE
        this.POSITION = POSITION
        this.WIDTH = 572
        this.HEIGHT = 172
        this.DISPLAY = DISPLAY
    }

    DRAW() {
        if (this.DISPLAY) {
            CONTEXT.drawImage(this.IMAGE, this.POSITION.x, this.POSITION.y, this.WIDTH, this.HEIGHT) 
        }
    }

};

class ABOUT_TILE {

    static WIDTH = 528
    static HEIGHT = 350

    constructor({ POSITION, IMAGE, DISPLAY }) {
        this.IMAGE = IMAGE
        this.POSITION = POSITION
        this.WIDTH = 528
        this.HEIGHT = 350
        this.DISPLAY = DISPLAY
    }

    DRAW() {
        if (this.DISPLAY) {
            window.location.href = "about/about.html"; // -> THIS WORKS FOR CHANGING THE WINDOW
        }
    }

};

class WORK_TILE {

    static WIDTH = 528
    static HEIGHT = 350

    constructor({ POSITION, IMAGE, DISPLAY }) {
        this.IMAGE = IMAGE
        this.POSITION = POSITION
        this.WIDTH = 528
        this.HEIGHT = 350
        this.DISPLAY = DISPLAY
    }

    DRAW() {
        if (this.DISPLAY) {
            window.location.href = "work/work.html"; // -> THIS WORKS FOR CHANGING THE WINDOW
        }
    }

};