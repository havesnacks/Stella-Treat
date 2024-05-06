class MainScene extends Phaser.Scene {
  constructor() {
      super({ key: 'MainScene' });
  }

  preload() {
      // Load assets like sprites and sounds here
      this.load.image('stella', 'assets/Stella.png');
      this.load.image('treat', 'assets/treat.png');
  }

  create() {
      // Initialize scene, positions of sprites, etc.
      this.player = this.physics.add.sprite(100, 100, 'stella');
      this.coin = this.physics.add.sprite(300, 300, 'treat');

      // Initialize score and display it
      this.score = 0;
      let style = { font: '20px Arial', fill: '#000' };
      this.scoreText = this.add.text(20, 20, 'Score: ' + this.score, style);

      // Input handling
      this.arrow = this.input.keyboard.createCursorKeys();
  }

  update() {
      // Handle game logic like movements here
      // Horizontal movements
      if (this.arrow.right.isDown) {
          // If the right arrow is pressed, move to the right
          this.player.x += 3;
      } else if (this.arrow.left.isDown) {
          // If the left arrow is pressed, move to the left
          this.player.x -= 3;
      }

      // Vertical movements
      if (this.arrow.down.isDown) {
          this.player.y += 3;
      } else if (this.arrow.up.isDown) {
          this.player.y -= 3;
      }

      // Collision handling
      if (this.physics.overlap(this.player, this.coin)) {
          // Call the hit() method
          this.hit();
      }
  }

  hit() {
      // Change the position x and y of the coin randomly
      this.coin.x = Phaser.Math.Between(100, 600);
      this.coin.y = Phaser.Math.Between(100, 300);

      // Increment the score by 100
      this.score += 100;

      // Display the updated score on the screen
      this.scoreText.setText('Score: ' + this.score);

      // Create a new tween 
      this.tweens.add({
          targets: this.player, // on the player 
          duration: 200, // for 200ms 
          scaleX: 1.2, // that scale vertically by 20% 
          scaleY: 1.2, // and scale horizontally by 20% 
          yoyo: true, // at the end, go back to original scale 
      });
  }
}

// Create the Phaser game instance
let config = {
  type: Phaser.AUTO,
  width: 700,
  height: 400,
  backgroundColor: '#a9d2d5',
  physics: {
      default: 'arcade',
      arcade: {
          // Configure arcade physics here if needed
      }
  },
  parent: 'game', // This should match the ID of the HTML element where the game should be rendered
  scene: [MainScene] // MainScene added to the game
};

let game = new Phaser.Game(config);
