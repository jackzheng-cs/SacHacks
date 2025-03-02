document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const homeBtn = document.getElementById("home-btn");
  const gameArea = document.getElementById("game-area");
  const gameDescription = document.getElementById("gameDescription");
  const wordBank = document.getElementById("word-bank");

  let questionIndex = 1; // Start from the second question

  startBtn.addEventListener("click", () => {
    startBtn.textContent = "Submit";
    gameArea.style.display = "block"; // Show the game area
    // Ensure blank spaces have a visible placeholder

    if (gameDescription) gameDescription.style.display = "none"; // Hide game description

    // Make skip button load next question
    homeBtn.textContent = "Skip";
    homeBtn.addEventListener("click", loadNextQuestion);
  });

  wordBank.addEventListener("click", (event) => {
    if (event.target.classList.contains("draggable")) {
      const selectedWord = event.target.textContent;

      // Check if there are any blank spots left
      for (let blank of blanks) {
        if (!blank.textContent) {
          // If the blank is empty, fill it in
          blank.textContent = selectedWord;
          break; // Exit loop after filling the first blank
        }
      }
    }
  });

  function loadNextQuestion() {
    fetch(`/next/${questionIndex}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
        } else {
          // Insert sentence into DOM
          const sentenceContainer = document.getElementById("sentence");
          sentenceContainer.innerHTML = data.sentence;

          // Insert words into word bank
          const wordBank = document.getElementById("word-bank");
          wordBank.innerHTML = "";

          data.words.forEach((word) => {
            let newWord = document.createElement("div");
            newWord.classList.add("draggable");
            newWord.draggable = true;
            newWord.textContent = word;

            // Add event listeners for drag and drop
            newWord.addEventListener("dragstart", handleDragStart);
            newWord.addEventListener("dragend", handleDragEnd);

            wordBank.appendChild(newWord);
          });

          setupBlankAreas(); // Ensure blank areas are droppable

          questionIndex++;
        }
      });
  }
});
