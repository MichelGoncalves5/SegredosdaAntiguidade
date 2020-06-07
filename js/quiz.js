const question = document.querySelector('#question');
const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {};
let acceptinAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
    question: "Pergunta 1",
    choice1: "resposta 1",
    choice2: "resposta 2",
    answer: 1
},
{
    question: "Pergunta 2",
    choice1: "resposta a",
    choice2: "resposta b",
    answer: 1
}, 
{
    question: "Pergunta 3",
    choice1: "resposta 1",
    choice2: "resposta 2",
    answer: 1
}
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

const startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];

    getNewQuestion();
}

const getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        return window.location.assign('end.html');
    }

    questionCounter++;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];

    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion[`choice${number}`];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach( choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptinAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        
        getNewQuestion();
    });
});

startGame();