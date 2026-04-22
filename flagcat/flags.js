const flags = [
    // THIS WAS AN ACT OF CLOD. WITH DIFFICULTY RATINGS WEIGHTING RECOGNIZEABILITY, NICHESSE, AND HOW EASY IT IS TO SEE THROUGH ANOTHER FLAG. GOOD CHARACTER DESIGN MAKES ICONIC SILHOUETTES
    { name: "Afghanistan", code: "af", difficulty: 3 },
    { name: "Albania", code: "al", difficulty: 2 }, // iconic black eagle on red, very distinctive
    { name: "Algeria", code: "dz", difficulty: 3 },
    { name: "Andorra", code: "ad", difficulty: 4 }, // similar to other vertical tricolors
    { name: "Angola", code: "ao", difficulty: 3 }, // distinctive machete/gear emblem
    { name: "Antigua and Barbuda", code: "ag", difficulty: 5 },
    { name: "Argentina", code: "ar", difficulty: 1 }, // very well known, distinctive sun
    { name: "Armenia", code: "am", difficulty: 4 }, // plain tricolor, easily confused
    { name: "Australia", code: "au", difficulty: 1 },
    { name: "Austria", code: "at", difficulty: 3 }, // plain red/white/red, confusable
    { name: "Azerbaijan", code: "az", difficulty: 4 },
    { name: "Bahamas", code: "bs", difficulty: 4 },
    { name: "Bahrain", code: "bh", difficulty: 3 }, // distinctive serrated edge
    { name: "Bangladesh", code: "bd", difficulty: 2 }, // simple, iconic off-center circle
    { name: "Barbados", code: "bb", difficulty: 3 },
    { name: "Belarus", code: "by", difficulty: 4 },
    { name: "Belgium", code: "be", difficulty: 2 },
    { name: "Belize", code: "bz", difficulty: 5 },
    { name: "Benin", code: "bj", difficulty: 4 },
    { name: "Bhutan", code: "bt", difficulty: 2 }, // unmistakable dragon, very distinctive
    { name: "Bolivia", code: "bo", difficulty: 3 },
    { name: "Bosnia and Herzegovina", code: "ba", difficulty: 3 }, // distinctive triangle + stars
    { name: "Botswana", code: "bw", difficulty: 4 },
    { name: "Brazil", code: "br", difficulty: 1 },
    { name: "Brunei", code: "bn", difficulty: 4 },
    { name: "Bulgaria", code: "bg", difficulty: 3 },
    { name: "Burkina Faso", code: "bf", difficulty: 4 },
    { name: "Burundi", code: "bi", difficulty: 5 },
    { name: "Cambodia", code: "kh", difficulty: 2 }, // Angkor Wat silhouette is unmistakable
    { name: "Cameroon", code: "cm", difficulty: 4 },
    { name: "Canada", code: "ca", difficulty: 1 },
    { name: "Cape Verde", code: "cv", difficulty: 5 },
    { name: "Central African Republic", code: "cf", difficulty: 5 },
    { name: "Chad", code: "td", difficulty: 5 }, // nearly identical to Romania
    { name: "Chile", code: "cl", difficulty: 3 },
    { name: "China", code: "cn", difficulty: 1 },
    { name: "Colombia", code: "co", difficulty: 3 },
    { name: "Comoros", code: "km", difficulty: 5 },
    { name: "Congo", code: "cg", difficulty: 4 },
    { name: "Democratic Republic of the Congo", code: "cd", difficulty: 4 },
    { name: "Costa Rica", code: "cr", difficulty: 3 },
    { name: "Croatia", code: "hr", difficulty: 3 }, // distinctive checkerboard coat of arms
    { name: "Cuba", code: "cu", difficulty: 2 },
    { name: "Cyprus", code: "cy", difficulty: 3 }, // unique island silhouette
    { name: "Czech Republic", code: "cz", difficulty: 3 },
    { name: "Denmark", code: "dk", difficulty: 2 },
    { name: "Djibouti", code: "dj", difficulty: 5 },
    { name: "Dominica", code: "dm", difficulty: 5 },
    { name: "Dominican Republic", code: "do", difficulty: 4 },
    { name: "Ecuador", code: "ec", difficulty: 3 },
    { name: "Egypt", code: "eg", difficulty: 3 },
    { name: "El Salvador", code: "sv", difficulty: 4 },
    { name: "Equatorial Guinea", code: "gq", difficulty: 5 },
    { name: "Eritrea", code: "er", difficulty: 4 },
    { name: "Estonia", code: "ee", difficulty: 3 },
    { name: "Eswatini", code: "sz", difficulty: 4 }, // distinctive shield and spears
    { name: "Ethiopia", code: "et", difficulty: 3 },
    { name: "Fiji", code: "fj", difficulty: 4 },
    { name: "Finland", code: "fi", difficulty: 2 },
    { name: "France", code: "fr", difficulty: 1 },
    { name: "Gabon", code: "ga", difficulty: 4 },
    { name: "Gambia", code: "gm", difficulty: 5 },
    { name: "Georgia", code: "ge", difficulty: 2 }, // very distinctive five-cross design
    { name: "Germany", code: "de", difficulty: 1 },
    { name: "Ghana", code: "gh", difficulty: 3 },
    { name: "Greece", code: "gr", difficulty: 2 },
    { name: "Grenada", code: "gd", difficulty: 5 },
    { name: "Guatemala", code: "gt", difficulty: 4 },
    { name: "Guinea", code: "gn", difficulty: 4 }, // plain tricolor, confusable
    { name: "Guinea-Bissau", code: "gw", difficulty: 5 },
    { name: "Guyana", code: "gy", difficulty: 4 }, // distinctive arrow design
    { name: "Haiti", code: "ht", difficulty: 4 },
    { name: "Honduras", code: "hn", difficulty: 4 },
    { name: "Hungary", code: "hu", difficulty: 3 },
    { name: "Iceland", code: "is", difficulty: 3 },
    { name: "India", code: "in", difficulty: 1 },
    { name: "Indonesia", code: "id", difficulty: 3 }, // similar to Monaco/Poland
    { name: "Iran", code: "ir", difficulty: 3 },
    { name: "Iraq", code: "iq", difficulty: 3 },
    { name: "Ireland", code: "ie", difficulty: 2 },
    { name: "Israel", code: "il", difficulty: 1 }, // CHANGED TO 1. CLOD DO YOU NOT KNOW
    { name: "Italy", code: "it", difficulty: 1 },
    { name: "Ivory Coast", code: "ci", difficulty: 4 }, // mirror of Ireland, confusable
    { name: "Jamaica", code: "jm", difficulty: 2 }, // very distinctive black X and gold/green
    { name: "Japan", code: "jp", difficulty: 1 },
    { name: "Jordan", code: "jo", difficulty: 4 },
    { name: "Kazakhstan", code: "kz", difficulty: 3 }, // distinctive sun and eagle on light blue
    { name: "Kenya", code: "ke", difficulty: 3 },
    { name: "Kiribati", code: "ki", difficulty: 5 },
    { name: "Kuwait", code: "kw", difficulty: 4 },
    { name: "Kyrgyzstan", code: "kg", difficulty: 4 }, // distinctive sun pattern but obscure
    { name: "Laos", code: "la", difficulty: 4 },
    { name: "Latvia", code: "lv", difficulty: 3 },
    { name: "Lebanon", code: "lb", difficulty: 3 }, // distinctive cedar tree
    { name: "Lesotho", code: "ls", difficulty: 5 },
    { name: "Liberia", code: "lr", difficulty: 4 },
    { name: "Libya", code: "ly", difficulty: 4 },
    { name: "Liechtenstein", code: "li", difficulty: 4 },
    { name: "Lithuania", code: "lt", difficulty: 3 },
    { name: "Luxembourg", code: "lu", difficulty: 4 }, // nearly identical to Netherlands
    { name: "Madagascar", code: "mg", difficulty: 4 },
    { name: "Malawi", code: "mw", difficulty: 5 },
    { name: "Malaysia", code: "my", difficulty: 2 },
    { name: "Maldives", code: "mv", difficulty: 4 },
    { name: "Mali", code: "ml", difficulty: 4 }, // plain tricolor, confusable
    { name: "Malta", code: "mt", difficulty: 4 },
    { name: "Marshall Islands", code: "mh", difficulty: 5 },
    { name: "Mauritania", code: "mr", difficulty: 5 },
    { name: "Mauritius", code: "mu", difficulty: 5 },
    { name: "Mexico", code: "mx", difficulty: 1 },
    { name: "Micronesia", code: "fm", difficulty: 5 },
    { name: "Moldova", code: "md", difficulty: 4 },
    { name: "Monaco", code: "mc", difficulty: 4 }, // similar to Indonesia/Poland
    { name: "Mongolia", code: "mn", difficulty: 4 }, // distinctive soyombo symbol
    { name: "Montenegro", code: "me", difficulty: 4 },
    { name: "Morocco", code: "ma", difficulty: 3 },
    { name: "Mozambique", code: "mz", difficulty: 3 }, // distinctive AK-47, very recognizable
    { name: "Myanmar", code: "mm", difficulty: 4 },
    { name: "Namibia", code: "na", difficulty: 4 },
    { name: "Nauru", code: "nr", difficulty: 5 },
    { name: "Nepal", code: "np", difficulty: 1 }, // only non-rectangular country flag, unmistakable
    { name: "Netherlands", code: "nl", difficulty: 2 },
    { name: "New Zealand", code: "nz", difficulty: 3 },
    { name: "Nicaragua", code: "ni", difficulty: 4 },
    { name: "Niger", code: "ne", difficulty: 4 },
    { name: "Nigeria", code: "ng", difficulty: 3 },
    { name: "North Korea", code: "kp", difficulty: 3 },
    { name: "North Macedonia", code: "mk", difficulty: 4 }, // distinctive sun rays
    { name: "Norway", code: "no", difficulty: 2 },
    { name: "Oman", code: "om", difficulty: 4 },
    { name: "Pakistan", code: "pk", difficulty: 2 },
    { name: "Palau", code: "pw", difficulty: 5 },
    { name: "Palestine", code: "ps", difficulty: 4 },
    { name: "Panama", code: "pa", difficulty: 4 },
    { name: "Papua New Guinea", code: "pg", difficulty: 3 }, // distinctive bird of paradise
    { name: "Paraguay", code: "py", difficulty: 4 },
    { name: "Peru", code: "pe", difficulty: 3 },
    { name: "Philippines", code: "ph", difficulty: 3 },
    { name: "Poland", code: "pl", difficulty: 2 },
    { name: "Portugal", code: "pt", difficulty: 2 },
    { name: "Qatar", code: "qa", difficulty: 3 }, // distinctive maroon serrated edge
    { name: "Romania", code: "ro", difficulty: 3 }, // nearly identical to Chad
    { name: "Russia", code: "ru", difficulty: 2 },
    { name: "Rwanda", code: "rw", difficulty: 5 },
    { name: "Saint Kitts and Nevis", code: "kn", difficulty: 5 },
    { name: "Saint Lucia", code: "lc", difficulty: 5 },
    { name: "Saint Vincent and the Grenadines", code: "vc", difficulty: 5 },
    { name: "Samoa", code: "ws", difficulty: 5 },
    { name: "San Marino", code: "sm", difficulty: 4 },
    { name: "Sao Tome and Principe", code: "st", difficulty: 5 },
    { name: "Saudi Arabia", code: "sa", difficulty: 2 }, // distinctive sword and text
    { name: "Senegal", code: "sn", difficulty: 4 },
    { name: "Serbia", code: "rs", difficulty: 3 },
    { name: "Seychelles", code: "sc", difficulty: 3 }, // radiating stripes are very distinctive
    { name: "Sierra Leone", code: "sl", difficulty: 5 },
    { name: "Singapore", code: "sg", difficulty: 3 },
    { name: "Slovakia", code: "sk", difficulty: 3 },
    { name: "Slovenia", code: "si", difficulty: 3 },
    { name: "Solomon Islands", code: "sb", difficulty: 5 },
    { name: "Somalia", code: "so", difficulty: 3 },
    { name: "South Africa", code: "za", difficulty: 2 }, // very distinctive Y design
    { name: "South Korea", code: "kr", difficulty: 2 },
    { name: "South Sudan", code: "ss", difficulty: 5 },
    { name: "Spain", code: "es", difficulty: 1 },
    { name: "Sri Lanka", code: "lk", difficulty: 3 }, // distinctive lion
    { name: "Sudan", code: "sd", difficulty: 4 },
    { name: "Suriname", code: "sr", difficulty: 5 },
    { name: "Sweden", code: "se", difficulty: 2 },
    { name: "Switzerland", code: "ch", difficulty: 2 }, // very distinctive square + white cross
    { name: "Syria", code: "sy", difficulty: 3 },
    { name: "Taiwan", code: "tw", difficulty: 3 },
    { name: "Tajikistan", code: "tj", difficulty: 5 },
    { name: "Tanzania", code: "tz", difficulty: 4 },
    { name: "Thailand", code: "th", difficulty: 2 },
    { name: "Timor-Leste", code: "tl", difficulty: 5 },
    { name: "Togo", code: "tg", difficulty: 4 },
    { name: "Tonga", code: "to", difficulty: 5 },
    { name: "Trinidad and Tobago", code: "tt", difficulty: 4 },
    { name: "Tunisia", code: "tn", difficulty: 3 },
    { name: "Turkey", code: "tr", difficulty: 2 },
    { name: "Turkmenistan", code: "tm", difficulty: 5 },
    { name: "Tuvalu", code: "tv", difficulty: 5 },
    { name: "Uganda", code: "ug", difficulty: 4 }, // distinctive crane bird
    { name: "Ukraine", code: "ua", difficulty: 2 },
    { name: "United Arab Emirates", code: "ae", difficulty: 3 },
    { name: "United Kingdom", code: "gb", difficulty: 1 },
    { name: "United States", code: "us", difficulty: 1 },
    { name: "Uruguay", code: "uy", difficulty: 4 },
    { name: "Uzbekistan", code: "uz", difficulty: 5 },
    { name: "Vanuatu", code: "vu", difficulty: 5 },
    { name: "Vatican City", code: "va", difficulty: 4 },
    { name: "Venezuela", code: "ve", difficulty: 3 },
    { name: "Vietnam", code: "vn", difficulty: 3 },
    { name: "Yemen", code: "ye", difficulty: 4 },
    { name: "Zambia", code: "zm", difficulty: 4 },
    { name: "Zimbabwe", code: "zw", difficulty: 4 },
    { name: "Antarctica", code: "aq", difficulty: 2 },
    { name: "Kosovo", code: "xk", difficulty: 4 },

    { name: "Puerto Rico", code: "pr", difficulty: 3 },
    { name: "Hong Kong", code: "hk", difficulty: 2 },
    { name: "Faroe Islands", code: "fo", difficulty: 5 },
    { name: "Greenland", code: "gl", difficulty: 3 },
    { name: "Macau", code: "mo", difficulty: 5 },
    { name: "Bermuda", code: "bm", difficulty: 4 },
    { name: "Gibraltar", code: "gi", difficulty: 5 },
    { name: "European Union", code: "eu", difficulty: 1 },
    { name: "United Nations", code: "un", difficulty: 2 },
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