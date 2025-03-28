import { questions } from "./questions.js";
import { Render_Function } from "../SCRIPT/functions.js";

const next_Button = document.getElementById("next-btn");
const prev_Button = document.getElementById("prev-btn");
const total_question = document.getElementById("total-questions");

total_question.innerText = questions.length;

const RF = new Render_Function(questions);

const navigate = (direction) => {
  if (direction === "next") {
    if (RF.userAnswers[RF.currentQuestionIndex] === null) {
      alert("Please select an option before proceeding!");
      return;
    }
    if (RF.currentQuestionIndex < questions.length - 1) {
      RF.currentQuestionIndex++;
      RF.render_question();
    } else {
      RF.submit();
    }
  } else if (direction === "prev" && RF.currentQuestionIndex > 0) {
    RF.currentQuestionIndex--;
    RF.render_question();
  }
};

next_Button.addEventListener("click", () => navigate("next"));
prev_Button.addEventListener("click", () => navigate("prev"));

RF.render_question();
