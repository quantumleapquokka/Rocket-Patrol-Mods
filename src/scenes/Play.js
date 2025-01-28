class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize, 0x00FF00).setOrigin(0,0)

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*3, 'spaceship', 0, 30).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*7, 'spaceship', 0, 10).setOrigin(0,0)

        // add new enemy spaceship (x2)
        this.shipNew01 = new Spaceship(this, game.config.width + borderUISize*4, borderUISize*4.5, 'spaceship1', 0, 50).setOrigin(0, 0)
        this.shipNew02 = new Spaceship(this, game.config.width + borderUISize*4, borderUISize*7, 'spaceship1', 0, 50 ).setOrigin(0, 0)
        // adjust speeds
        this.shipNew01.moveSpeed = 8;
        this.shipNew02.moveSpeed = 9;

        
        // define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        // mouse movement
        this.input.on('pointermove', (pointer) => {})
        this.input.on('pointerdown', (pointer) => {
            if (pointer.button === 0 && !this.p1Rocket.isFiring) {
                this.p1Rocket.isFiring = true
                this.p1Rocket.sfxShot.play()
            }
        })


        // initialize score
        this.p1Score = 0
        

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }


        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)

        scoreConfig.fixedWidth = 0
        this.add.text(10, 10, `High Score: ${game.settings.highScore}`, scoreConfig)

        // GAME OVER Flag
        this.gameOver = false

        // Game Clock
        let timeConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.gameTimer = game.settings.gameTimer;
        this.timeText = this.add.text(game.config.width - borderUISize - borderPadding - timeConfig.fixedWidth, borderUISize + borderPadding*2, this.gameTimer / 1000, timeConfig)

        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5)
            this.gameOver = true
        }, null, this)
        

        let hit = false;
    }   

    update() {
        // update timer
        if (this.gameTimer > 1) {
            this.gameTimer -= 1000/60
            this.timeText.setText(Math.floor(this.gameTimer / 1000))
        }
        
        // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart()
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene")
        }

        this.starfield.tilePositionX -= 4
        if (!this.gameOver) {
            this.p1Rocket.update()
            this.ship01.update()               // update spaceships (x3)
            this.ship02.update()
            this.ship03.update()
            this.shipNew01.update()
            this.shipNew02.update()
        }
        

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)   
            this.addTime(3000)
            this.hit = true
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)
            this.addTime(3000)
            this.hit = true
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)
            this.addTime(3000)
            this.hit = true
        }
        if (this.checkCollision(this.p1Rocket, this.shipNew01)) {
            this.p1Rocket.reset()
            this.shipExplode(this.shipNew01)
            this.addTime(4000)
            this.hit = true
        }
        if (this.checkCollision(this.p1Rocket, this.shipNew02)) {
            this.p1Rocket.reset()
            this.shipExplode(this.shipNew02)
            this.addTime(4000)
            this.hit = true
        } 
        
        // check if rocket missed while fired
        if (this.p1Rocket.isFiring && !this.hit && this.p1Rocket.y <= borderUISize * 3 + borderPadding) {
            console.log("entered here")
            this.subTime(5000);
        }

        // if (!this.p1Rocket.isFiring) {
        //     this.rocketHit = false;
        // }
        
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship. y) {
            return true 
        } else {
            return false
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode')             // play explode animation
        boom.on('animationcomplete', () => {   // callback after anim completes
          ship.reset()                         // reset ship position
          ship.alpha = 1                       // make ship visible again
          boom.destroy()                       // remove explosion sprite
        })     
        
        // score add and text update
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score
        this.sound.play('sfx-explosion')

        if (game.settings.highScore < this.p1Score) {
            game.settings.highScore = this.p1Score
        }
    }

    addTime(time) {
        this.gameTimer += time

        this.clock.remove()
        this.clock = this.time.delayedCall(this.gameTimer, () => {
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', {
                fontFamily: 'Courier',
                fontSize: '28px',
                backgroundColor: '#F3B141',
                color: '#843605',
                align: 'center',
                padding: { top: 5, bottom: 5 },
            }).setOrigin(0.5)
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or ← for Menu', {
                fontFamily: 'Courier',
                fontSize: '28px',
                backgroundColor: '#F3B141',
                color: '#843605',
                align: 'center',
                padding: { top: 5, bottom: 5 },
            }).setOrigin(0.5)
            this.gameOver = true;
        }, null, this)
    }

    subTime(time) {
        this.gameTimer -= time

        this.clock.remove()
        this.clock = this.time.delayedCall(this.gameTimer, () => {
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', {
                fontFamily: 'Courier',
                fontSize: '28px',
                backgroundColor: '#F3B141',
                color: '#843605',
                align: 'center',
                padding: { top: 5, bottom: 5 },
            }).setOrigin(0.5)
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or ← for Menu', {
                fontFamily: 'Courier',
                fontSize: '28px',
                backgroundColor: '#F3B141',
                color: '#843605',
                align: 'center',
                padding: { top: 5, bottom: 5 },
            }).setOrigin(0.5)
            this.gameOver = true;
        }, null, this)
    }
}