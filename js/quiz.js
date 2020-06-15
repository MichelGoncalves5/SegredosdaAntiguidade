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
    question: "Como ficaram conhecidos os responsáveis por patrocinar as obras de arte no renascimento?",
    choice1: "Padrinhos",
    choice2: "Mecenas",
    answer: 2
},
{
    question: "Nome do gênio que projetou a cúpula do Duomo de Florença, e resgatou a técnica do Ponto de Fuga nas pintuas:",
    choice1: "Leonardo da Vinci",
    choice2: "Filippo Brunelleschi",
    answer: 2
}, 
{
    question: "A Divina Comédia, de Dante Alighieri, foi tão importante que acabou consolidando o dialeto falado na região da toscana como o idioma oficial italiano.",
    choice1: "Verdadeiro",
    choice2: "Falso",
    answer: 1
},
{
    question: "Em 1513, após marchar contra  Prato, localidade de sua cidade natal Florença, e matar milhares de pessoas, Giovanni de Médici retornou do exílio e foi consagrado como papa Leão X.",
    choice1: "Verdadeiro",
    choice2: "Falso",
    answer: 1
},
{
    question: "Apesar da rivalidade nas artes, Michelangelo considerava Leonardo da Vinci um grande artista, com uma visão realmente avançada para sua época.",
    choice1: "Verdadeiro",
    choice2: "Falso",
    answer: 1
},
{
    question: "Leonardo da Vinci podia dissecar cadáveres sem infringir a lei, graças a uma permissão especial que recebeu como reconhecimento de sua genialidade como artista, inventor e cientista.",
    choice1: "Verdadeiro",
    choice2: "Falso",
    answer: 1
},
{
    question: "O David de Michelangelo, escultura mais famosa do renascimento, foi uma homenagem do artista à família Médici, que o abrigou em sua casa e patrocinou muitas de suas obras.",
    choice1: "Verdadeiro",
    choice2: "Falso",
    answer: 2
},
{
    question: "Um dos motivos que o renascimento da Inglaterra começou depois do italiano foi seu envolvimento na Guerra dos Cem Anos",
    choice1: "Verdadeiro",
    choice2: "Falso",
    answer: 1
},
{
    question: "Graças à Shakespeare, os teatros ingleses passaram a aceitar mulheres atuando nos palcos.",
    choice1: "Verdadeiro",
    choice2: "Falso",
    answer: 2
},
{
    question: "Na espanha, o período do renascimento ficou manchado por um Grande Inquisidor a quem são atribuídas mais de 2.000 execuções, principalmente de mulheres e judeus.",
    choice1: "Miguel de Cervantes",
    choice2: "Tomás de Torquemada",
    answer: 2
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
    question: "Ao ser convidado pelo Papa Julio II para pintar a Capela Cistina, Michelangelo afirmou estar sendo castigado, para que não pudesse trabalhar em suas esculturas.",
    choice1: "Verdadeiro",
    choice2: "Falso",
    answer: 1
},
{
    question: "A pintura dos 460 m2 da Capela Cistina, na verdade, foi feita pelos ajudantes de Michelangelo, que planejou vistoriou todos os detalhes.",
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
            /*if (classToApply == "correct") {
                alert("correto");
            } else {
                alert("falso");
            }*/           
        }, 500); 
       
    });
});


incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

game.classList.remove("hidden");
    loader.classList.add("hidden");
    startGame();

