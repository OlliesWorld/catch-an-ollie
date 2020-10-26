const couches = document.querySelectorAll('.couch')
const scoreBoard = document.querySelector('.score')
const ollies = document.querySelectorAll('.ollie')
let lastCouch;
let timeUp = false;
let score = 0;
console.log(couches)

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomCouch(couches) {
    const index = Math.floor(Math.random() * couches.length);
    const couch = couches[index];

    //prevent same hole
    if (couch=== lastCouch) {
        return randomCouch(couches);
    }
    lastCouch = couch;
    return couch;
}

function peep() {
    const time = randomTime(700, 1000); //get randome time to determine how long mole should peep
    const couch = randomCouch(couches);
    couch.classList.add('up');
    setTimeout(() => {
        couch.classList.remove('up'); //mole down after random time
        if (!timeUp) {
            peep();
        }
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 20000) //show random moles for 15 seconds
}

function wack(e) {
    if (!e.isTrusted) return;
    score++;
    this.parentNode.classList.remove('up'); //refers to clicked item
    scoreBoard.textContent = score;
}

ollies.forEach(ollie => ollie.addEventListener('click', wack))