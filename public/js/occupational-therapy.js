document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const homeBtn = document.getElementById("home-btn");
  const gameArea = document.getElementById("game-area");
  const gameDescription = document.getElementById("gameDescription");
  const wordBank = document.getElementById("word-bank");
  const questionLine = document.getElementById("questionLine");
  const buttonGroup = document.getElementById("buttonGroup");
  const sentenceContainer = document.getElementById("sentence");
  const cat = document.getElementById("gamecat");
  const sadcat = document.getElementById("sadcat");

  let questionIndex = 0;

  // Start the game
  startBtn.addEventListener("click", () => {
    loadNextQuestion();
    startBtn.textContent = "Submit";
    gameArea.style.display = "block"; // Show the game area
    if (gameDescription) gameDescription.style.display = "none"; // Hide game description
    homeBtn.textContent = "Skip";
    homeBtn.addEventListener("click", loadNextQuestion);
    questionLine.style.display = "flex";
    buttonGroup.style.width = "1224px";
  });

  // Word bank click event listener
  wordBank.addEventListener("click", (event) => {
    // Check if the clicked element has the class 'answer'
    if (event.target && event.target.classList.contains("answers")) {
      const selectedWord = event.target.dataset.word; // Get the word from the clicked element
      const blank = document.querySelector(".blank"); // Find the first blank in the sentence

      if (blank) {
        const correctAnswer = blank.dataset.answer; // Get the correct answer from the blank

        if (selectedWord === correctAnswer) {
          blank.textContent = selectedWord; // Correct answer, fill the blank
          blank.classList.remove("blank"); // Remove the blank class
          event.target.style.display = "none"; // Hide the used word from the word bank
          cat.style.display = "none";
          sadcat.style.display = "none";
          happycat.style.display = "block";
          alert("Correct answer!"); // Provide feedback for correct answer
        } else {
          event.target.style.display = "none";
          cat.style.display = "none";
          happycat.style.display = "none";
          sadcat.style.display = "block";
          alert("Try again!"); // Provide feedback for wrong answer
        }
      }
    }
  });

  // Function to load the next question
  function loadNextQuestion() {
    fetch(`/next/${questionIndex}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message); // Show "Game Over" message
        } else {
          sentenceContainer.innerHTML = data.sentence; // Insert the sentence with blanks
          loadWordBank(data.words); // Load word bank options
          applyBlankStyles(); // Apply styling to blanks

          questionIndex++;
        }
      });
  }

  // Load words into the word bank
  function loadWordBank(words) {
    const wordBank = document.getElementById("word-bank");
    wordBank.innerHTML = ""; // Clear existing words
    words.forEach((word) => {
      const wordElement = document.createElement("div");
      wordElement.classList.add("answers");
      wordElement.dataset.word = word;
      wordElement.innerHTML = `<h2>${word}</h2>`;
      wordBank.appendChild(wordElement);
    });
  }

  // Apply styles to blank elements
  function applyBlankStyles() {
    const blanks = document.querySelectorAll(".blank");
    blanks.forEach((blank) => {
      blank.style.border = "2px dashed #ccc"; // Reapply border style
      blank.style.backgroundColor = "#f0f0f0"; // Reapply background color
    });
  }
});
