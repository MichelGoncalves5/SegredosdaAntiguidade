const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
finalScore.innerText = mostRecentScore;



username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
    console.log("clicked the save btn");
    e.preventDefault();
}


document.getElementById('btn-hi').addEventListener('click',saveName);

function saveName(input){
var input = document.getElementById('userInput').value;
hi.textContent = input;
};