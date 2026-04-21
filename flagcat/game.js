function getDailyFlags() {
    const today = new Date();
    const seed = today.getFullYear() * 10000 
        + (today.getMonth() + 1) * 100 
        + today.getDate();

    const index1 = Math.floor(seed / 10000) % flags.length;
    const index2 = Math.floor(seed / 100) % flags.length;
    const index3 = seed % flags.length;

    return [flags[index1], flags[index2], flags[index3]];
}

const [flag1, flag2, flag3] = getDailyFlags();

document.getElementById("flag1").src = `https://flagcdn.com/w320/${flag1.code}.png`;
document.getElementById("flag2").src = `https://flagcdn.com/w320/${flag2.code}.png`;
document.getElementById("flag3").src = `https://flagcdn.com/w320/${flag3.code}.png`;    