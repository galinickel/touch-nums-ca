'use strict'

/*
TODO: make win modal 
TODO: make restart button only appear when winning
TODO: give all buttons consistent design
*/
var gNums = [];
var gRandNums = [];
var gPlayerCount = 0;
var gDifficultyLevel = 0;
var gStopwatchStart;
var gStopwatchInterval;
var gIsVictory;
var gHighScore = Infinity

function init() {
    gPlayerCount = 0
    gIsVictory = false
    clearInterval(gStopwatchInterval);
    gStopwatchInterval = null;
    gNums = []
    gRandNums = []
    var elContainer = document.querySelector('body')
    var strHtml = `<h1>Touch the numbers- can you do it?</h1><div class="game"><div class="form-container"><form><input type="radio"  class="easy" name="difficulty-level" value=""><label for="easy">Easy</label><br><input type="radio" name="difficulty-level" class="medium"><label for="medium">Medium</label><br><input type="radio" class="difficult" name="difficulty-level"><label for="difficult">Difficult</label></form></div><br><div class="button-container"><button onclick="submitHandler()">Let's GOOO</button></div></div>`
    elContainer.innerHTML = strHtml

}

function victory(time) {
    if (gHighScore > time) gHighScore = time
    console.log(time);
    console.log(gHighScore);
    localStorage.setItem("highscore", time);
    var elContainer = document.querySelector('body')
    var strHtml = `<h1 class="victory">You've done it! And... it only took ${time} seconds. </h1><br><h3>Your high score is ${gHighScore}!</h3><br><h1 class="play-again">Play again?</h1><div class="game"><button onclick="init()">Restart</button></div></div>`
    elContainer.innerHTML = strHtml
}

function startGame(difficultyLevel) {
    var numArr = getNums(difficultyLevel)
    gRandNums = getRandNums(numArr)
    renderGame(gRandNums)
}

function checkNum(numEl, num) {
    if (gPlayerCount >= gRandNums.length) {
        numEl.classList.add("correct")
        gIsVictory = true
    }
    if (num === 1) startStopwatch()
    if (num === gPlayerCount + 1) {
        gPlayerCount++
        console.log(gPlayerCount);
        numEl.classList.add("correct")
    } else {
        numEl.classList.toggle("wrong")
        setTimeout(() => {
            numEl.classList.toggle("wrong");
        }, 200)
    }

}

function startStopwatch() {
    gStopwatchStart = new Date();
    runStopwatch()
    gStopwatchInterval = setInterval(runStopwatch, 30);
}

function runStopwatch() {
    if (gPlayerCount === gRandNums.length) {
        var finalTime = (new Date() - gStopwatchStart) / 1000
        localStorage.setItem("highscore", finalTime);
        victory(finalTime);
        clearInterval(gStopwatchInterval);
        
    }
    var currTime = (new Date() - gStopwatchStart) / 1000
    var stopwatchEl = document.querySelector(".stopwatch");
    stopwatchEl.innerHTML = currTime
}