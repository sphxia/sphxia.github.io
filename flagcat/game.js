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

const guessHistory = [];

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

    

    guessHistory.push(guess);

    const entry = document.createElement("div");

    const correctFlagNames = [flag1.name.toLowerCase(), flag2.name.toLowerCase(), flag3.name.toLowerCase()];
    const isCorrect = correctFlagNames.includes(guess);

    entry.classList.add(isCorrect ? "guess-correct" : "guess-wrong");
    entry.textContent = guess;
    
    document.getElementById("guess-history").prepend(entry);

    document.getElementById("guess-input").value = "";
}

document.getElementById("guess-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        submitGuess();
    }
});


document.getElementById("guess-button").addEventListener("click", () => {
    submitGuess();
});