const questions = [
    {
        question: 'What is the capital of India?',
        answers: [
            { text: 'Odisha', correct: false },
            { text: 'Delhi', correct: true },
            { text: 'Goa', correct: false },
            { text: 'Nepal', correct: false }
        ]
    },
    {
        question: 'Which planet is known as the Red Planet?',
        answers: [
            { text: 'Earth', correct: false },
            { text: 'Mars', correct: true },
            { text: 'Venus', correct: false },
            { text: 'Jupiter', correct: false }
        ]
    },
    {
        question: 'What is the largest mammal?',
        answers: [
            { text: 'Elephant', correct: false },
            { text: 'Blue Whale', correct: true },
            { text: 'Giraffe', correct: false },
            { text: 'Hippopotamus', correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let userScore = 0;

const questionContainer = document.getElementById('question-container');
const answerButtonsContainer = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const resultContainer = document.getElementById('result-container');

startQuiz();

function startQuiz() {
    currentQuestionIndex = 0;
    userScore = 0;
    nextButton.disabled = true;
    resultContainer.innerHTML = '';
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionContainer.innerText = question.question;
    clearAnswerButtons();
    
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtonsContainer.appendChild(button);
    });
}

function clearAnswerButtons() {
    while (answerButtonsContainer.firstChild) {
        answerButtonsContainer.removeChild(answerButtonsContainer.firstChild);
    }
}

function selectAnswer(answer) {
    const correct = answer.correct;
    if (correct) {
        userScore++;
    }

    Array.from(answerButtonsContainer.children).forEach(button => {
        button.disabled = true;
    });

    nextButton.disabled = false;

    showResult(correct);
}

function showResult(correct) {
    const resultText = correct ? 'Correct!' : 'Wrong!';
    resultContainer.innerHTML = `<p>${resultText}</p>`;
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        nextButton.disabled = true;
    } else {
        showFinalResult();
    }
}

function showFinalResult() {
    questionContainer.innerText = `You completed the quiz! Your score: ${userScore} out of ${questions.length}`;
    clearAnswerButtons();
    nextButton.style.display = 'none';
}
