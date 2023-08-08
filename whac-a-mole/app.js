const squares = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score')

let result = 0
let hitPosition
let currentTime = 60
let timerId = null

function randomSquare() {
	squares.forEach(square => {
		square.classList.remove('mole')
	})

	let randomSquare = squares[Math.floor(Math.random()*9)]
	console.log(randomSquare)
	randomSquare.classList.add('mole')

	hitPosition = randomSquare.id
}



squares.forEach(square => {
	square.addEventListener('click', () => {
		if (square.id == hitPosition) {
			result++
			score.textContent = result
			hitPosition = null
		}
	})
})
function moveMole() {
	timerId = setInterval(randomSquare,800)
}

function countDown() {
	currentTime--
	timeLeft.textContent = currentTime

	if (currentTime == 0) {
		clearInterval (timer)
		clearInterval (timerId)
		alert('Game Over! Your final Score is : ' + result)
	}
}

let timer = setInterval(countDown, 1000)


moveMole()