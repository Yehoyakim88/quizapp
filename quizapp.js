let questions = [
  {
    question: "Wieviele Bundesländer hat Deutschland?",
    answer_1: "A: 12",
    answer_2: "B: 16",
    answer_3: "C: 26",
    answer_4: "D: 14",
    correctAnswer: 2,
  },

  {
    question:
      "Wenn der Nenner eines Bruches größer als der Nenner eines anderen Bruches ist,",
    answer_1: "A: dann ist der Bruch kleiner, wenn der Zähler gleich bleibt",
    answer_2: "B: dann ist der Bruch immer größer",
    answer_3: "C: dann ist der Bruch immer kleiner",
    answer_4: "D: ich habe keine Ahnung",
    correctAnswer: 1,
  },

  {
    question: "Welche englische Formulierung ist korrekt?",
    answer_1: "A: Susan looks forward to seeing her cat",
    answer_2: "B: Susan looks forward to see her cat",
    answer_3: "C: Susan is looking forwards to see her cat",
    answer_4: "D: Susan looks forwards to seeing her cat",
    correctAnswer: 1,
  },

  {
    question: "Man wird diesen Tag nie vergessen,",
    answer_1: "A: an dem man vergessen hat, zu kochen",
    answer_2: "B: an dem man nicht ausgeschlafen hat",
    answer_3: "C: an dem man Jack Sparrow beinahe geschnappt hat",
    answer_4: "D: an dem man vergessen hat, die Blumen zu gießen",
    correctAnswer: 3,
  },
];

let currentQuestion = 0;
let givenAnswer = 5;
let x;
let myAnswer;


function init() {
  document.getElementById("end-screen").style.display = "none";
  console.log("init()");
  let quizCard = (document.getElementById("question-title").innerHTML =
    questions[0]["question"]);
  for (let index = 1; index < questions.length + 1; index++) {
    document.getElementById(`${index}`).innerHTML =
      questions[0][`answer_${index}`];
  }
  document.getElementById(
    "footer-status"
  ).innerHTML = `Frage 1 von ${questions.length}`;
}


function answer(chosen_id) {
  renderAnswers();

  givenAnswer = parseInt(chosen_id);
  console.log(`givenAnswer: ${givenAnswer}`);
  document.getElementById(chosen_id).style.backgroundColor = "#0C6EFD";
  document.getElementById(chosen_id).style.color = "white";
  document.getElementById(chosen_id).style.borderRadius = "0.375rem";

  x = document.getElementById("chosen-one");
  playAudio(x);
}

function renderAnswers() {
  for (let index = 1; index < 5; index++) {
    document.getElementById(index).style.backgroundColor = "#fff";
    document.getElementById(index).style.color = "black";
    document.getElementById(index).style.borderRadius = "0.375rem";
  }
}


function verifyAnswer() {
  let theCorrectAnswer = parseInt(questions[currentQuestion]["correctAnswer"]);

  if (givenAnswer == 5) {
    noAnswer();
    return
  }

  if (givenAnswer == theCorrectAnswer) {
    correctAnswer();
  } else {
    wrongAnswer();
  }

  playAudio(x);
  // nextQuestion();
  setTimeout(nextQuestion, 4000);
}


function noAnswer() {
  x = document.getElementById("no-answer");
  document.getElementById('card-image').setAttribute('src', './img/pleaseAnswer.jpeg');
  playAudio(x);
  document.getElementById("alert-container").classList.remove("hide");
  document.getElementById('alert-text').style = 'color: black';
  document.getElementById('alert-text').innerHTML = 'Antwort wählen!';
  setTimeout(hideAlert, 1000);
}


function wrongAnswer() {
  console.log("Sorry but this is the wrong answer :(");
  x = document.getElementById("audioFail");
  document.getElementById('card-image').setAttribute('src', './img/wrongAnswer.jpeg');
  document.getElementById("alert-container").classList.remove('hide');
  document.getElementById('alert-text').classList.add('redText');
  document.getElementById('alert-text').style = 'top: 100px';
  document.getElementById('alert-text').style = 'left: 80px';

  document.getElementById('alert-text').innerHTML = 'Falsche Antwort!';
  setTimeout(hideAlert, 4000);
}


function correctAnswer() {
  console.log("Correct answer given :)");
  x = document.getElementById("audioSuccess");
  document.getElementById('card-image').setAttribute('src', './img/correctAnswer.jpeg');
  document.getElementById("alert-container").classList.remove('hide');
  document.getElementById('alert-text').classList.remove('redText');
  document.getElementById('alert-text').classList.add('greenText');
  document.getElementById('alert-text').style = 'top: 100px';
  document.getElementById('alert-text').style = 'left: 80px';

  document.getElementById('alert-text').innerHTML = 'Richtige Antwort!';
  setTimeout(hideAlert, 4000);
}

function hideAlert() {
  document.getElementById("alert-container").classList.add("hide");
  document.getElementById('card-image').setAttribute('src', './img/hair-wildlife-think-mammal-mane-monkey-932953-pxhere.com.jpg');
}


function playAudio(y) {
  console.log(`y: ${y}`);
  y.play();
}


function nextQuestion() {
  let progressBar = document.getElementById("my-progress");
  currentQuestion++;
  let progressBarStatus = currentQuestion * 25;
  console.log(`nextQuestion(): progressBarStatus: ${progressBarStatus}`);
  progressBar.setAttribute("aria-valuenow", `${progressBarStatus}`);
  progressBar.style = `width: ${progressBarStatus}%`;

  document.getElementById('card-image').setAttribute('src', './img/hair-wildlife-think-mammal-mane-monkey-932953-pxhere.com.jpg');

  console.log(`currentQuestion now: ${currentQuestion}`);
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showEndScreen();
  }
}


function showQuestion() {
  renderAnswers();
  document.getElementById("question-title").innerHTML =
    questions[currentQuestion]["question"];

  for (let index = 1; index < questions.length + 1; index++) {
    document.getElementById(`${index}`).innerHTML =
      questions[currentQuestion][`answer_${index}`];
  }
  document.getElementById("footer-status").innerHTML = `Frage ${
    currentQuestion + 1
  } von ${questions.length}`;
  givenAnswer = 5;
  console.log(`givenAnswer: ${givenAnswer}`);
}


function showEndScreen() {
  document.getElementById("question-body").style.display = "none";
  document.getElementById("end-screen").style.display = "";

  let soundContainer = document.getElementById("finished-quiz");
  console.log(`soundContainer: ${soundContainer}`);
  let finishContainer = document.getElementById("card-container");
  finishContainer.innerHTML = /*html*/ `
  <img class="finishImage" src="./img/finish.jpeg">
  <h1 class="textTopCenter">Ende !!!</h1>`;
  playAudio(soundContainer);
}
