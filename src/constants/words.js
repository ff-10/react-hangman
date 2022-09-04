const WORDS = [
    "apple",
    "game",
    "about",
    "shop",
    "think",
    "win",
    "people",
    "rabbit",
    "fast",
    "orange",
    "first",
    "glass",
    "woman",
    "world",
    "trash",
    "gross",
    "pistol",
    "water",
    "bird"
];

function randomWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
}

export { randomWord };