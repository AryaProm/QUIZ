import { questions } from "./questions.js";
import { Render_Function } from "../SCRIPT/functions.js";


const next_Button = document.getElementById("next-btn");
const prev_Button = document.getElementById("prev-btn");
const total_question = document.getElementById("total-questions");

total_question.innerText = questions.length;

const RF = new Render_Function(questions);

// Next button logic
next_Button.addEventListener("click", function () {
  if (RF.userAnswers[RF.currentQuestionIndex] === null) {
    alert("Please select an option before proceeding!");
    return;
  }
  if (RF.currentQuestionIndex < questions.length - 1) {
    RF.currentQuestionIndex++; // Update inside the class
    RF.render_question();
  } else {
    RF.submit();
  }
});

// Previous button logic
prev_Button.addEventListener("click", function () {
  if (RF.currentQuestionIndex > 0) {
    RF.currentQuestionIndex--; // Update inside the class
    RF.render_question();
  }
});

RF.render_question(); // Initial render
