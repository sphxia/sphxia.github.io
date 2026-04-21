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

    return [flags[index1], flags[index2], flags[index3]];
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

    const flagNames = flags.map(flag => flag.name.toLowerCase());
    if (!flagNames.includes(guess)) {
        alert("Wtf not flag");
        return;
    }

    if (guessHistory.includes(guess)) {
        alert("Wtf same guess");
        return;
    }


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
    span.style.color = "#2B1B14"
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
        alert("Yoy did");
    } else {
        alert("Yoy didnt");
    }
}

document.getElementById("guess-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        submitGuess();
    }
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