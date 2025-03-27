export class Render_Function {
  constructor(questions) {
    this.userAnswers = new Array(questions.length).fill(null); // Stores user answers
    this.quiz_container = document.getElementById("quiz-container");
    this.question_text = document.getElementById("question-text");
    this.options_container = document.getElementById("options-container");
    this.next_Button_Img = document.getElementById("next-btn-img");
    this.current_question = document.getElementById("current-question");
    this.prev_Button = document.getElementById("prev-btn");
    this.currentQuestionIndex = 0;
    this.questions = questions;
  }

  render_question() {
    const { currentQuestionIndex, questions, options_container, question_text, prev_Button, next_Button_Img } = this;
    
    this.current_question.innerText = currentQuestionIndex + 1; // Update question number
    const question = questions[currentQuestionIndex];

    if (!question) return;

    question_text.innerText = question.question; // Display question text
    options_container.innerHTML = ""; // Clear previous options

    const fragment = document.createDocumentFragment(); // Improves performance

    question.options.forEach((option, index) => {
      const optionWrapper = document.createElement("div");
      optionWrapper.classList.add("option-container");

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "quiz-option";
      radio.value = index;
      radio.id = `option${index}`;
      radio.classList.add("quiz-option");
      radio.checked = this.userAnswers[currentQuestionIndex] === index;

      const label = document.createElement("label");
      label.htmlFor = `option${index}`;
      label.textContent = option;

      radio.addEventListener("change", () => {
        this.userAnswers[currentQuestionIndex] = index;
      });

      optionWrapper.append(radio, label);
      fragment.appendChild(optionWrapper);
    });

    options_container.appendChild(fragment); // Append all at once

    // Toggle "Previous" button visibility
    prev_Button.style.display = currentQuestionIndex === 0 ? "none" : "inline-block";

    // Change "Next" button to "Finish" on the last question
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    next_Button_Img.src = isLastQuestion ? "../IMAGES/Finish.png" : "../IMAGES/Arrow_Front.png";
    next_Button_Img.alt = isLastQuestion ? "Finish" : "Next";

    console.log(this.userAnswers);
  }

  submit() {
    const score = this.userAnswers.reduce((total, answer, index) => {
      return total + (answer === this.questions[index].correctAnswer ? 1 : 0);
    }, 0);

    // Determine feedback based on score percentage
    const percentage = (score / this.questions.length) * 100;
    const feedback = [
      { threshold: 100, emoji: "👑", message: "King! Perfect Score!" },
      { threshold: 70, emoji: "🏆", message: "Winner! Great job!" },
      { threshold: 50, emoji: "👍", message: "Good! Keep it up!" },
      { threshold: 30, emoji: "🙌", message: "Nice try! You can do better!" },
      { threshold: 0, emoji: "😞", message: "Loser! Better luck next time!" },
    ];

    const { emoji, message } = feedback.find(({ threshold }) => percentage >= threshold);

    // Display results
    this.quiz_container.innerHTML = `
      <h2>Quiz Completed!</h2>
      <p style="font-size: 2rem; font-weight: bold; text-align: center;">
        Your Score: <strong>${score} / ${this.questions.length}</strong>
      </p>
      <p style="font-size: 4rem; text-align: center;">${emoji}</p>
      <p style="font-size: 1.5rem; font-weight: bold; text-align: center;">${message}</p>
      <button id="restart-btn">Restart Quiz</button>
    `;

    document.getElementById("restart-btn").addEventListener("click", () => {
      window.location.href = "index.html"; // Restart quiz
    });
  }
}
