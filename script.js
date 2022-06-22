// game elements
const dice = document.querySelectorAll(".dice")
const front = document.querySelectorAll(".front")
const background = document.querySelector(".game")
const score_ = document.querySelector(".score")
const highScore_ = document.querySelector(".high-score-value")

const infoMessage = document.querySelector(".info-message")
const infoIcon = document.querySelector(".info-icon")
infoMessageShowing = false

infoIcon.addEventListener("click", () => {
    if (infoMessageShowing) {
        infoMessageShowing = false
        infoMessage.style.display = 'none'
    } else {
        infoMessageShowing = true
        infoMessage.style.display = 'block'
    }
})

// game stats
let score = 0
let highScore = 0
let diceRoll = 1

// dice roll options
const options = {
    1: 'url("./images/dice-1.png")', 
    2: 'url("./images/dice-2.png")', 
    3: 'url("./images/dice-3.png")', 
    4: 'url("./images/dice-4.png")', 
    5: 'url("./images/dice-5.png")', 
    6: 'url("./images/dice-6.png")'
}

// const options = Array.from(Array(6).keys()).map(i => `url("./images/dice-${i+1}.png")`)

// console.log(Array.from(Array(6).keys()).map(i => `url("./images/dice-${i+1}.png")`))

// dice game

for (let i=0; i<dice.length; i++) {

    dice[i].addEventListener("click", () => {

        replayAnimation(dice[i])
        rollDice(front[i])
        incrementScore()

        if (diceRoll == 1) {

            setTimeout( ()=>{ 
                
                flashScreen()
                replayAllAnimations()
                checkHighScore()
                resetScore()            
            
            },1000)}
    }, false)
}

// game fucntions

function replayAnimation(animation) {
    animation.style.animationName = 'none'
    requestAnimationFrame( () => {
        animation.style.animationName = ""
    })
}

function rollDice(frontFace) {
    diceRoll = Math.floor(Math.random() * Object.keys(options).length + 1)
    frontFace.style.backgroundImage = options[diceRoll]
}

function incrementScore() {
    score += diceRoll
    score_.innerHTML = score
}

// gameover functions

function flashScreen() {
    // fix to stop the screen flashing when the initial, homescreen die is click
    if (firstClick) {
        return
    }
    background.style.background = 'red'
    setTimeout( () => {
        background.style.background = 'none'
    }, 300)
}

function replayAllAnimations() {
    for (let i=0; i<Object.keys(dice).length; i++) {
        replayAnimation(dice[i])
        front[i].style.backgroundImage = options[1]
    }
}

function resetScore() {
    score = 0
    score_.innerHTML = 0
}

function checkHighScore() {
    if (score > highScore) {
        highScore = score
        highScore_.innerHTML = score
    }
}

// overlay
firstClick = true
window.addEventListener('click', () => {
    overlay.style.display = "none";
    if (firstClick) {
        replayAllAnimations()
        resetScore()
        firstClick = false
    }
})