// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Initial position
    this.x = -101;
    this.y = Math.floor(Math.random() * 3 + 1) * 83 - 28; 

    // Speed of this bug
    this.speed = Math.floor(Math.random() * 301 + 100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = (this.x + dt * this.speed) % 1010;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function() {
    /* These properties corresponde only to Player's scope*/
    this.left = 0;
    this.right = 0;
    this.up = 0;
    this.down = 0

    this.sprite = 'images/char-cat-girl.png';
    // initial position
    this.initX = 2 * 101;
    this.initY = 5 * 83 - 28;
};

Player.prototype.update = function() {
    this.x = this.initX + (this.left + this.right) * 101;
    this.y = this.initY + (this.up + this.down) * 83; 
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(input) {
    if (input === 'left' && this.x !== 0) {
        this.left--;
    }else if (input === 'up' && this.y > (83 - 28)) {
        this.up--;
    }else if (input === 'up' && this.y <= (83 - 28)) {
        this.resetPlayer();
    }else if (input === 'right' && this.x !== (4 * 101)) {
        this.right++;
    }else if (input === 'down' && this.y !== this.initY){
        this.down++;
    }
};

Player.prototype.resetPlayer = function() {
    this.left = 0;
    this.right = 0;
    this.up = 0;
    this.down = 0
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
