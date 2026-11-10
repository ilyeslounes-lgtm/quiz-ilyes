const quizData = [
    {
        question: "What metal is Captain America's shield made of?",
        options: ["Adamantium", "Vibranium", "Titanium", "Kryptonite"],
        correct: 1
    },
    {
        question: "Which superhero comes from the planet Krypton?",
        options: ["Batman", "Thor", "Superman", "Flash"],
        correct: 2
    },
    {
        question: "Which specific Spider-man villain's real name is Dmitri Smerdyakov?",
        options: ["Chameleon", "Kraven The Hunter", "The Rhino", "Vulture"],
        correct: 0
    },
    {
        question: "which villain broke Batman's back in the Batcave?'?",
        options: ["Killer Croc", "Bane", "Azrael", "Solomon Grundy"],
        correct: 1
    },
    {
        question: "What component was used to construct the handle of Stormbreaker after the mold was split?",
        options: ["A piece of Valkyrie's spear ", "Groot's arm", "Enchanted uru rod", "A branch from Yggdrasil"],
        correct: 1
    },
    {
        question: "Which secret society of ultra-wealthy families has secretly controlled Gotham City with the help of Talons?",
        options: ["Order of St. Dumas", "The League of Assassins", "The Parliament of Trees", "The Court of Owls"],
        correct: 3
    },
    {
        question: "What is Cyborg's real name and what was his occupation before his accident?",
        options: ["Victor Sork - Wrestler", "Victor Freeze - Scientist", "Victor Stone - Football player", "Victor Lewis - Musician"],
        correct: 2
    },
    {
        question: "What is Batman's contingency plan against Plastic Man?",
        options: ["Exposed to a chemical that dissolves his molecular bonds permanently", "Frozen and shattered into pieces to prevent him from reforming", "Trapped inside a vacuum that forces his body into an immovable object", "Hit with a thermal wave that turns him into an inert liquid"],
        correct: 1
    },
    
];


let currentQuestion = 0;
let score = 0;
let playerName = "";
let leaderboard = [];

function startQuiz() {
    playerName = document.getElementById("player-name").value.trim();
    if (playerName) {
        document.getElementById("start-screen").style.display = "none";
        document.getElementById("quiz").style.display = "block";
        loadQuestion();
    } else {
        alert("Please enter your name to start the quiz.");
    }
}

function loadQuestion() {
    const quizElement = document.getElementById("quiz");
    const questionData = quizData[currentQuestion];

    let questionHTML = `
        <div class="question">
            <h2>Question ${currentQuestion + 1}:</h2>
            <p>${questionData.question}</p>
            <div class="options">
    `;

    questionData.options.forEach((option, index) => {
        questionHTML += `
            <button onclick="checkAnswer(${index})">${option}</button>
        `;
    });

    questionHTML += `
            </div>
        </div>
    `;

    quizElement.innerHTML = questionHTML;
}

function checkAnswer(selectedIndex) {
    const questionData = quizData[currentQuestion];
    const buttons = document.querySelectorAll(".options button");

    buttons.forEach((button, index) => {
        button.disabled = true;
        if (index === questionData.correct) {
            button.classList.add("correct");
        } else if (index === selectedIndex) {
            button.classList.add("incorrect");
        }
    });

    if (selectedIndex === questionData.correct) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        setTimeout(loadQuestion, 1500);
    } else {
        setTimeout(showResult, 1500);
    }
}

function showResult() {
    const quizElement = document.getElementById("quiz");
    const resultElement = document.getElementById("result");

    quizElement.style.display = "none";
    resultElement.innerHTML = `${playerName}, you scored ${score} out of ${quizData.length}!`;

    updateLeaderboard();
    showLeaderboard();
}

function updateLeaderboard() {
    leaderboard.push({ name: playerName, score: score });
    leaderboard.sort((a, b) => b.score - a.score);
}

function showLeaderboard() {
    const leaderboardElement = document.getElementById("leaderboard");
    leaderboardElement.style.display = "block";

    let leaderboardHTML = `
        <h2>Leaderboard</h2>
        <table>
            <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
            </tr>
    `;

    leaderboard.forEach((player, index) => {
        leaderboardHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${player.name}</td>
                <td>${player.score}</td>
            </tr>
        `;
    });

    leaderboardHTML += `
        </table>
        <button onclick="restartQuiz()">Play Again</button>
    `;

    leaderboardElement.innerHTML = leaderboardHTML;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    playerName = "";
    document.getElementById("leaderboard").style.display = "none";
    document.getElementById("result").innerHTML = "";
    document.getElementById("start-screen").style.display = "block";
    document.getElementById("player-name").value = "";
    document.getElementById("quiz").style.display = "none";
}


window.onload = function() {
    restartQuiz();
    leaderboard = [];
};
