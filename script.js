const quizData = [
    /*const är en variabel man använder som aldrig får ändras*/
    {
        question: "What metal is Captain America's shield made of?",
        image: "image/capshield.jpeg", 
        options: ["Adamantium", "Vibranium", "Titanium", "Kryptonite"],
        correct: 1
    },
    {
        question: "Which superhero comes from the planet Krypton?",
        image: "image/Krypton_(DC_Comics_planet_-_circa_2018).jpeg",
        options: ["Batman", "Thor", "Superman", "Flash"],
        correct: 2
    },
    {
        question: "Which specific Spider-man villain's real name is Dmitri Smerdyakov?",
        image: "image/Villainarena.jpeg",
        options: ["Chameleon", "Kraven The Hunter", "The Rhino", "Vulture"],
        correct: 0
    },
    {
        question: "Which villain broke Batman's back in the Batcave?",
        image: "image/backbroken.jpeg",
        options: ["Killer Croc", "Bane", "Azrael", "Solomon Grundy"],
        correct: 1
    },
    {
        question: "What component was used to construct the handle of Stormbreaker after the mold was split?",
        image: "image/stormbreaker.jpeg",
        options: ["A piece of Valkyrie's spear ", "Groot's arm", "Enchanted uru rod", "A branch from Yggdrasil"],
        correct: 1
    },
    {
        question: "Which secret society of ultra-wealthy families has secretly controlled Gotham City with the help of Talons?",
        image: "image/Gotham_City_Arkham.jpeg",
        options: ["Order of St. Dumas", "The League of Assassins", "The Parliament of Trees", "The Court of Owls"],
        correct: 3
    },
    {
        question: "What is Cyborg's real name and what was his occupation before his accident?",
        image: "image/cyborg.jpeg",
        options: ["Victor Sork - Wrestler", "Victor Freeze - Scientist", "Victor Stone - Football player", "Victor Lewis - Musician"],
        correct: 2
    },
    {
        question: "What is Batman's contingency plan against Plastic Man?",
        image: "image/batmancontingencyplans.jpeg",
        options: ["Exposed to a chemical that dissolves his molecular bonds permanently", "Frozen and shattered into pieces to prevent him from reforming", "Trapped inside a vacuum that forces his body into an immovable object", "Hit with a thermal wave that turns him into an inert liquid"],
        correct: 1
    }
];
/*Frågor och vilka val man kan använda och korrekt svar*/

let currentQuestion = 0;
let score = 0;
let playerName = "";
let leaderboard = [];
/* håller koll på vilken fråga spelaren är på och poängen och namnet på spelarne och låt leaderboard vara empty*/

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
/* startar quiz och kollar om spelaren har ett namn, om inte låt inte spelaren börja */

function loadQuestion() {
    const quizElement = document.getElementById("quiz");
    const questionData = quizData[currentQuestion];

    let questionHTML = `
        <div class="question">
            <h2>Question ${currentQuestion + 1}:</h2>
            <p>${questionData.question}</p>
            <img src="${questionData.image}" alt="Question Image" style="max-width: 100%; height: auto; margin-bottom: 15px; border-radius: 8px;">
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
/* Jobbar med html koden och efter man har tryckt på en knapp så kan man se rätta svaret och bild med styling redan här så jag inte behöver göra det senare fick hjälp av AI här med hur jag skulle kunna sätta in bilder i koden och styling */

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
/*Efter man har tryckt på en fråga så kan du inte ändra till den korrekta svarsalternativet och du får poäng om du har rätt du ska också vänta i 1.5 sekunder*/

function showResult() {
    const quizElement = document.getElementById("quiz");
    const resultElement = document.getElementById("result");

    quizElement.style.display = "none";
    resultElement.style.display = "block";
    resultElement.innerHTML = `${playerName}, you scored ${score} out of ${quizData.length}!`;

    updateLeaderboard();
    showLeaderboard();
}
/* Visa resultatet och samtidigt uppdatera the leaderboard och visa leaderboard*/

function updateLeaderboard() {
    leaderboard.push({ name: playerName, score: score });
    leaderboard.sort((a, b) => b.score - a.score);
}
/* den som har mest poäng blir pushad först */

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
    /*visar leaderboard visar namnet rank och poäng */
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
/*en tabell för varenda spelare så de får sin egna version av tabellen och skapar en spela igen knapp */

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    playerName = "";
    document.getElementById("leaderboard").style.display = "none";
    document.getElementById("result").style.display = "none";
    document.getElementById("result").innerHTML = "";
    document.getElementById("start-screen").style.display = "block";
    document.getElementById("player-name").value = "";
    document.getElementById("quiz").style.display = "none";
}

window.onload = function() {
    restartQuiz();
    leaderboard = [];
};
/*startar om quizzet med allting tillbaka till noll*/