function generateEntrants(max) {
  const entrants = [];
  for (let i = 1; i <= max; i++) {
    // Add leading zero if the number is less than 10
    const entrant = i < 10 ? `0${i}` : `${i}`;
    entrants.push(entrant);
  }
  return entrants;
}
const DEFAULT_MAX_NUMBER = 40;
const maxNumber = !!localStorage.getItem('maxNumber') ? parseInt(localStorage.getItem('maxNumber')) : DEFAULT_MAX_NUMBER
const ENTRANTS = generateEntrants(maxNumber);
const rollEl = document.querySelector(".roll");
const rollAgainEl = document.querySelector(".roll-again");
const namesEl = document.querySelector(".names");
const winnerEl = document.querySelector(".winner");
console.log('Using localStorage.setItem(\'maxNumber\', newValue) and reload the page to reset the max number');
console.log('Current \'maxNumber\':' + maxNumber);

function randomName() {
  const rand = Math.floor(Math.random() * ENTRANTS.length);
  const name = ENTRANTS[rand];
  namesEl.innerText = name;
}

function rollClick() {
  rollEl.classList.add("hide");
  rollAgainEl.classList.add("hide");
  winnerEl.classList.add("hide");
  namesEl.classList.remove("hide");

  setDeceleratingTimeout(randomName, 10, 100);

  setTimeout(() => {
    namesEl.classList.add("hide");
    winnerEl.classList.remove("hide");
    rollAgainEl.classList.remove("hide");

    const winner = namesEl.innerText;
    winnerEl.innerText = winner;
    winnerEl.innerHTML = `<span>And the winner is...</span><br>${winner}`;
  }, 10000);
}

function setDeceleratingTimeout(callback, factor, times) {
  const internalCallback = ((t, counter) => {
    return () => {
      if (--t > 0) {
        setTimeout(internalCallback, ++counter * factor);
        callback();
      }
    };
  })(times, 0);

  setTimeout(internalCallback, factor);
}