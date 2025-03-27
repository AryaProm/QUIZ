const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: 2,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Shakespeare", "Dickens", "Hemingway", "Austen"],
    correctAnswer: 0,
  },
];

const quiz_container = document.getElementById("quiz-container");
const question_text = document.getElementById("question-text");
const options_container = document.getElementById("options-container");
const next_Button = document.getElementById("next-btn");
const prev_Button = document.getElementById("prev-btn");
const next_Button_Img = document.getElementById("next-btn-img");
const current_question = document.getElementById("current-question");
const total_question = document.getElementById("total-questions");

let currentQuestionIndex = 0;
let userAnswers = new Array(questions.length).fill(null); // Stores user answers
total_question.innerText = questions.length
function render_question() {

  current_question.innerText = currentQuestionIndex + 1; // Update current question number

  if (currentQuestionIndex < questions.length && currentQuestionIndex >= 0) {
    options_container.innerHTML = ""; // Clear previous options
    let question = questions[currentQuestionIndex]; // Get the current question
    question_text.innerText = question.question; // Display question text

    // Loop through options and create radio buttons
    question.options.forEach((option, index) => {
      let optionWrapper = document.createElement("div");
      optionWrapper.classList.add("option-container");

      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "quiz-option";
      radio.value = index;
      radio.id = `option${index}`;
      radio.classList.add("quiz-option");

      let label = document.createElement("label");
      label.htmlFor = `option${index}`;
      label.textContent = option;

      if (userAnswers[currentQuestionIndex] === index) {
        radio.checked = true;
      }

      radio.addEventListener("change", () => {
        userAnswers[currentQuestionIndex] = index;
      });

      optionWrapper.appendChild(radio);
      optionWrapper.appendChild(label);
      options_container.appendChild(optionWrapper);
    });

    // Show/hide "Previous" button
    prev_Button.style.display =
      currentQuestionIndex === 0 ? "none" : "inline-block";

    // Change "Next" button to "Finish" on the last question
    if (currentQuestionIndex === questions.length - 1) {
      next_Button_Img.src = "../IMAGES/Finish.png"; // Change to finish icon
      next_Button_Img.alt = "Finish";
    } else {
      next_Button_Img.src = "../IMAGES/Arrow_Front.png"; // Default arrow
      next_Button_Img.alt = "Next";
    }
  }
}

// Next button logic
next_Button.addEventListener("click", function () {
  // Check if the user has selected an answer
  if (userAnswers[currentQuestionIndex] === null) {
    alert("Please select an option before proceeding!");
    return;
  }

  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    render_question();
  } else {
    submit();
  }
});

// Previous button logic
prev_Button.addEventListener("click", function () {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    render_question();
  }
});

// Function to calculate score and display results
function submit() {
  let score = 0;

  // Calculate the score
  questions.forEach((question, index) => {
    if (userAnswers[index] === question.correctAnswer) {
      score++;
    }
  });

  // Determine feedback based on score percentage
  let percentage = (score / questions.length) * 100;
  let message = "";

  if (percentage === 100) {
    message = "👑 King! Perfect Score!";
  } else if (percentage >= 70) {
    message = "🏆 Winner! Great job!";
  } else if (percentage >= 50) {
    message = "👍 Good! Keep it up!";
  } else if (percentage >= 30) {
    message = "🙌 Nice try! You can do better!";
  } else {
    message = "😞 Loser! Better luck next time!";
  }

  // Clear quiz container and display score + message
  quiz_container.innerHTML = `
    <h2>Quiz Completed!</h2>
    <p>Your Score: <strong>${score} / ${questions.length}</strong></p>
    <p>${message}</p>
    <button id="restart-btn">Restart Quiz</button>
  `;

  // Restart quiz button functionality
  document.getElementById("restart-btn").addEventListener("click", function () {
    window.location.href = "index.html"; // Redirect to index.html
  });
}

render_question(); // Initial render
