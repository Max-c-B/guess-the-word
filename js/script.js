const guessedLettersElement = document.querySelector(".guessed-letters");
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
const guessedLetters = [];


const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordProgress.innerText= placeholderLetters.join("");
};

placeholder(word);

guessLetterButton.addEventListener("click", function (e) {
e.preventDefault(); // stops form reloading.
message.innerText = "";
const guess = letterInput.value;
// console.log(guess);
const validate = letterValidate(guess);
if (validate) {
makeGuess(guess);
}
letterInput.value = "";
});

const letterValidate = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    message.innerText = "Enter a letter please!";
  } else if (input.length > 1) {
   message.innerText = "Enter only one letter please.";
  } else if (!input.match(acceptedLetter)) {
   message.innerText = "Enter a letter from A-Z!";
  } else {
    return input;
  }
};

const makeGuess = function (guess) {
 guess = guess.toUpperCase();
 if (guessedLetters.includes(guess)) {
    message.innerText = "You've alread guessed that letter, try again!"; 
 } else {
  guessedLetters.push(guess);
  console.log(guessedLetters);
  showGuessedLetters();
  updateWordInProgress(guessedLetters);
 } 
};

const showGuessedLetters = function () {
  guessedLettersElement.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
  }
};

const updateWordInProgress = function (guessedLetters) {
const wordUpper = word.toUpperCase();
const wordArray = wordUpper.split("");
const revealWord = [];
// console.log(wordArray);
for (const letter of wordArray) {
 if (guessedLetters.includes(letter)) {
  revealWord.push(letter.toUpperCase());
 } else {
    revealWord.push("●");
 }
}
//  console.log(revealWord);
wordProgress.innerText = revealWord.join("");
checkIfWin();
};

const checkIfWin = function() {
 if (word.toUpperCase() === updateWordInProgress.innerText) {
  message.classList.add("win");
  message.innerHTML = `<p class="highlight"> You guessed correct the word! Congrats!</p>`;
 }
};
