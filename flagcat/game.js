const startDate = new Date(2026, 3, 24);
const thisDay = new Date();
thisDay.setHours(0,0,0,0);

const dayNum = Math.floor((thisDay - startDate) / 86400000) + 1;

const dayChars = "\u00A0#" + dayNum;
dayChars.split("").forEach((char, i) => {
    const span = document.createElement("span");
    span.textContent = char;
    document.getElementById("title").appendChild(span);
});

const weights = {
    1: 4,
    2: 5,
    3: 5,
    4: 3,
    5: 2
}

const weightedPool = [];
for (let i = 0; i < flags.length; i++) {
    const flag = flags[i];
    const weight = weights[flag.difficulty];

    for (let j = 0; j < weight; j++) {
        weightedPool.push(flag);
    }
}

function getDailyFlags() {
    const today = new Date();
    //today.setDate(today.getDate() - 1); // TROUBLE SHOOTER
    const seed = today.getFullYear() * 10000 
        + (today.getMonth() + 1) * 100 
        + today.getDate();

    // SHUFFLING WEIGHTED POOL BY SEED
    const pool = [...weightedPool];
    let s = seed;
    for (let i = pool.length - 1; i > 0; i--) {
        s = (s * 31 + 17) % 1000000007; // Fuck it Up
        const j = s % (i + 1); // get an earlier random position
        // Swap dat
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    // PICKING FIRST 3 FLAGS AND MAKING SURE NONE MATCH
    const dailyFlags = [];
    for (let i = 0; i < pool.length; i++) {
        if (!dailyFlags.includes(pool[i])) {
            dailyFlags.push(pool[i]);
        }
        if (dailyFlags.length === 3) break;
    }

    return dailyFlags;
}

const [flag1, flag2, flag3] = getDailyFlags();

document.getElementById("flag1").src = `https://flagcdn.com/w320/${flag1.code}.png`;
document.getElementById("flag2").src = `https://flagcdn.com/w320/${flag2.code}.png`;
document.getElementById("flag3").src = `https://flagcdn.com/w320/${flag3.code}.png`;    
    
const correctFlagNames = [flag1.name.toLowerCase(), flag2.name.toLowerCase(), flag3.name.toLowerCase()];

const guessHistory = [];
let gameEnded = false;

let correctGuesses = 0;
let starCount = 0;


const topButtons = document.getElementById("top-buttons");
const starBar = document.getElementById("star-bar");

const sync = () => {
    const rect = topButtons.getBoundingClientRect();
    starBar.style.position = "fixed";
    starBar.style.left = rect.left + "px";
    starBar.style.top = rect.bottom + 8 + "px"; // 8px gap
};

sync();
// new ResizeObserver(sync).observe(topButtons);
window.addEventListener("resize", sync);



function submitGuess() {
    const guess = document.getElementById("guess-input").value.toLowerCase();

    const status = document.getElementById("status")
    const flagBox = document.getElementById("flag-box");

    const flagNames = flags.map(flag => flag.name.toLowerCase());
    if (!flagNames.includes(guess)) {
        status.textContent = "We don't have that one. Guess again!"
        status.classList.remove("flash-incorrect", "flash-correct");
        setTimeout(() => status.classList.add("flash-incorrect"), 1);

        flagBox.classList.remove("shake", "bounce");
        setTimeout(() => flagBox.classList.add("shake"), 1);

        return;
    } else if (guessHistory.includes(guess)) {
        status.textContent = "You guessed that one already... try again!"
        status.classList.remove("flash-incorrect", "flash-correct");
        setTimeout(() => status.classList.add("flash-incorrect"), 1);

        flagBox.classList.remove("shake", "bounce");
        setTimeout(() => flagBox.classList.add("shake"), 1);
        
        return;
    } else {
        status.textContent = "Good guess. Do one another time"
    }

    status.classList.remove("flash-incorrect", "flash-correct");
    setTimeout(() => status.classList.add("flash-correct"), 1);

    flagBox.classList.remove("shake", "bounce");
    setTimeout(() => flagBox.classList.add("bounce"), 1);



    // HANDLING GUESS

    guessHistory.push(guess);

    const isCorrect = correctFlagNames.includes(guess);

    if (isCorrect) {
        correctGuesses++;
        starCount += flags.find(f => f.name.toLowerCase() === guess.toLowerCase()).difficulty;

        // CORRECT GUESS SPLISH /////////////////////////////////

        const barRect = starBar.getBoundingClientRect();

        for (let i = 0; i < flags.find(f => f.name.toLowerCase() === guess.toLowerCase()).difficulty; i++) {
            setTimeout(() => {
                const star = document.createElement("span");
                star.textContent = "★";
                star.style.transform = "rotate(-216deg)";
                star.style.position = "fixed";
                star.style.left = "50vw";
                star.style.top = "50vh";
                star.style.zIndex = 102 + starBar.children.length;
                star.style.fontSize = "6rem";
                star.style.webkitTextStroke = "1px black";
                star.style.color = diffColors[flags.find(f => f.name.toLowerCase() === guess.toLowerCase()).difficulty];

                document.body.appendChild(star);

                const target = star.getBoundingClientRect();
                
                setTimeout(() => {
                    star.style.transition = star.style.transition = "top 0.6s cubic-bezier(0.7, 0, 1, 1), left 0.6s cubic-bezier(0, 0, 0.3, 1), font-size 0.75s ease-out, transform 0.6s cubic-bezier(0.3, 0, 0.5, 1)";

                    star.style.left = barRect.left + "px";
                    star.style.top = barRect.top + "px";

                    star.style.fontSize = "3rem";
                    star.style.transform = "rotate(10deg)";
                }, 50);

                setTimeout(() => {
                    star.remove();
                    const settled = document.createElement("span");
                    settled.style.color = diffColors[flags.find(f => f.name.toLowerCase() === guess.toLowerCase()).difficulty];
                    settled.textContent = "★";
                    settled.style.fontSize = "3rem";
                    settled.style.webkitTextStroke = "1px black";
                    settled.style.transform = "rotate(10deg)";
                    settled.style.position = "relative";
                    settled.style.zIndex = 1 + starBar.children.length;
                    starBar.prepend(settled);
                }, 750);
                
            }, i * 300);
        }
    }
    
    document.getElementById("guess-input").value = "";

    renderGuess(guess, isCorrect);

    writeSave();

    if (correctGuesses === 3) {
        endGame();
    }
}

function renderGuess(guess, isCorrect) {

    const entry = document.createElement("div");

    if (isCorrect) {
        entry.classList.add("guess-correct");
    } else {
        entry.classList.add("guess-wrong");
    }
    
    const span = document.createElement("span");
    span.textContent = guess.charAt(0).toUpperCase() + guess.slice(1);;
    entry.appendChild(span);
    entry.style.flex = "1";

    const img = document.createElement("img");
    img.src = getFlag(flags.find(f => f.name.toLowerCase() === guess.toLowerCase()).code);
    
    img.style.height = "100%";
    img.style.width = "auto";
    img.style.objectFit = "cover";
    img.style.position = "relative";
    img.style.zIndex = "1";
    img.style.border = "2px solid #2B1B14";

    const guessBox = document.createElement("div");
    guessBox.style.height = "32px";
    guessBox.style.alignItems = "stretch";
    guessBox.style.display = "flex";
    guessBox.style.gap = "8px";

    guessBox.appendChild(entry);
    guessBox.appendChild(img);

    document.getElementById("guess-history").prepend(guessBox);
}

function endGame() {
    if (correctGuesses === 3) {
        // HANDLE WIN //////////////////////////////////////////////////////////
        const status = document.getElementById("status");
        status.textContent = "";

        const first = document.createTextNode("Holy moly you did it. You guessed my three flags! Click ");

        const button = document.createElement("button");
        button.textContent = "Here";
        button.style.lineHeight = "12px"
        button.style.paddingLeft = "8px";
        button.style.paddingRight = "8px";
        button.style.paddingTop = "9px";
        button.style.paddingBottom = "10px";
        button.style.fontSize = "1.5rem";
        button.onclick = copyResults;

        const last = document.createTextNode(" to copy your results!");

        status.appendChild(first);
        status.appendChild(button);
        status.appendChild(last);

        logGame(true);
    } else {
        const status = document.getElementById("status");
        status.textContent = "";

        const first = document.createTextNode("Hey you lost but thats okay. Click ");

        const button = document.createElement("button");
        button.textContent = "Here";
        button.style.lineHeight = "12px"
        button.style.paddingLeft = "8px";
        button.style.paddingRight = "8px";
        button.style.paddingTop = "9px";
        button.style.paddingBottom = "10px";
        button.style.fontSize = "1.5rem";
        button.onclick = copyResults;

        const last = document.createTextNode(" to copy your results!");

        status.appendChild(first);
        status.appendChild(button);
        status.appendChild(last);
        logGame(false);
    }

    // TODO: MAKE ALL DAT IN CSS HAVE IT BE A CLASS ////////////////////////
    document.getElementById("guess-input").disabled = true;
    document.getElementById("guess-input").style.background = "darkgray"
    document.getElementById("guess-input").placeholder = "Don't guess...";

    document.getElementById("guess-button").disabled = true;
    document.getElementById("guess-button").style.pointerEvents = "none";
    document.getElementById("guess-button").style.color = "darkolivegreen";

    document.getElementById("give-up-button").disabled = true;
    document.getElementById("give-up-button").style.pointerEvents = "none";
    document.getElementById("give-up-button").style.color = "darkred";

    // ANIMATION /////////////////////////
    document.getElementById("flag-box").classList.add("game-end");

    gameEnded = true;
    writeSave();
}

function copyResults() {
    let nth = dayNum + "st";

    let squaresString = "";
    for (let i = 0; i < guessHistory.length; i++) {
        if (correctFlagNames.includes(guessHistory[i])) {
            squaresString += " 🟩";
        } else {
            squaresString += " 🟥";
        }
    }

    let messageString = "Flagcat #" + dayNum + "\n";
    if (correctGuesses === 3) {
        messageString += "I guessed his three daily flags:"
    } else {
        messageString += "His daily flags got the better of me:"
    }

    let resultsString = "";
    resultsString = messageString + squaresString + "\nTake his " + nth + " challenge here! https://sphxia.github.io/flagcat";
    navigator.clipboard.writeText(resultsString);
}

document.getElementById("guess-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        submitGuess();
    }
});

function openHTP() {
    document.getElementById("how-to-play-modal").classList.remove("close");
}

function closeHTP() {
    document.getElementById("how-to-play-modal").classList.add("close");
}

function openAbout() {
    document.getElementById("about-modal").classList.remove("close");
}

function closeAbout() {
    document.getElementById("about-modal").classList.add("close");
}

document.getElementById("how-to-play-modal").addEventListener("click", function(e) {
    // this works bcz the text and box and stuff arent actually "this" theyre stuff stacked on top i think
    if (e.target === this) closeHTP();
});

document.getElementById("about-modal").addEventListener("click", function(e) {
    // this works bcz the text and box and stuff arent actually "this" theyre stuff stacked on top i think
    if (e.target === this) closeAbout();
});

document.getElementById("guess-input").addEventListener("keydown", function(e) {
    if (e.key === "Tab" && document.getElementById("guess-input").value != "") {
        e.preventDefault();
        const list = document.getElementById("flag-autocompletes");
        const value = this.value.toLowerCase();
        const match = Array.from(list.options).find(option => option.value.toLowerCase().startsWith(value));
        if (match) this.value = match.value;
    }
});

document.getElementById("guess-button").addEventListener("click", () => {
    submitGuess();
});

document.getElementById("give-up-button").addEventListener("click", () => {
    endGame();
});

// SAVING LOADING STUFF /////////////////////////////////////////////

const today = new Date();
const dateKey = `flagcat-${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;

const defaultSave = {
    guessHistory: [],
    starsEarned: 0,
    finished: false
};

const defaultStats = {
    totalPlayed: 0,
    totalWins: 0,
    history: [],
    stars: 0
};

// DAILY SAVE ///////////////////////////////////////////////////
function writeSave() {
    const saveData = {
        guessHistory,
        finished: gameEnded,
        correctFlagNames,
        stars: starCount
    };
    localStorage.setItem(dateKey, JSON.stringify(saveData));
}

function loadSave() {
    const rawData = localStorage.getItem(dateKey);
    if (rawData) {
        return JSON.parse(rawData);
    } else {
        return { ...defaultSave }
    }
}

// ALLTIME STATS /////////////////////////////////////////////////
function writeStats(stats) {
    localStorage.setItem("stats", JSON.stringify(stats));
}

function loadStats() {
    const rawStats = localStorage.getItem("stats");
    if (rawStats) {
        return JSON.parse(rawStats);
    } else {
        return { ...defaultStats }
    }
}

// UPDATING STATS ////////////////////////////////////////////////
function logGame(won) {
    const stats = loadStats();

    stats.totalPlayed++;
    if (won) {
        stats.totalWins++;
    }
    stats.history.push({
        date: dateKey,
        won,
        guessHistory,
        stars: starCount
    });

    writeStats(stats);
}

document.addEventListener("DOMContentLoaded", function() {

    //return;

    const save = loadSave();

    save.guessHistory.forEach(guess => {
        const savedCorrectNames = save.correctFlagNames;
        const isCorrect = savedCorrectNames.includes(guess);
        if (isCorrect) correctGuesses++;
        guessHistory.push(guess);
        renderGuess(guess, isCorrect);
    });

    starCount = save.stars;

    for (let i = 0; i < starCount; i ++) {
        const star = document.createElement("span");
        star.style.color = "gray";
        star.textContent = "★";
        star.style.fontSize = "3rem";
        star.style.webkitTextStroke = "1px black";
        star.style.transform = "rotate(10deg)";
        star.style.position = "relative";
        star.style.zIndex = 1 + starBar.children.length;
        starBar.prepend(star);
    }

    if (save.finished) {
        endGame();
    }
});