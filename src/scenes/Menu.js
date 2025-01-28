class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        // load images/title sprite
        this.load.image('rocket', './assets/rocket.png')
        this.load.image('spaceship','./assets/spaceship.png')
        this.load.image('spaceship1', './assets/spaceship1.png')
        this.load.image('starfield', './assets/starfield.png')
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })
        // load audio
        this.load.audio('sfx-select', './assets/sfx-select.wav')
        this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
        this.load.audio('sfx-shot', './assets/sfx-shot.wav')
    }

    create() {
        // animation configuration
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        })
        
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // display menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, 'Use <--> arrows to move & (F) to fire', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, '[OR]', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize * 2 + borderPadding * 2, 'Use mouse to move & left-click to fire', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#00FF00'
        menuConfig.color = '#000'
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize * 3 + borderPadding * 3, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5)
        if (!game.settings) {
          game.settings = {
            spaceshipSpeed: 1,
            gameTimer: 60000,
            highScore: 0
          }
        }
        this.add.text(10, 10, `High Score: ${game.settings.highScore}`, menuConfig)

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }

    update() {
        let spaceshipSpeed = 3
        let gameTimer = 60000
        let highScore = game.settings.highScore || 0

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000,
            highScore: highScore
          }
          
          this.sound.play('sfx-select')
          this.scene.start('playScene') 
          console.log("Play scene")  
        }

        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // easy mode
          spaceshipSpeed = 4
          gameTimer = 45000

          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000,
            highScore: highScore
          }
          
          this.sound.play('sfx-select')
          this.scene.start('playScene')   
        }

        game.settings = {
          spaceshipSpeed: spaceshipSpeed,
          gameTimer: gameTimer,
          highScore: highScore
        }


        // if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        //   // easy mode
        //   game.settings = {
        //     spaceshipSpeed: 3,
        //     gameTimer: 60000    
        //   }
        //   this.sound.play('sfx-select')
        //   this.scene.start('playScene')    
        // }
        
        // if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
        //   // hard mode
        //   game.settings = {
        //     spaceshipSpeed: 4,
        //     gameTimer: 45000    
        //   }
        //   this.sound.play('sfx-select')
        //   this.scene.start('playScene') 
        // }
      }

    
}