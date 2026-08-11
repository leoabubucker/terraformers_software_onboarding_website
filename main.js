function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function type(elt, msg, delay) {
    var i = 0;
    elt.textContent = "";
    while (elt.textContent != msg && i < msg.length) {
        elt.textContent += msg[i];
        i++;
        await sleep(delay);
    }

}

async function fadeIn(elt, delay, increment) {
    var opacity = 0;
    while (parseFloat(window.getComputedStyle(elt).opacity) < 1) {
        elt.style.opacity = opacity.toString();
        // document.getElementsByClassName("loadingBar")[0].style.opacity = opacity.toString();
        // document.getElementsByClassName("loadingText")[0].style.opacity = opacity.toString();
        opacity += increment;
        await sleep(delay);
    }
}


function initSurvey() {
    const form = document.getElementById("survey");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const data = new FormData(form);

        const answers = {
            q1: data.getAll("q1"),
            q2: data.getAll("q2"),
            q3: data.getAll("q3"),
            q4: data.get("q4"),
            q5: data.get("q5"),
            q6: data.get("q6"),
            q7: data.get("q7"),
            q8: data.get("q8"),
            q9: data.get("q9"),
            q10: data.get("q10")
        };
        // scoring between 0 and 4 based on survey results, highest score will get recommended to 0
        var embeddedScore = 0;
        var sensorsScore = 0;
        var visionScore = 0;
        var uiScore = 0;

        var suggestedLevel = 0; // 0 = start beginner prog; 1 = start intermediate prog; 2 = start ROS; 3 = start subteam


        embeddedScore += parseFloat(answers.q5);
        visionScore += parseFloat(answers.q6);
        sensorsScore += parseFloat(answers.q7) * (2 / 3) + parseFloat(answers.q8) * (1 / 3)

        if (answers.q1.includes("None")) {
            suggestedLevel = 0; // start beginner prog
        }
        else if (answers.q1.includes("C++") || answers.q1.includes("C") || answers.q1.includes("Java")) {
            // has beginner experience of language relevant to C++ = start intermediate prog
            suggestedLevel = 1;
            if (answers.q2.includes("C++") || answers.q2.includes("C") || answers.q3.includes("C++") || answers.q3.includes("C")) {
                // has intermediate or advanced experience in C++ or C directly = start ROS
                suggestedLevel = 2;
                if (parseInt(answers.q4) >= 3) {
                    // has intermediate or advanced experience with ROS2 = start subteam directly
                    suggestedLevel = 3;
                }
            }
        }


        if (answers.q1.includes("HTML") || answers.q1.includes("CSS") || answers.q1.includes("JS")) {
            uiScore = 1;
        }
        else if (answers.q2.includes("HTML") || answers.q2.includes("CSS") || answers.q2.includes("JS")) {
            uiScore = 2;
        }
        else if (answers.q3.includes("HTML") || answers.q3.includes("CSS") || answers.q3.includes("JS")) {
            uiScore = 2;
        }
        if (parseInt(answers.q9) > 1) {
            uiScore++; // at least beginner ROSLIB JS experience
        }


        console.log(answers);
        document.getElementById("preference").textContent = "Your Sub-Team Preference: " + answers.q10;

        if (suggestedLevel == 0) {
            document.getElementById("startingPoint").textContent = "Recommended Starting Point: Learn C++ From the Beginning";
        }
        else if (suggestedLevel == 1) {
            document.getElementById("startingPoint").textContent = "Recommended Starting Point: Learn Intermediate C++";
        }
        else if (suggestedLevel == 2) {
            document.getElementById("startingPoint").textContent = "Recommended Starting Point: Learn ROS2";
        }
        else if (suggestedLevel == 3) {
            document.getElementById("startingPoint").textContent = "Recommended Starting Point: Choose a Sub-Team";
        }

        var highestScore = Math.max(embeddedScore, sensorsScore, visionScore, uiScore);
        var recommendedTeamString = "Recommended Sub-Team(s): "
        var recommendedTeams = []
        if (embeddedScore == highestScore) {
            recommendedTeams.push("Embedded");
        }
        if (sensorsScore == highestScore) {
            recommendedTeams.push("Sensors & Navigation");
        }
        if (visionScore == highestScore) {
            recommendedTeams.push("Computer Vision");
        }
        if (uiScore == highestScore) {
            recommendedTeams.push("User Interface");
        }

        recommendedTeams.forEach((team, index) => {
            recommendedTeamString += team;
            if (index != recommendedTeams.length - 1) {
                recommendedTeamString += ", ";
            }
        });
        sensorsScore = sensorsScore.toFixed(2);
        embeddedScore = embeddedScore.toFixed(2);
        visionScore = visionScore.toFixed(2);
        uiScore = uiScore.toFixed(2);
        document.getElementById("recommendedTeam").textContent = recommendedTeamString;
        document.getElementById("embedded").textContent = "Embedded Score: " + embeddedScore.toString();
        document.getElementById("sensors").textContent = "Sensors & Navigation Score: " + sensorsScore.toString();
        document.getElementById("vision").textContent = "Computer Vision Score: " + visionScore.toString();
        document.getElementById("ui").textContent = "User Interface Score: " + uiScore.toString();

        document.getElementsByClassName("overlay")[0].style.display = "flex";
        document.getElementsByClassName("surveyResultsPopup")[0].style.display = "flex";
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function loadIndex() {
    type(document.getElementById("type1"), "Welcome to Software Onboarding for Terraformers", 50).then(() => {
        type(document.getElementById("type2"), "Please click the option below that best matches what you are looking for", 30).then(() => {
            fadeIn(document.getElementsByClassName("optionsTable")[0], 100, 0.05)
        });
    });
}

function loadAbout() {
    type(document.getElementById("type1"), "About Us", 100).then(() => {
        fadeIn(document.getElementsByClassName("imageHeader")[0], 50, 0.02);
        fadeIn(document.getElementsByClassName("description")[0], 50, 0.02);

    });
}


function loadSurvey() {
    type(document.getElementById("type1"), "Placement Survey", 100).then(() =>{
        initSurvey();
        fadeIn(document.getElementsByClassName("subContainer")[0], 50, 0.02);
    });
}

function loadSetup() {
    type(document.getElementById("type1"), "Setting Up Your Development Environment", 50).then(() => {
            fadeIn(document.getElementsByClassName("description")[0], 50, 0.04);

    });
}

function loadLearnROS() {
    type(document.getElementById("type1"), "Learn ROS2 Jazzy", 70).then(() => {
        fadeIn(document.getElementsByClassName("imageHeader")[0], 50, 0.02);
        fadeIn(document.getElementsByClassName("description")[0], 50, 0.02);

    });
}

function loadLearnCpp() {
    type(document.getElementById("type1"), "Learn C++", 100).then(() => {
            fadeIn(document.getElementsByClassName("description")[0], 50, 0.04);

    });
}
