

const question = document.querySelector('#question');
const answersBox = document.querySelector('#answers-box');
const quizzContainer = document.querySelector('#quiz-container');
const scoreContainer = document.querySelector('#score-container');

const letters = ['a', 'b', 'c', 'd'];
let points = 0;
let actualQuestion = 0;

const questions = [
    {
        "question": "PHP foi desenvolvido para qual fim?",
        "answers": [
            {
                "answer": "back-end",
                "correct": true
            },
            {
                "answer": "front-end",
                "correct": false
            },
            {
                "answer": "Sistema operacional",
                "correct": false
            },
            {
                "answer": "Banco de dados",
                "correct": false
            },
        ]
    },
    {
        "question": "Uma forma de declarar variavel em JavaScript:",
        "answers": [
            {
                "answer": "$var",
                "correct": false
            },
            {
                "answer": "var",
                "correct": true
            },
            {
                "answer": "@var",
                "correct": false
            },
            {
                "answer": "#let",
                "correct": false
            },
        ]
    },
    {
        "question": "Qual o selector de id no CSS?",
        "answers": [
            {
                "answer": "#",
                "correct": true
            },
            {
                "answer": ".",
                "correct": false
            },
            {
                "answer": "@",
                "correct": false
            },
            {
                "answer": "#/",
                "correct": false
            },
        ]
    },
    {
        "question": "O selector <H> é utilizado para:",
        "answers": [
            {
                "answer": "Adicional um Titulo",
                "correct": true
            },
            {
                "answer": "Adicional um link",
                "correct": false
            },
            {
                "answer": "Adicional um alert",
                "correct": false
            },
            {
                "answer": "Adicional um Paragrafo",
                "correct": false
            },
        ]
    },
];



function init() {
    createQuestion(0);
}

function createQuestion(i) {
    // limpa a questão anterior
    const oldButtons = answersBox.querySelectorAll('button');
    oldButtons.forEach( btn =>{
btn.remove();
    });

    // altera o texto da pergunta
//     fetch('http://localhost:3000/posts')
// .then((response)=>response.json())
// .then((questions)=>{ 
    const questionText = question.querySelector('#question-text');
    const questionNumber = question.querySelector('#question-number');
    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    // insere as alternativas
    questions[i].answers.forEach((answer, i) =>{
const answerTemplate = document.querySelector('.answer-template').cloneNode(true);

const letterBtn = answerTemplate.querySelector('.btn-letter');
const answerText = answerTemplate.querySelector('.question-answer');

letterBtn.textContent = letters[i];
answerText.textContent = answer['answer'];

answerTemplate.setAttribute('correct-answer', answer['correct']);
// console.log(answerTemplate);

// remove as classes 'hide' e o 'template class'
answerTemplate.classList.remove('hide');
answerTemplate.classList.remove('answer-template');

// inserir a alternativa na tela
answersBox.appendChild(answerTemplate);

answerTemplate.addEventListener('click', function () {
    // console.log(this);
    ckeckAnswer(this);
})
    });    
// });

// incrementa o numero da questão
actualQuestion++;

}

// verificando a resposta do usuario
function ckeckAnswer(btn) {
    // console.log(btn);
    const buttons = answersBox.querySelectorAll('button');

    // verifica se a resposta está correta e adiciona classes nos botões
    buttons.forEach(function(button){
if (button.getAttribute('correct-answer') === 'true') {
    button.classList.add('correct-answer');

    // checa se o usuario acertou a pergunta
    if (btn === button) {
        //incrementa os pontos
        points++; 
    }
} else {
    button.classList.add('wrong-answer'); 
}
    });
    // console.log(points);

    // exibir proxima pergunta
    nextQuestion();
}

// exibe a proxima pergunta da prova
function nextQuestion() {
    
    // timer para os usuarios ver as respostas
    setTimeout( function(){
 // verifica se ainda existe perguntas
 if (actualQuestion >= questions.length) {
     showSuccessMessage();   
     return;
}

createQuestion(actualQuestion);
    }, 1500);

   
}

function showSuccessMessage(){
    esconderPerguntas();

    // calcula o score
    const score = ((points / questions.length) * 100).toFixed(2);

    const displayScore = document.querySelector('#display-score span');

    displayScore.textContent = score.toString();

    // alterar o numero de perguntas corretas
    const correctAnswers = document.querySelector('#correct-answers');
    correctAnswers.textContent = points;

    // alterar o total de perguntas
    const totalQuestions = document.querySelector('#questions-qty');
    totalQuestions.textContent = questions.length;
}

function esconderPerguntas(){
    quizzContainer.classList.toggle('hide');//tira se tiver e mete se não tiver
    scoreContainer.classList.toggle('hide');
}

// reeniciar a prova
const restartBtn = document.querySelector('#restart');

restartBtn.addEventListener('click', () =>{
actualQuestion = 0;
points = 0;
esconderPerguntas();
init();
});

init();