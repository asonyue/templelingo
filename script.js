const questions = [
    {
        question: "Where did Boba come from?",
        answers: [
            { text: "Hong Kong", correct: false },
            { text: "Taiwan", correct: true },
            { text: "China", correct: false },
            { text: "South Korea", correct: false }
        ]
    },
    {
        question: "Which Store can you get the Taiwanese fruit tea?",
        answers: [
            { text: "hengfa", correct: false },
            { text: "trader joe", correct: false },
            { text: "yifang", correct: true },
            { text: "the fresh", correct: false }
        ]
    },
    {
        question: "What is not used in making soymilk?",
        answers: [
            { text: "Milk", correct: true },
            { text: "soybean", correct: false },
            { text: "sugar", correct: false },
            { text: "water", correct: false }
        ]
    },
    {
        question: "What is the color of the liquid inside Wong Lo Kat?",
        answers: [
            { text: "Red", correct: false },
            { text: "Transparent", correct: false },
            { text: "brown", correct: true },
            { text: "green", correct: false }
        ]
    }
];

const heading = document.getElementById("bigTitle")
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        heading.innerHTML = "Congratulations, CORRECT !!!"
    } else {
        selectedBtn.classList.add("incorrect");
        heading.innerHTML = "Sorry, it is not correct !!!"
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        } else {
            button.disabled = true;
        }
    });
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    let pick;
    do {
        pick = Math.floor(Math.random() * questions.length);
    } while (pick === currentQuestionIndex);
    currentQuestionIndex = pick;
    showQuestion();
});



startQuiz();