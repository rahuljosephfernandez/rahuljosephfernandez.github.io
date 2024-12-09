const CANVAS = document.getElementById('home');
const CONTEXT = CANVAS.getContext('2d');

CANVAS.width = 1920;
CANVAS.height = 1080;

const TILES_X = 70

const COLLISIONS_MAP = []
for (let i = 0; i < COLLISIONS.length; i += TILES_X) {
    COLLISIONS_MAP.push(COLLISIONS.slice(i, TILES_X + i));
}

const INFORMATION_MAP = []
for (let i = 0; i < INFORMATION.length; i += TILES_X) {
    INFORMATION_MAP.push(INFORMATION.slice(i, TILES_X + i));
}

const PAGES_MAP = []
for (let i = 0; i < PAGES.length; i += TILES_X) {
    PAGES_MAP.push(PAGES.slice(i, TILES_X + i));
}

const ABOUT_MAP = []
for (let i = 0; i < ABOUT_PAGES.length; i += TILES_X) {
    ABOUT_MAP.push(ABOUT_PAGES.slice(i, TILES_X + i));
}

const WORK_MAP = []
for (let i = 0; i < WORK_PAGES.length; i += TILES_X) {
    WORK_MAP.push(WORK_PAGES.slice(i, TILES_X + i));
}

const BOUNDARIES = [];

COLLISIONS_MAP.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol == 5553) {
            BOUNDARIES.push(new BOUNDARY({POSITION: {
                x: j * BOUNDARY.WIDTH,
                y: i * BOUNDARY.HEIGHT
            }}))
        }
    })
});

const INFORMATION_ZONES = [];

INFORMATION_MAP.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol == 5554) {
            INFORMATION_ZONES.push(new BOUNDARY({POSITION: {
                x: j * BOUNDARY.WIDTH,
                y: i * BOUNDARY.HEIGHT
            }}))
        }
    })
});

const PAGE_ZONES = [];

PAGES_MAP.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol == 5554) {
            PAGE_ZONES.push(new BOUNDARY({POSITION: {
                x: j * BOUNDARY.WIDTH,
                y: i * BOUNDARY.HEIGHT
            }}))
        }
    })
});

const ABOUT_ZONES = [];

ABOUT_MAP.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol == 5554) {
            ABOUT_ZONES.push(new BOUNDARY({POSITION: {
                x: j * BOUNDARY.WIDTH,
                y: i * BOUNDARY.HEIGHT
            }}))
        }
    })
});

const WORK_ZONES = [];

WORK_MAP.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol == 5554) {
            WORK_ZONES.push(new BOUNDARY({POSITION: {
                x: j * BOUNDARY.WIDTH,
                y: i * BOUNDARY.HEIGHT
            }}))
        }
    })
});

const MAP = new Image();
MAP.src = 'assets/main_v3.png';

const CHAR_IMAGE = new Image();
CHAR_IMAGE.src = 'assets/idle/idle_down.png';

const FG = new Image();
FG.src = 'assets/fgmain_v3.png';

const ITILE = new Image();
ITILE.src = 'assets/itile.png';

const GTILE = new Image();
GTILE.src = 'assets/gtile.png';

const FPS = 120
const SCREEN_WIDTH = 3360;
const SCREEN_HEIGHT = 1920;

const START_X = 1040;
const START_Y = 720;

const BACKGROUND = new SPRITE({
    POSITION: {
        x: 0,
        y: 0
    },
    IMAGE: MAP
});

const FOREGROUND = new SPRITE({
    POSITION: {
        x: 0,
        y: 0
    },
    IMAGE: FG
});

const CHARACTER = new SPRITE({
    POSITION: {
        x: START_X,
        y: START_Y
    },
    IMAGE: CHAR_IMAGE,
    FRAMES: {
        max: 8
    }
});

const KEYS = {
    'w': {pressed: false},
    'a': {pressed: false},
    's': {pressed: false},
    'd': {pressed: false},
    'ArrowUp': {pressed: false},
    'ArrowLeft': {pressed: false},
    'ArrowRight': {pressed: false},
    'ArrowDown': {pressed: false}
};

const INFOTILE = new INFORMATION_TILE({
    POSITION: {
        x: 0,
        y: 0
    },
    IMAGE: ITILE,
    DISPLAY: false
});

const GAMEPLAY_TILE = new GAMEPLAY_TILES({
    POSITION: {
        x: 0,
        y: 0
    },
    IMAGE: GTILE,
    DISPLAY: true
});

const ABOUTTILE = new ABOUT_TILE({
    POSITION: {
        x: 0,
        y: 0
    },
    IMAGE: ITILE,
    DISPLAY: false
});

const WORKTILE = new WORK_TILE({
    POSITION: {
        x: 0,
        y: 0
    },
    IMAGE: ITILE,
    DISPLAY: false
});

const MOVABLES = [BACKGROUND, ...BOUNDARIES, ...INFORMATION_ZONES, ...PAGE_ZONES, ...ABOUT_ZONES, ...WORK_ZONES, FOREGROUND];
// const MOVABLES = [BACKGROUND, ...BOUNDARIES] // spread operator

function COLLISION_DETECTION ({ RECTANGLE_1, RECTANGLE_2 }) {
    return (
        RECTANGLE_1.POSITION.x + 32 >= RECTANGLE_2.POSITION.x && 
        RECTANGLE_1.POSITION.x <= RECTANGLE_2.POSITION.x + RECTANGLE_2.WIDTH &&
        RECTANGLE_1.POSITION.y <= RECTANGLE_2.POSITION.y + RECTANGLE_2.HEIGHT &&
        RECTANGLE_1.POSITION.y + 48 >= RECTANGLE_2.POSITION.y
    )
};

function ONLOADS() {

    BACKGROUND.IMAGE.onload = () => {
        console.log('background loaded')
    }
    FOREGROUND.IMAGE.onload = () => {
        console.log('foreground loaded')
    }

};

function ANIMATE() {

    window.requestAnimationFrame(ANIMATE);

    ONLOADS();

    BACKGROUND.DRAW();

    BOUNDARIES.forEach(boundary => {
        boundary.DRAW()
    });

    INFORMATION_ZONES.forEach(infozone => {
        infozone.DRAW()
    });

    PAGE_ZONES.forEach(pagezone => {
        pagezone.DRAW()
    });

    ABOUT_ZONES.forEach(aboutzones => {
        aboutzones.DRAW()
    });

    WORK_ZONES.forEach(workzone => {
        workzone.DRAW()
    });
    
    CHARACTER.DRAW();

    FOREGROUND.DRAW();

    let MOVING = true;
    CHARACTER.MOVING = false;

    if (CHARACTER.IDLING) {
        CHARACTER.IMAGE.src = 'assets/idle/idle_down.png';
    }

    if (!(KEYS.w.pressed || KEYS.a.pressed || KEYS.s.pressed || KEYS.d.pressed)) {
        CHARACTER.MOVING = false
        CHARACTER.IDLING = true

        // INFORMATION ZONES COLLISION
        
        for (let i = 0; i < INFORMATION_ZONES.length; i++) {
            const INFOS = INFORMATION_ZONES[i]
            if (
                COLLISION_DETECTION({
                    RECTANGLE_1: CHARACTER,
                    RECTANGLE_2: {...INFOS, POSITION: {
                        x: INFOS.POSITION.x,
                        y: INFOS.POSITION.y
                    }}
                })
            ) {
                console.log("INFORMATION ZONE COLLISION DETECTION")
                INFOTILE.DISPLAY = true
                break
            }
            else {
                INFOTILE.DISPLAY = false
            }
        };

        // ABOUT ZONES COLLISION

        for (let i = 0; i < ABOUT_ZONES.length; i++) {
            const ABOUTS = ABOUT_ZONES[i]
            if (
                COLLISION_DETECTION({
                    RECTANGLE_1: CHARACTER,
                    RECTANGLE_2: {...ABOUTS, POSITION: {
                        x: ABOUTS.POSITION.x,
                        y: ABOUTS.POSITION.y
                    }}
                })
            ) {
                console.log("ABOUT ZONE COLLISION DETECTION")
                ABOUTTILE.DISPLAY = true
                window.location.href = "about/about.html";
                break
            }
            else {
                ABOUTTILE.DISPLAY = false
            }
        };

        // WORK ZONES COLLISION

        for (let i = 0; i < WORK_ZONES.length; i++) {
            const WORKS = WORK_ZONES[i]
            if (
                COLLISION_DETECTION({
                    RECTANGLE_1: CHARACTER,
                    RECTANGLE_2: {...WORKS, POSITION: {
                        x: WORKS.POSITION.x,
                        y: WORKS.POSITION.y
                    }}
                })
            ) {
                console.log("WORK ZONE COLLISION DETECTION")
                WORKTILE.DISPLAY = true
                window.location.href = "work/work.html";
                break
            }
            else {
                WORKTILE.DISPLAY = false
            }
        };

    };

    if (INFOTILE.DISPLAY) {
        INFOTILE.POSITION.x = CHARACTER.POSITION.x + 48
        INFOTILE.POSITION.y = CHARACTER.POSITION.y - 310
        INFOTILE.DRAW()
    };

    if (GAMEPLAY_TILE.DISPLAY) {
        GAMEPLAY_TILE.POSITION.x = CHARACTER.POSITION.x + 48
        GAMEPLAY_TILE.POSITION.y = CHARACTER.POSITION.y - 140
        GAMEPLAY_TILE.DRAW()
    };

    if (KEYS.w.pressed || KEYS.a.pressed || KEYS.s.pressed || KEYS.d.pressed) {

        CHARACTER.IDLING = false
        GAMEPLAY_TILE.DISPLAY = false

        // INFORMATION ZONES COLLISION

        for (let i = 0; i < INFORMATION_ZONES.length; i++) {
            const INFOS = INFORMATION_ZONES[i]
            if (
                COLLISION_DETECTION({
                    RECTANGLE_1: CHARACTER,
                    RECTANGLE_2: {...INFOS, POSITION: {
                        x: INFOS.POSITION.x,
                        y: INFOS.POSITION.y + 7
                    }}
                })
            ) {
                console.log("INFORMATION ZONE COLLISION DETECTION")
                INFOTILE.DISPLAY = true
                break
            }
            else {
                INFOTILE.DISPLAY = false
            }
        };

        // ABOUT ZONES COLLISION

        for (let i = 0; i < ABOUT_ZONES.length; i++) {
            const ABOUTS = ABOUT_ZONES[i]
            if (
                COLLISION_DETECTION({
                    RECTANGLE_1: CHARACTER,
                    RECTANGLE_2: {...ABOUTS, POSITION: {
                        x: ABOUTS.POSITION.x,
                        y: ABOUTS.POSITION.y + 7
                    }}
                })
            ) {
                console.log("ABOUT ZONE COLLISION DETECTION")
                ABOUTTILE.DISPLAY = true
                window.location.href = "about/about.html";
                break
            }
            else {
                ABOUTTILE.DISPLAY = false
            }
        };

        // WORK ZONES COLLISION

        for (let i = 0; i < WORK_ZONES.length; i++) {
            const WORKS = WORK_ZONES[i]
            if (
                COLLISION_DETECTION({
                    RECTANGLE_1: CHARACTER,
                    RECTANGLE_2: {...WORKS, POSITION: {
                        x: WORKS.POSITION.x,
                        y: WORKS.POSITION.y
                    }}
                })
            ) {
                console.log("WORK ZONE COLLISION DETECTION")
                WORKTILE.DISPLAY = true
                window.location.href = "work/work.html";
                break
            }
            else {
                WORKTILE.DISPLAY = false
            }
        };

        if (INFOTILE.DISPLAY) {
            INFOTILE.POSITION.x = CHARACTER.POSITION.x + 48
            INFOTILE.POSITION.y = CHARACTER.POSITION.y - 310
            INFOTILE.DRAW()
        };


    };



    if (KEYS.w.pressed && PREVIOUS_KEY === 'w') {

        CHARACTER.MOVING = true
        CHARACTER.IMAGE.src = 'assets/walk/walk_up.png'

        // BOUNDARY COLLISION

        for (let i = 0; i < BOUNDARIES.length; i++) {
            const BNDRY = BOUNDARIES[i]
            if (
                COLLISION_DETECTION({
                    RECTANGLE_1: CHARACTER,
                    RECTANGLE_2: {...BNDRY, POSITION: {
                        x: BNDRY.POSITION.x,
                        y: BNDRY.POSITION.y + 7
                    }}
                })
            ) {
                MOVING = false
                break
            }
        }

        if (MOVING) 
            {
                MOVABLES.forEach((movable) => {
                    movable.POSITION.y += 7
                })
            }
    }

    else if (KEYS.a.pressed && PREVIOUS_KEY === 'a') {

        CHARACTER.MOVING = true
        CHARACTER.IMAGE.src = 'assets/walk/walk_left_down.png'

        // BOUNDARY COLLISION

        for (let i = 0; i < BOUNDARIES.length; i++) {
            const BNDRY = BOUNDARIES[i]
            if (
                COLLISION_DETECTION({
                    RECTANGLE_1: CHARACTER,
                    RECTANGLE_2: {...BNDRY, POSITION: {
                        x: BNDRY.POSITION.x + 7,
                        y: BNDRY.POSITION.y
                    }}
                })
            ) {
                MOVING = false
                break
            }
        }

        if (MOVING)
            {
                MOVABLES.forEach((movable) => {
                    movable.POSITION.x += 7
                })
            }
    }

    else if (KEYS.s.pressed && PREVIOUS_KEY === 's') {

        CHARACTER.MOVING = true
        CHARACTER.IMAGE.src = 'assets/walk/walk_down.png'

        for (let i = 0; i < BOUNDARIES.length; i++) {
            const BNDRY = BOUNDARIES[i]
            if (
                COLLISION_DETECTION({
                    RECTANGLE_1: CHARACTER,
                    RECTANGLE_2: {...BNDRY, POSITION: {
                        x: BNDRY.POSITION.x,
                        y: BNDRY.POSITION.y -7
                    }}
                })
            ) {
                MOVING = false
                break
            }
        }

        if (MOVING) 
            {
                MOVABLES.forEach((movable) => {
                    movable.POSITION.y -= 7
                })
            }
    }

    else if (KEYS.d.pressed && PREVIOUS_KEY === 'd') {

        CHARACTER.MOVING = true
        CHARACTER.IMAGE.src = 'assets/walk/walk_right_down.png'

        for (let i = 0; i < BOUNDARIES.length; i++) {
            const BNDRY = BOUNDARIES[i]
            if (
                COLLISION_DETECTION({
                    RECTANGLE_1: CHARACTER,
                    RECTANGLE_2: {...BNDRY, POSITION: {
                        x: BNDRY.POSITION.x - 7,
                        y: BNDRY.POSITION.y
                    }}
                })
            ) {
                MOVING = false
                break
            }
        }

        if (MOVING) 
            {
                MOVABLES.forEach((movable) => {
                    movable.POSITION.x -= 7
                })
            }

    }

    else if (KEYS.ArrowUp.pressed && PREVIOUS_KEY === 'ArrowUp') {
        MOVABLES.forEach((movable) => {
            movable.POSITION.y += 7
        });
    }

    else if (KEYS.ArrowLeft.pressed && PREVIOUS_KEY === 'ArrowLeft') {
        MOVABLES.forEach((movable) => {
            movable.POSITION.y += 7
        });
    }

    else if (KEYS.ArrowDown.pressed && PREVIOUS_KEY === 'ArrowDown') {
        MOVABLES.forEach((movable) => {
            movable.POSITION.y -= 7
        })
    }

    else if (KEYS.ArrowRight.pressed && PREVIOUS_KEY === 'ArrowRight') {
        MOVABLES.forEach((movable) => {
            movable.POSITION.x -= 7
        })
    }

};

ANIMATE();

let PREVIOUS_KEY = '';

window.addEventListener('keydown', (e) => {

    switch (e.key) {
        case 'w':
            KEYS.w.pressed = true
            PREVIOUS_KEY = 'w'
            break
        case 'a':
            KEYS.a.pressed = true
            PREVIOUS_KEY = 'a'
            break
        case 's':
            KEYS.s.pressed = true
            PREVIOUS_KEY = 's'
            break
        case 'd':
            KEYS.d.pressed = true
            PREVIOUS_KEY = 'd'
            break
        case 'ArrowUp':
            KEYS.ArrowUp.pressed = true
            PREVIOUS_KEY = 'ArrowUp'
            break
        case 'ArrowLeft':
            KEYS.ArrowLeft.pressed = true
            PREVIOUS_KEY = 'ArrowLeft'
            break
        case 'ArrowDown':
            KEYS.ArrowDown.pressed = true
            PREVIOUS_KEY = 'ArrowDown'
            break
        case 'ArrowRight':
            KEYS.ArrowRight.pressed = true
            PREVIOUS_KEY = 'ArrowRight'
            break
    }

});

window.addEventListener('keyup', (e) => {

    switch (e.key) {
        case 'w':
            KEYS.w.pressed = false
            break
        case 'a':
            KEYS.a.pressed = false
            break
        case 's':
            KEYS.s.pressed = false
            break
        case 'd':
            KEYS.d.pressed = false
            break
        case 'ArrowUp':
            KEYS.ArrowUp.pressed = false
            break
        case 'ArrowLeft':
            KEYS.ArrowLeft.pressed = false
            break
        case 'ArrowDown':
            KEYS.ArrowDown.pressed = false
            break
        case 'ArrowRight':
            KEYS.ArrowRight.pressed = false
            break
    }

});