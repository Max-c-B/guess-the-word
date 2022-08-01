const guessedLetters = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
// console.log(button);
const letterInput = document.querySelector(".letter");
// console.log(letterInput);
const wordProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const spanDisplay = document.querySelector(".remaining span");
// console.log(spanDisplay);
const message = document.querySelector(".message");
// console.log(message);
const playAgainButton = document.querySelector(".play-again");
// console.log(playButton);
const word = "magnolia";

const placeholder = function (word) {
    const placeholderLetters = [];
    for(const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordProgress.innerText= placeholderLetters.join("");
};

placeholder(word);

guessLetterButton.addEventListener("click", function (e) {
e.preventDefault(); // stops form reloading.
const guess = letterInput.value;
console.log(guess);
letterInput.value = "";
});
