const flags = [
    { name: "Japan", code: "jp", difficulty: 1 },
    { name: "Canada", code: "ca", difficulty: 1 },
    { name: "Bhutan", code: "bt", difficulty: 1 },
    { name: "China", code: "cn", difficulty: 1 },
    { name: "Brazil", code: "br", difficulty: 1 },
]

function getFlag(code) {
    return `https://flagcdn.com/w320/${code}.png`;
}