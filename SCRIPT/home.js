const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Shakespeare", "Dickens", "Hemingway", "Austen"],
        correctAnswer: 0
    },
    // Add more questions as needed
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const currentQuestionElement = document.getElementById('current-question');
const totalQuestionsElement = document.getElementById('total-questions');
const nextBtn = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = ''; // Clear previous options

    currentQuestion.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.textContent = option;
        btn.dataset.index = index;
        btn.onclick = () => handleAnswerSelection(index);
        optionsContainer.appendChild(btn);
    });

    currentQuestionElement.textContent = currentQuestionIndex + 1;
    totalQuestionsElement.textContent = questions.length;

    nextBtn.disabled = true;
}

function handleAnswerSelection(selectedIndex) {
    const correctIndex = questions[currentQuestionIndex].correctAnswer;

    if (selectedIndex === correctIndex) {
        score++;
    }

    scoreElement.textContent = score;

    // Disable all options after selecting an answer
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach(button => button.disabled = true);

    nextBtn.disabled = false;
}

function goToNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        // End of quiz
        alert(`Quiz finished! Your final score is ${score} out of ${questions.length}`);
        // Reset for next quiz if needed:
        currentQuestionIndex = 0;
        score = 0;
        scoreElement.textContent = score;
        loadQuestion();
    }
}

// Initialize the quiz
loadQuestion();

// Add event listener to the next button
nextBtn.addEventListener('click', goToNextQuestion);
    