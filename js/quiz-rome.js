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
    question: "Segundo a lenda, de quem Rômulo e Remo eram filhos?",
    choice1: "Do deus Marte",
    choice2: "Da Loba Laica",
    answer: 1
},
{
    question: "Qual o nome da primeira estrada romana?",
    choice1: "Via Appia",
    choice2: "Via Sacra",
    answer: 1
}, 
{
    question: "Após finalmente subjugarem Cartago, os romanos desolaram suas terras com sal grosso.",
    choice1: "Verdadeiro",
    choice2: "Falso",
    answer: 2
},
{
    question: "Qual imperador ficou famoso por construir uma grande muralha na bretanha que perdura até hoje?",
    choice1: "Adriano",
    choice2: "Julio César",
    answer: 1
},
{
    question: "Qual a origem do nome 'César', do famoso ditador Julio César?",
    choice1: "Ele nasceu de cesariana",
    choice2: "Significa Cabelos dos Ancestrais",
    answer: 2
},
{
    question: "Quantos herdeiros perdeu Augusto, até o dia de sua própria morte?",
    choice1: "5",
    choice2: "2",
    answer: 1
},
{
    question: "Qual líder tornou-se ditador e, com isso, acabou com a República Romana, criando o Império Romano?",
    choice1: "Augusto",
    choice2: "César",
    answer: 1
},
{
    question: "Qual ano da queda do Império Romano Ocidental?",
    choice1: "476",
    choice2: "685",
    answer: 1
},
{
    question: "Tibério, segundo imperador de Roma, tornou-se tão paranóico que trocou a capital por uma ilha. Qual seu nome?",
    choice1: "Sardenha",
    choice2: "Capri",
    answer: 2
},
{
    question: "Os romanos escovavam seus dentes com urina",
    choice1: "Verdadeiro",
    choice2: "Falso",
    answer: 1
},
{
    question: "Cláudio, competente imperador, tinha uma disfunção que o tornava alvo de chacotas no senado romano. Qual era ela?",
    choice1: "Impotência Sexual",
    choice2: "Gagueira",
    answer: 2
},
{
    question: "Nero mandou envenenar sua mãe Agripina, mas ela tomou antídoto a tempo. Depois pagou para afundarem o barco em que ela viajava, mas ela nadou até a costa. Finalmente, ele contratou um assassino para esfaqueá-la.",
    choice1: "Verdadeiro",
    choice2: "Falso",
    answer: 1
},
{
    question: "Qual nome do imperador que lutava nas arenas romanas, alegando ser a encarnação do próprio Hercules?",
    choice1: "Cômodus",
    choice2: "Calígula",
    answer: 1
},
{
    question: "Nome do respeitado imperador romano que ficou conhecido por ser um filósofo estóico.",
    choice1: "Caracalla",
    choice2: "Marco Aurélo",
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
        return window.location.assign('end-rome.html');
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

