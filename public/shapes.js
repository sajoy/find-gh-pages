const shapes = function ( thing ) {
    thing.setup = function () {
        thing.createCanvas(300, 400);
    }

    thing.draw = function () {
        thing.background('pink');
    }
}

const fallingShapes = new p5(shapes, 'shapes');