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
    question: "Qual nome do Papa que lançou a Primeira Cruzada?",
    choice1: "Urbano II",
    choice2: "Gregório III",
    answer: 1
},
{
    question: "A vontade de tomar a Terra Santa era tamanha que houve, inclusive, uma cruzada composta por um exército de crianças.",
    choice1: "Verdadeiro",
    choice2: "Falso",
    answer: 1
}, 
{
    question: "Uma das estratégias da igreja foi formar um exército inteiramente composto por mulheres.",
    choice1: "Verdadeiro",
    choice2: "Falso",
    answer: 2
},
{
    question: "Nome da última fortaleza cristã a cair na Terra Santa, marcando o fim das cruzadas?",
    choice1: "Acre",
    choice2: "Tiro",
    answer: 1
},
{
    question: "Nome do sultão árabe que liderou a retomada de Jerusalém do controle cristão, em 1187.",
    choice1: "Saladino",
    choice2: "Mohamed",
    answer: 1
},
{
    question: "Nome do cruzado que fundou a Ordem dos Templários, após o fim de Primeira Cruzada,e foi seu primeiro Grão-Mestre.",
    choice1: "Godofredo de Bulhão",
    choice2: "Hugo de Payens",
    answer: 2
},
{
    question: "Após participar de duas cruzadas com destaque, o Rei Luiz IX foi santificado e passou a ser conhecido como São Luiz.",
    choice1: "Verdadeiro",
    choice2: "Falso",
    answer: 1
},
{
    question: "Relatos narram que as cruzadas levaram ao mundo árabe os hábitos mais civilizados e higiênicos dos europeus.",
    choice1: "Verdadeiro",
    choice2: "Falso",
    answer: 2
},
{
    question: "A quarta cruzada foi um fiasco, pois nem chegou à Terra Santa. O cruzados se detiveram em sua passagem por Constantinopla e a saquearam, mesmo esta sendo governada por cristãos.",
    choice1: "Verdadeiro",
    choice2: "Falso",
    answer: 1
},
{
    question: "Nome do nobre que tomou Antioquia, na primeira cruzada, e a tomou para si, recusando-se a cumprir a promessa de submeter-se à suserania de Aleixo I de Constantinopla.",
    choice1: "Boemundo I",
    choice2: "Godofredo de Bulhão",
    answer: 1
},
{
    question: "Nome do primeiro rei cristão de Jerusalém, após a tomada da cidade na Primeira Cruzada",
    choice1: "Balduíno de Bolonha",
    choice2: "Hugo de Payens",
    answer: 2
},
{
    question: "A segunda cruzada teve seu sucesso graças ao rei Luis VII, da França, o São Luis, que teve particiação decisiva em várias batalhas.",
    choice1: "Verdadeiro",
    choice2: "Falso",
    answer: 2
},
{
    question: "Nome do Imperador Alemão que foi um dos organizadores da Terceira Cruzada.",
    choice1: "Conrado III",
    choice2: "Frederico Barba Roxa",
    answer: 2
},
{
    question: "Em qual cruzada os exércitos cristãos foram derrotados pela peste e pelo naufrágio devido à tempestade, antes mesmo de entrar em combate?",
    choice1: "Oitava",
    choice2: "Quinta",
    answer: 1
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
        return window.location.assign('end-cruzadas.html');
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

