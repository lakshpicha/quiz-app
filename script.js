const questionBank = {
    math: {
        easy: [
            { q: "2 + 2 = ?", options: ["2", "3", "4", "5"], answer: "4" },
            { q: "10 - 3 = ?", options: ["5", "7", "8", "6"], answer: "7" },
            { q: "5 × 2 = ?", options: ["7", "10", "12", "15"], answer: "10" }
        ],
        medium: [
            { q: "Solve: 12 × 3", options: ["24", "30", "36", "40"], answer: "36" },
            { q: "Square of 8?", options: ["64", "56", "72", "60"], answer: "64" },
            { q: "50 ÷ 5 = ?", options: ["5", "10", "15", "20"], answer: "10" }
        ],
        hard: [
            { q: "Solve: 15 × 15", options: ["220", "200", "225", "240"], answer: "225" },
            { q: "√169 = ?", options: ["12", "13", "14", "15"], answer: "13" },
            { q: "Solve: (25 × 4) - 10", options: ["90", "80", "70", "60"], answer: "90" }
        ]
    },

    gk: {
        easy: [
            { q: "National animal of India?", options: ["Tiger", "Lion", "Leopard", "Elephant"], answer: "Tiger" },
            { q: "Capital of India?", options: ["Delhi", "Mumbai", "Chennai", "Kolkata"], answer: "Delhi" },
            { q: "Which planet is closest to Sun?", options: ["Earth", "Mars", "Mercury", "Venus"], answer: "Mercury" }
        ],
        medium: [
            { q: "Who wrote ‘Gitanjali’?", options: ["Premchand", "Rabindranath Tagore", "Gandhi", "Shakespeare"], answer: "Rabindranath Tagore" },
            { q: "Largest ocean?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], answer: "Pacific" },
            { q: "Fastest animal?", options: ["Lion", "Cheetah", "Leopard", "Tiger"], answer: "Cheetah" }
        ],
        hard: [
            { q: "Where is Ajanta Caves located?", options: ["MP", "UP", "Maharashtra", "Bihar"], answer: "Maharashtra" },
            { q: "Which gas is most abundant in air?", options: ["Oxygen", "CO2", "Nitrogen", "Hydrogen"], answer: "Nitrogen" },
            { q: "Who invented telephone?", options: ["Tesla", "Graham Bell", "Edison", "Newton"], answer: "Graham Bell" }
        ]
    },

    science: {
        easy: [
            { q: "H2O is:", options: ["Oxygen", "Hydrogen", "Water", "Salt"], answer: "Water" },
            { q: "Sun is a:", options: ["Planet", "Star", "Satellite", "Comet"], answer: "Star" },
            { q: "Which gas do plants produce?", options: ["CO2", "Oxygen", "Nitrogen", "Argon"], answer: "Oxygen" }
        ],
        medium: [
            { q: "Human blood is:", options: ["Acidic", "Basic", "Neutral", "None"], answer: "Basic" },
            { q: "Speed of light?", options: ["1,00,000 km/s", "2,00,000 km/s", "3,00,000 km/s", "5,00,000 km/s"], answer: "3,00,000 km/s" },
            { q: "Which organ pumps blood?", options: ["Liver", "Heart", "Kidney", "Lungs"], answer: "Heart" }
        ],
        hard: [
            { q: "Atomic number of Oxygen?", options: ["6", "7", "8", "9"], answer: "8" },
            { q: "Smallest unit of life?", options: ["Atom", "Cell", "Tissue", "Organ"], answer: "Cell" },
            { q: "Blood pressure is measured in:", options: ["CM", "KG", "mmHg", "MPa"], answer: "mmHg" }
        ]
    }
};

let questions = [];
let current = 0;
let score = 0;
let selectedAnswer = "";
let timer;
let timeLeft = 10;
let timeSpent = [];

function startQuiz() {
    let cat = document.getElementById("category").value;
    let diff = document.getElementById("difficulty").value;

    questions = questionBank[cat][diff];

    document.getElementById("homePage").style.display = "none";
    document.getElementById("quizPage").style.display = "block";

    loadQuestion();
}

function loadQuestion() {
    timeLeft = 10;
    document.getElementById("timer").innerText = timeLeft;

    let q = questions[current];
    document.getElementById("questionText").innerText = q.q;

    let output = "";
    q.options.forEach(opt => {
        output += `<div class="option" onclick="selectAns(this)">${opt}</div>`;
    });
    document.getElementById("optionsBox").innerHTML = output;

    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function selectAns(option) {
    selectedAnswer = option.innerText;

    document.querySelectorAll(".option")
        .forEach(o => o.style.background = "#f1f2f6");

    option.style.background = "#c8e6ff";
}

function nextQuestion() {
    clearInterval(timer);
    timeSpent.push(10 - timeLeft);

    if (selectedAnswer === questions[current].answer) score++;

    selectedAnswer = "";
    current++;

    if (current < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById("quizPage").style.display = "none";
    document.getElementById("resultPage").style.display = "block";

    document.getElementById("scoreText").innerHTML =
        `Correct: ${score} / ${questions.length} <br> Score: ${(score / questions.length * 100).toFixed(1)}%`;

    timeSpent.forEach((t, i) => {
        document.getElementById("timeList").innerHTML += `<li>Q${i + 1}: ${t} sec</li>`;
    });

    drawChart(score, questions.length - score);
}

function drawChart(correct, wrong) {
    let ctx = document.getElementById("chartCanvas").getContext("2d");
    let total = correct + wrong;

    let correctAngle = (correct / total) * 2 * Math.PI;
    let wrongAngle = (wrong / total) * 2 * Math.PI;

    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 100, 0, correctAngle);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 100, correctAngle, correctAngle + wrongAngle);
    ctx.fill();
}
