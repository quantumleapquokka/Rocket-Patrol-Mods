/**
 * Name: Samantha Siew
 * Title: Rocket Patrol Pro 
 * Time:
 * Mods:
 *  1-Point Tier
 *      Track a high score that persists across scenes and display it in the UI 
 *      Create a new scrolling tile sprite for the background
 * 
 * 3-Point Tier
 *      Display the time remaining on the screen
 * 
 * 5-Point Tier
 *      Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points
 *      Implement a new timing/scoring mechanism that adds time to the clock for successful hits and subtracts time for misses
 *      Implement mouse control for player movement and left mouse click to fire
 */
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}
let game = new Phaser.Game(config)

// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT


// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3