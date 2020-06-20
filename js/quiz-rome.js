const question = document.querySelector('#question');
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");
let currentQuestion = {};
let acceptinAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];


let questions = [
    {
    question: "Who was the father of Romulus and Remus?",
    choice1: "Marte",
    choice2: "A Loba Laica",
    answer: 1
},
{
    question: "Which was the first Roman road – and where did it run?",
    choice1: "Via Appia",
    choice2: "Nenhuma",
    answer: 2
}, 
{
    question: "Which enemy city did the Romans plough with salt?",
    choice1: "Cartago",
    choice2: "Falso",
    answer: 1
},
{
    question: "How many times was Rome sacked in the times of the empire?",
    choice1: "Six",
    choice2: "Trẽs ou Quatro",
    answer: 2
},
{
    question: "AWhy was Julius called ‘Caesar’?",
    choice1: "Cesareana",
    choice2: "Cabelos dos ancestrais",
    answer: 2
},
{
    question: "How many heirs did Augustus lose before his death on 19 August AD 14?",
    choice1: "5",
    choice2: "2",
    answer: 1
},
{
    question: "4) What leader became the dictator of Rome and put an end to the Roman Republic?",
    choice1: "augustus",
    choice2: "Cesar",
    answer: 2
},
{
    question: "Around what year did the Western Roman Empire fall?",
    choice1: "476",
    choice2: "685",
    answer: 1
},
{
    question: "Quem foi o primeiro imperador romano?",
    choice1: "Cesar",
    choice2: "Augusto",
    answer: 2
},
{
    question: "Os romanos lavavam os dentes com urina",
    choice1: "Verdadeiro",
    choice2: "Falso",
    answer: 1
},
{
    question: "A conquista de uma importante cidade pelos Otomanos, em 1453, promoveu o fluxo de livros e sábios para a Italia, acelerando o renascimento.",
    choice1: "Jerusalém",
    choice2: "Constantinopla",
    answer: 2
},
{
    question: "O Malleus Maleficarum, livro que instruía como identificar e torturar bruxas, foi aprovado por uma bula do Papa Inocêncio VIII.",
    choice1: "Verdadeiro",
    choice2: "Falso",
    answer: 1
},
{
    question: "Ao ser intimado pelo Papa Julio II a pintar a Capela Cistina, Michelangelo afirmou estar sendo castigado para que não pudesse trabalhar em suas esculturas.",
    choice1: "Verdadeiro",
    choice2: "Falso",
    answer: 1
},
{
    question: "A pintura dos 460 m2 da Capela Cistina, na verdade, foi feita pelos ajudantes de Michelangelo, que planejou e vistoriou todos os detalhes.",
    choice1: "Verdadeiro",
    choice2: "Falso",
    answer: 2
}
];


const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

const startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];

    getNewQuestion();
    
    
};

const getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign('end.html');
    }

    questionCounter++;
    progressText.innerText = `Questão ${questionCounter}/${MAX_QUESTIONS}`;

    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

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
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
          }
        
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout ( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();                      
        }, 500); 
       
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

game.classList.remove("d-none");
    loader.classList.add("d-none");
    startGame();

