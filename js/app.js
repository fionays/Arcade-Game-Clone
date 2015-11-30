
/*Superclass*/
var Entity = function() {
    this.sprite = '';
    this.x = 0;
    this.y = 0;
};

// Draw the entity on the screen, required method for game
Entity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/*Enemies our player must avoid, subclass of Entity*/
var Enemy = function() {
    Entity.call(this);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Initial position
    this.x = -101;
    this.y = Math.floor(Math.random() * 3 + 1) * 83 - 28; 

    // Speed of this bug
    this.speed = Math.floor(Math.random() * 301 + 100);
};

inherit(Enemy);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = (this.x + dt * this.speed) % 1010;
};

/*Now write your own player class, subclass of Entity*/
var Player = function() {
    Entity.call(this);

    this.sprite = 'images/char-cat-girl.png';

    // initial position
    this.x = 2 * 101;
    this.y = 5 * 83 - 28;
};

inherit(Player);

Player.prototype.update = function() {};

Player.prototype.handleInput = function(input) {
    if (input === 'left' && this.x !== 0) {
        this.x -= 101;
    }else if (input === 'up' && this.y > (83 - 28)) {
        this.y -=  83;
    }else if (input === 'up' && this.y <= (83 - 28)) {
        this.resetPlayer();
    }else if (input === 'right' && this.x !== (4 * 101)) {
        this.x += 101;
    }else if (input === 'down' && this.y !== (5 * 83 - 28)){
        this.y += 83;
    } 
};

Player.prototype.resetPlayer = function() {
    this.x = 2 * 101;
    this.y = 5 * 83 - 28;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function inherit (subclass) {
    subclass.prototype = Object.create(Entity.prototype);
    subclass.prototype.constructor = subclass;
}
