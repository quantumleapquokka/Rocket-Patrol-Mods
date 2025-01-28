// Rocket Prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        // add objects to existing scene
        scene.add.existing(this)
        this.isFiring = false
        this.moveSpeed = 2

        this.sfxShot = scene.sound.add('sfx-shot')
    }

    update() {
        // left/right movement
        if(!this.isFiring) {
            this.x = this.scene.input.x
            
            // mouse input : keep rocket in screen bounds
            if (this.x < borderUISize + this.width) {
                this.x = borderUISize + this.width
            } else if (this.x > game.config.width - borderUISize - this.width) {
                this.x = game.config.width - borderUISize - this.width
            }


            // arrow keys
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed
            } else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed
            }
        } 
        
        // fire button (mouse left click) 
        if (this.scene.input.activePointer.leftButtonDown() && !this.isFiring) {
            this.isFiring = truethis.sfxShot.play()
        }

        // fire button (keyboard version)
        if(Phaser.Input.Keyboard.JustDown(keyFIRE)) {
            this.isFiring = true 
            this.sfxShot.play()
        }

        // if fired. move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed
        }

        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false
            this.y = game.config.height - borderUISize - borderPadding
        }
    }

    reset() {
        this.isFiring = false
        this.y = game.config.height - borderUISize - borderPadding
    }
}

