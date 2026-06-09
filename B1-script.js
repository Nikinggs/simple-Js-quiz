

const questions = [
  {
    question: "Which keyword declares a block-scoped variable?",
    answers: ["var", "let", "define", "new"],
    correct: "let"
  },
  {
    question: "What does DOM stand for?",
    answers: [
      "Document Object Model",
      "Data Object Model",
      "Digital Object Map",
      "Document Order Model"
    ],
    correct: "Document Object Model"
  },
  {
    question: "Which company created JavaScript?",
    answers: [
      "Microsoft",
      "Netscape",
      "Google",
      "Oracle"
    ],
    correct: "Netscape"
  },
  {
    question: "What is 5 + 10?",
    answers: ["10","15","20","25"],
    correct: "15"
  },
  {
    question: "Which method adds an item to an array?",
    answers: [
      "push",
      "append",
      "insert",
      "add"
    ],
    correct: "push"
  },
  {
    question: "Which operator means strict equality?",
    answers: [
      "==",
      "=",
      "===",
      "!="
    ],
    correct: "==="
  },
  {
    question: "Which HTML tag creates a link?",
    answers: [
      "<a>",
      "<link>",
      "<href>",
      "<url>"
    ],
    correct: "<a>"
  },
  {
    question: "What does CSS stand for?",
    answers: [
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Creative Style Sheets",
      "Color Style Sheets"
    ],
    correct: "Cascading Style Sheets"
  },
  {
    question: "Which array method creates a new array?",
    answers: [
      "map",
      "forEach",
      "push",
      "splice"
    ],
    correct: "map"
  },
  {
    question: "What year was JavaScript created?",
    answers: [
      "1995",
      "2000",
      "1989",
      "1998"
    ],
    correct: "1995"
  }
];

let currentQuestion = 0;
let score = 0;

let review = [];

const questionEl =
document.getElementById("question");

const answersEl =
document.getElementById("answers");

const scoreEl =
document.getElementById("score");

const progressBar =
document.getElementById("progressBar");

const progressText =
document.getElementById("progressText");

const nextBtn =
document.getElementById("nextBtn");

const timerEl =
document.getElementById("timer");

let bestScore =
localStorage.getItem("bestScore") || 0;

document.getElementById(
  "bestScore"
).textContent = bestScore;

let timeLeft = 15;
let timer;

function startTimer() {

  clearInterval(timer);

  timeLeft = 15;

  timerEl.textContent = timeLeft;

  timer = setInterval(() => {

    timeLeft--;

    timerEl.textContent = timeLeft;

    if(timeLeft === 0){

      clearInterval(timer);

      review.push({
        question:
        questions[currentQuestion].question,
        correct:
        questions[currentQuestion].correct,
        selected:
        "No Answer"
      });

      nextQuestion();
    }

  },1000);

}

function loadQuestion() {

  startTimer();

  const q =
  questions[currentQuestion];

  questionEl.textContent =
  q.question;

  answersEl.innerHTML = "";

  progressText.textContent =
  `${currentQuestion + 1} / ${questions.length}`;

  progressBar.style.width =
  `${((currentQuestion+1) /
  questions.length) * 100}%`;

  q.answers.forEach(answer => {

    const btn =
    document.createElement("button");

    btn.textContent = answer;

    btn.className =
    "block w-full text-left border p-3 rounded hover:bg-blue-100";

    btn.addEventListener(
      "click",
      () => checkAnswer(answer),
  );

    answersEl.appendChild(btn);

  });

}

function checkAnswer(answer){

  clearInterval(timer);

  const q =
  questions[currentQuestion];

  if(answer === q.correct){
    score++;
  }

  review.push({
    question:q.question,
    selected:answer,
    correct:q.correct,
  });

  scoreEl.textContent = score;

  nextBtn.classList.remove(
    "hidden"
  );

}

nextBtn.addEventListener(
  "click",
  nextQuestion
);

function nextQuestion(){

  nextBtn.classList.add(
    "hidden"
  );

  currentQuestion++;

  if(
    currentQuestion <
    questions.length
  ){
    loadQuestion();
  }else{
    showResults();
  }

}

function showResults(){

  if(score > bestScore){

    localStorage.setItem(
      "bestScore",
      score
    );

    bestScore = score;
  }

  document.querySelector(
    ".bg-white"
  ).innerHTML = `
  <h2 class="text-3xl font-bold mb-4">
    Quiz Finished
  </h2>

  <p class="mb-4">
    Final Score:
    ${score}/${questions.length}
  </p>

  <h3 class="font-bold mb-2">
    Review
  </h3>

  ${review.map(item => `
    <div class="border p-3 mb-2 rounded">
      <p><strong>Question:</strong>
      ${item.question}</p>

      <p>
      Your Answer:
      ${item.selected}
      </p>

      <p>
      Correct Answer:
      ${item.correct}
      </p>
    </div>
  `).join("")}

  <button
    onclick="location.reload()"
    class="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
  >
    Play Again
  </button>
  `;
}

loadQuestion();