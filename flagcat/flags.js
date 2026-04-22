const flags = [
    { name: "Japan", code: "jp", difficulty: 1 },
    { name: "Canada", code: "ca", difficulty: 1 },
    { name: "Bhutan", code: "bt", difficulty: 1 },
    { name: "China", code: "cn", difficulty: 1 },
    { name: "Brazil", code: "br", difficulty: 1 },
    { name: "Israel", code: "il", difficulty: 1 },
    { name: "Antarctica", code: "aq", difficulty: 1 },
    { name: "Nepal", code: "np", difficulty: 1 },
    { name: "Poland", code: "pl", difficulty: 1 },
    { name: "Russia", code: "ru", difficulty: 1 },
    { name: "Vietnam", code: "vn", difficulty: 1 },
    { name: "United States", code: "us", difficulty: 1 },
    { name: "United Kingdom", code: "gb", difficulty: 1 },
    { name: "Turkey", code: "tr", difficulty: 1 },
    { name: "France", code: "fr", difficulty: 1 },
    { name: "Australia", code: "au", difficulty: 1 },
    { name: "Austria", code: "at", difficulty: 1 },
]

function getFlag(code) {
    return `https://flagcdn.com/w320/${code}.png`;
}

const datalist = document.getElementById("flag-autocompletes");
flags.forEach(flag => {
    const option = document.createElement("option");
    option.value = flag.name;
    datalist.appendChild(option);
});