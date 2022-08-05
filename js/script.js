const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
// console.log(button);
const letterInput = document.querySelector(".letter");
// console.log(letterInput);
const wordProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const spanDisplay = document.querySelector(".remaining span");
// console.log(spanDisplay);
const message = document.querySelector(".message");
// console.log(message);
const playAgainButton = document.querySelector(".play-again");
// console.log(playButton);

let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const data = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await data.text();
    // console.log(data);
    const wordArray = words.split("\n");
    // console.log(wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    // console.log(randomIndex);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

getWord();


const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordProgress.innerText= placeholderLetters.join("");
};



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
  guessesRemaining(guess);
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
// console.log(revealWord);
wordProgress.innerText = revealWord.join("");
checkIfWin();
};

guessesRemaining = function (guess) {
 const upperWord = word.toUpperCase();
 if (!upperWord.includes(guess)) {
  message.innerText = `Sorry, the word has no ${guess}`;
  remainingGuesses -= 1;
 } else {
  message.innerText = `Good guess! The word has the letter ${guess}.`;
 }

 if (remainingGuesses === 0) {
  message.innerHTML = `Game Over! the word was <span class="highlight">${word}</span>.`;
 } else if (remainingGuesses === 1) {
    spanDisplay.innerText = `${remainingGuesses} guess`;
 } else {
    spanDisplay.innerText = `${remainingGuesses} guesses`;
 }
};

const checkIfWin = function() {
 if (word.toUpperCase() === wordProgress.innerText) {
  message.classList.add("win");
  message.innerHTML = `<p class="highlight"> You guessed correct the word! Congrats!</p>`;
 }
};



