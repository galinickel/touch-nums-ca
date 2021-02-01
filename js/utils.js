
function renderGame(gRandNums) {
    var gRandNumsCopy = gRandNums.slice()
    var strHtml = `<h1>Touch the numbers- can you do it?</h1><div class="game"><div class="stopwatch"></div><div class="table-container"><table class="table${ Math.sqrt(gRandNums.length)}">`
    for (var i = 0; i < Math.sqrt(gRandNums.length); i++) {
        strHtml += '<tr>'
        for (var j = 0; j < Math.sqrt(gRandNums.length); j++) {
            var randNum = gRandNumsCopy.pop()
            strHtml += `<td data-inside="${randNum}" onclick="checkNum(this,${randNum})">${randNum}</td>`
        }
        strHtml += '</tr>'
    }
    strHtml += '</table></div><br><div="button-container"> <button class="reset-btn" onclick="init()">Reset Game</button></div=></div>'
    var elContainer = document.querySelector('body')
    elContainer.innerHTML = strHtml
}


function submitHandler() {
    var difficultyLevel;
    gNums = []
    if (document.querySelector('.easy').checked === true) {
        difficultyLevel = 'easy'
        gDifficultyLevel = 16
    }
    if (document.querySelector('.medium').checked === true) {

        difficultyLevel = 'medium'
        gDifficultyLevel = 25
    }
    if (document.querySelector('.difficult').checked === true) {

        difficultyLevel = 'difficult'
        gDifficultyLevel = 36
    }
    startGame(difficultyLevel)
}

///FUNCTIONS USED IN GENERATING GRANDNUMS///

function getNums(nums) {
    var num;
    if (nums === 'easy') num = 16;
    else if (nums === 'medium') num = 25;
    else if (nums === 'difficult') num = 36;
    for (var i = 1; i < num + 1; i++) {
        gNums.push(i)
    }
    return gNums
}

function getRandNums() {
    var nums = getNums()
    var i = nums.length;
    var j = 0;
    while (i--) {
        j = Math.floor(Math.random() * (i + 1));
        gRandNums.push(nums[j]);
        nums.splice(j, 1);
    }
    return gRandNums
}