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
    const seed = today.getFullYear() * 10000 
        + (today.getMonth() + 1) * 100 
        + today.getDate();

    const index1 = Math.floor(seed / 10000) % flags.length;

    let index2 = Math.floor(seed / 100) % flags.length;
    while (index2 === index1) {
        index2 = (index2 + 7) % flags.length;
    }

    let index3 = seed % flags.length;
        while (index3 === index1 || index3 === index2) {
        index3 = (index3 + 7) % flags.length;
    }

    return [weightedPool[index1], weightedPool[index2], weightedPool[index3]];
}

const [flag1, flag2, flag3] = getDailyFlags();

document.getElementById("flag1").src = `https://flagcdn.com/w320/${flag1.code}.png`;
document.getElementById("flag2").src = `https://flagcdn.com/w320/${flag2.code}.png`;
document.getElementById("flag3").src = `https://flagcdn.com/w320/${flag3.code}.png`;    
    
const correctFlagNames = [flag1.name.toLowerCase(), flag2.name.toLowerCase(), flag3.name.toLowerCase()];

const guessHistory = [];

let correctGuesses = 0;

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

    const entry = document.createElement("div");

    const isCorrect = correctFlagNames.includes(guess);

    if (correctFlagNames.includes(guess)) {
        entry.classList.add("guess-correct");
        correctGuesses++;
    } else {
        entry.classList.add("guess-wrong");
    }
    
    const span = document.createElement("span");
    span.textContent = guess.charAt(0).toUpperCase() + guess.slice(1);;
    entry.appendChild(span);

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

    entry.style.flex = "1";

    guessBox.style.display = "flex";
    guessBox.style.gap = "8px";

    guessBox.appendChild(entry);
    guessBox.appendChild(img);

    document.getElementById("guess-history").prepend(guessBox);
    
    document.getElementById("guess-input").value = "";

    if (correctGuesses === 3) {
        endGame();
    }
}

function endGame() {
    if (correctGuesses === 3) {
        // HANDLE WIN //////////////////////////////////////////////////////////
        document.getElementById("status").textContent = "Holy moly you did it. You guessed my three flags!"
    } else {
        document.getElementById("status").textContent = "Hey you lost but that's okay"
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