const grid = document.querySelector('.grid')
const gridLength = 15
const resultDisplay = document.querySelector('.result')
for (let i=0; i<Math.pow(gridLength,2); i++) {
	const square = document.createElement('div')
	grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

let alienInvaders = []
const alienWide = 5
const alienHeight = 3

let t=Math.floor((gridLength-alienWide)/2)
for (let i=0; i<alienHeight; i++) {
	for (let j=0; j<alienWide; j++) {
		alienInvaders.push(t)
		t++
	}
	t+=gridLength-alienWide
}



let shooterIndex = 202

function drawInvaders() {
	for (let i=0; i<alienInvaders.length; i++) {
		squares[alienInvaders[i]].classList.add('invader')
	}
}

function removeInvaders() {
	for (let i=0; i<alienInvaders.length; i++) {
		squares[alienInvaders[i]].classList.remove('invader')
	}
}

let direction = 1

function moveInvaders() {
	//console.log('here')
	let leftEdge = false
	for (let i=0; i<alienInvaders.length; i++) {
		if (alienInvaders[i]%gridLength===0) {
			leftEdge=true
			break
		}
	}

	let rightEdge = false
	for (let i=0; i<alienInvaders.length; i++) {
		if (alienInvaders[i]%gridLength===gridLength-1) {
			rightEdge=true
			break
		}
	}
	
	removeInvaders()

	if (leftEdge && direction == -1) {
		for (let i=0; i<alienInvaders.length; i++) {
			alienInvaders[i]+=gridLength-1
		}
		direction = 1
	}
	if (rightEdge && direction == 1) {
		for (let i=0; i<alienInvaders.length; i++) {
			alienInvaders[i]+=gridLength+1
		}
		direction = -1
	}
	for (let i=0; i<alienInvaders.length; i++) {
		alienInvaders[i]+=direction
	}

	drawInvaders()

}


squares[shooterIndex].classList.add('shooter')

function moveShooter(e) {
	squares[shooterIndex].classList.remove('shooter')
	switch(e.key) {
		case 'ArrowLeft':
			if (shooterIndex%gridLength!==0) {
				shooterIndex-=1
			}
			break;

		case 'ArrowRight':
			if ((shooterIndex+1)%gridLength!==0) {
				shooterIndex+=1
			}
			break;
	}
	squares[shooterIndex].classList.add('shooter')
}

function checkStatus() {
	let outofBounds=false
	for (let i=0; i<alienInvaders.length; i++) {
		if (alienInvaders[i]+gridLength>Math.pow(gridLength,2)) {
			outofBounds=true
			break
		}
	}
	if (squares[shooterIndex].classList.contains('invader') || outofBounds) {
		resultDisplay.innerHTML = "YOU LOST"
		clearInterval(invadersId)
	}
	else if (alienInvaders.length == 0) {
		resultDisplay.innerHTML = "YOU WON"
		clearInterval(invadersId)
	}
	else {
		let count = alienWide * alienHeight - alienInvaders.length
		resultDisplay.innerHTML = "Score: " + count
	}
}


function shoot(e) {
	let laserId
	let currentLaserIndex = shooterIndex
	function moveLaser() {
		let destroy=false
		for (let i=0; i<alienInvaders.length; i++) {
			if (currentLaserIndex == alienInvaders[i]) {
				squares[alienInvaders[i]].classList.remove('invader')
				squares[alienInvaders[i]].classList.remove('laser')
				alienInvaders.splice(i,1)
				clearInterval(laserId)
				destroy=true
				break
			}
		}

		if (destroy) {
			return
		}


		squares[currentLaserIndex].classList.remove('laser')
		currentLaserIndex-=gridLength
		if (currentLaserIndex<0) {
			clearInterval(laserId)
			return
		}
		squares[currentLaserIndex].classList.add('laser')
	}
	switch(e.key) {
		case 'ArrowUp':
			laserId = setInterval(moveLaser,30)
			break
	}
	
}

document.addEventListener('keydown',moveShooter)
document.addEventListener('keydown',shoot)
invadersId = setInterval(function() {
	moveInvaders()
	checkStatus()
},120)






