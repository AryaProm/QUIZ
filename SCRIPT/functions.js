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
      this.current_question.innerText = this.currentQuestionIndex + 1; // Update question number
      if (
        this.currentQuestionIndex < this.questions.length &&
        this.currentQuestionIndex >= 0
      ) {
        this.options_container.innerHTML = ""; // Clear previous options
        let question = this.questions[this.currentQuestionIndex]; // Get current question
        this.question_text.innerText = question.question; // Display question text
  
        // Loop through options
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

          if (this.userAnswers[this.currentQuestionIndex] === index) {
            radio.checked = true;
          }
  
          radio.addEventListener("change", () => {
            this.userAnswers[this.currentQuestionIndex] = index;
          });
  
          optionWrapper.appendChild(radio);
          optionWrapper.appendChild(label);
          this.options_container.appendChild(optionWrapper);
        });
  
        // Show/hide "Previous" button
        this.prev_Button.style.display =
          this.currentQuestionIndex === 0 ? "none" : "inline-block";
  
        // Change "Next" button to "Finish" on the last question
        if (this.currentQuestionIndex === this.questions.length - 1) {
          this.next_Button_Img.src = "../IMAGES/Finish.png";
          this.next_Button_Img.alt = "Finish";
        } else {
          this.next_Button_Img.src = "../IMAGES/Arrow_Front.png";
          this.next_Button_Img.alt = "Next";
        }
      }
      console.log(this.userAnswers)
    }
  
    submit() {
      let score = 0;
  
      // Calculate the score
      this.questions.forEach((question, index) => {
        if (this.userAnswers[index] === question.correctAnswer) {
          score++;
        }
      });
  
      // Determine feedback based on score percentage
      let percentage = (score / this.questions.length) * 100;
      let emoji = "";
      let message = "";
  
      if (percentage === 100) {
        emoji = "👑";
        message = "King! Perfect Score!";
      } else if (percentage >= 70) {
        emoji = "🏆";
        message = "Winner! Great job!";
      } else if (percentage >= 50) {
        emoji = "👍";
        message = "Good! Keep it up!";
      } else if (percentage >= 30) {
        emoji = "🙌";
        message = "Nice try! You can do better!";
      } else {
        emoji = "😞";
        message = "Loser! Better luck next time!";
      }
  
      // Clear quiz container and display score + message
      this.quiz_container.innerHTML = `
          <h2>Quiz Completed!</h2>
          <p style="font-size: 2rem; font-weight: bold; text-align: center;">
            Your Score: <strong>${score} / ${this.questions.length}</strong>
          </p>
          <p style="font-size: 4rem; text-align: center;">${emoji}</p>
          <p style="font-size: 1.5rem; font-weight: bold; text-align: center;">${message}</p>
          <button id="restart-btn">Restart Quiz</button>
        `;
  
      // Restart quiz button functionality
      document
        .getElementById("restart-btn")
        .addEventListener("click", function () {
          window.location.href = "index.html"; // Redirect to index.html
        });
    }
  }
  