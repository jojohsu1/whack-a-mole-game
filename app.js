let timeUp = true;
let score = 0;
let time = 20;

const $score = document.querySelector('#scores');
const $time = document.querySelector('#time-remaining');
const $moles = [...document.querySelectorAll('.mole')];
const $startBtn = document.querySelector('.startButton');

const setScore = s => {
    score = s
    $score.innerText = score
}

const status = $moles.reduce((prev, current, index) => {
    prev[index] = false;
    return prev;
}, {})

const clickHandler = function() {
    if (molesProxy[$moles.indexOf(this)]) {
        setScore(score + 1);
        molesProxy[$moles.indexOf(this)] = false;
    }
}



const molesProxy = new Proxy(status, {
    get(target, key) {
        return target[key];
    },
    set(target, key, value) {
        target[key] = value;
        $moles[key].removeEventListener('click', clickHandler);
        if (value) {
            $moles[key].addEventListener('click', clickHandler);
            $moles[key].classList.add('up');
        } else {
            $moles[key].classList.remove('up');
        }
    }
})

const render = _ => {
    const randomMole = Math.floor(Math.random() * $moles.length);
    const randomTime = Math.random() * 500 + 500;
    if (molesProxy[randomMole]) return render();
    molesProxy[randomMole] = true;
    setTimeout(_ => {
        if (!timeUp) render();
        molesProxy[randomMole] = false;
    }, randomTime)
}

const setCountDown = _ => {
    setInterval(_ => {
        if (time > 0) {
            time--
            $time.innerText = time;
        } else {
            timeUp = true;
            clearInterval()
        }
    }, 1000)
}

const startGame = _ => {
    timeUp = false;
    setScore(0);
    render();
    setCountDown();
}

$startBtn.addEventListener('click', startGame);