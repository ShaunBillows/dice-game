const dice = document.querySelectorAll(".dice")
const front = document.querySelectorAll(".front")
const background = document.querySelector(".game")
let score = document.querySelector(".score")
// let score = 0
let highScore = document.querySelector(".high-score-value")
// let highScore = 0


const options = {1: 'url("./images/dice-1.png")', 2: 'url("./images/dice-2.png")', 3: 'url("./images/dice-3.png")', 4: 'url("./images/dice-4.png")', 5: 'url("./images/dice-5.png")', 6: 'url("./images/dice-6.png")'}


for (let i=0; i<dice.length; i++) {

    dice[i].addEventListener("click", () => {
        replayAnimation(dice[i])
        rollDice(front[i])
    }, false)
}

function replayAnimation(animation) {
    animation.style.animationName = 'none'
    requestAnimationFrame( () => {
        animation.style.animationName = ""
    })
}

function rollDice(frontFace) {
    diceRoll = Math.floor(Math.random() * Object.keys(options).length + 1)
        // randomise the front cube face
    frontFace.style.backgroundImage = options[diceRoll]
        // increment score
    score.innerHTML = Number(score.innerHTML) + diceRoll
        // check for 1
    if (diceRoll == 1) {
        setTimeout( () => {
            gameOver()
        }, 1000)
    }
}

// function checkScore() {
//     count += 1
//     if (count >=  5) {
//         // gameOver()
//     }
//     if (score.innerHTML >= 20) {
//         // gameOver()
//     }
// }

function gameOver() {
    background.style.background = 'red'
    setTimeout( () => {
        background.style.background = 'none'
    }, 300)
    for (let i=0; i<Object.keys(dice).length; i++) {
        replayAnimation(dice[i])
        front[i].style.backgroundImage = options[1]
    }
    checkHighScore()
    score.innerHTML = 0
}

const checkHighScore = () => {
    // console.log(score.innerHTML)
    // console.log(highScore.innerHTML)
    // highScore.innerHTML = score.innerHTML
    if (score.innerHTML > highScore.innerHTML) {
        highScore.innerHTML = score.innerHTML
    }
}

// cube[0].addEventListener("click", replayAnimation, false)

// function replayAnimation(event) {
//     // set name to 'none' so animation is no longer associated with it's keyframes
//     cube.style.animationName = 'none'

//     const options = ['url("./images/dice-1.png")', 'url("./images/dice-6.png")', 'url("./images/dice-2.png")', 'url("./images/dice-4.png")', 'url("./images/dice-3.png")', 'url("./images/dice-5.png")']

//     // reset the animation properties to replay the animation
//     requestAnimationFrame( () => {
//         cube.style.animationName = ""
//         // randomise the cube faces
//         front.style.backgroundImage = options[Math.floor(Math.random()*options.length)]
//     })
// }

// window.addEventListener('click', () => {
//     overlay.style.display = "none";
// })