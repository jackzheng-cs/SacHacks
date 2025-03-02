const symbols = [
    "🍎",
    "🍌",
    "🍒",
    "🍇",
    "🍉",
    "🍍",
    "🥝",
    "🍋",
    "🍊",
    "🍓",
    "🥥",
    "🌰",
    "🥑",
  ];
  let currentCards = [];
  let score = 0;
  let timeLeft = 60;
  let timer;
  
  // Pick two cards with exactly one matching symbol and total 7 symbols each
  function pickCards() {
    let match = symbols[Math.floor(Math.random() * symbols.length)];
    let uniqueSymbols = symbols.filter((s) => s !== match);
  
    let card1 = [match];
    let card2 = [match];
  
    // Add random symbols to card1 and card2, ensuring each has 7 symbols in total
    while (card1.length < 7) {
      let randomSymbol = uniqueSymbols.splice(
        Math.floor(Math.random() * uniqueSymbols.length),
        1
      )[0];
      card1.push(randomSymbol);
    }
  
    while (card2.length < 7) {
      let randomSymbol = uniqueSymbols.splice(
        Math.floor(Math.random() * uniqueSymbols.length),
        1
      )[0];
      card2.push(randomSymbol);
    }
  
    currentCards = [shuffleArray(card1), shuffleArray(card2)];
  }
  
  // Shuffle array function
  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  // Render cards in HTML
  function renderCards() {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";
    currentCards.forEach((card, index) => {
      let cardDiv = document.createElement("div");
      cardDiv.classList.add("card");
      card.forEach((symbol) => {
        let symbolDiv = document.createElement("div");
        symbolDiv.classList.add("symbol");
        symbolDiv.innerText = symbol;
        symbolDiv.addEventListener("click", () => checkMatch(symbol));
        cardDiv.appendChild(symbolDiv);
      });
      gameBoard.appendChild(cardDiv);
    });
    document.getElementById("score").innerText = `Score: ${score}`;
    document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;
  }
  
  // Check if clicked symbol is the match
  function checkMatch(symbol) {
    if (currentCards[0].includes(symbol) && currentCards[1].includes(symbol)) {
      score++;
      pickCards();
      renderCards();
    } else {
      alert("Try again!");
    }
  }
  
  // Start game timer
  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;
      if (timeLeft <= 0) {
        clearInterval(timer);
        alert(`Time's up! Your final score is: ${score}`);
      }
    }, 1000);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    pickCards();
    renderCards();
    startTimer();
  });