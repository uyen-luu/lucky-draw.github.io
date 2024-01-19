const ENTRANTS = `
01
02
03
04
05
06
07
08
09
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32`
  .trim()
  .split("\n");
const rollEl = document.querySelector(".roll");
const rollAgainEl = document.querySelector(".roll-again");
const namesEl = document.querySelector(".names");
const winnerEl = document.querySelector(".winner");

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