const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.key-container')
const messageDisplay = document.querySelector('.message-container')
let word

const getWordle = () => {
	fetch('http://localhost:8000/word')
		.then(response => response.json())
		.then(json => {
			console.log(json)
			word = json.toUpperCase()
		})
		.catch(err => console.log(err))
}

getWordle()

const keys = [
	'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '«',
]



const guessRows = [
	['','','','',''],
	['','','','',''],
	['','','','',''],
	['','','','',''],
	['','','','',''],
	['','','','','']
]


let currentRow = 0
let currentCol = 0
guessRows.forEach((guessRow,guessRowIndex) => {
	const rowElement = document.createElement('div')
	rowElement.setAttribute('id','guessRow-' + guessRowIndex)
	guessRow.forEach((guess,guessIndex) => {
		const tileElement = document.createElement('div')
		tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
		tileElement.setAttribute('class', 'tile')
		rowElement.append(tileElement)
	})
	tileDisplay.append(rowElement)
})

keys.forEach(key => {
	const buttonElement = document.createElement('button')
	buttonElement.textContent = key
	buttonElement.setAttribute('id', key)
	buttonElement.addEventListener('click', () => handleClick(key))
	keyboard.append(buttonElement)
})


const deleteLetter = () => {
	if (currentCol>0) {
		currentCol--
		const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentCol)
		tile.textContent = ''
		tile.removeAttribute('data')
		guessRows[currentRow][currentCol] = ''
	}
}

const checkEnter = () => {
	const guess = guessRows[currentRow].join('')
	console.log('guess ', guess)
	if (currentCol == 5) {
		// console.log('here')
		fetch (`http://localhost:8000/check/?word=${guess}`)
			.then(response => response.json())
			.then(json => {
				// console.log(json)
				// console.log('here')
				if (json == 'false') {
					showMessage('word not in list')
					return
				}
				else {
					console.log("guess is " + guess + " word is " + word)									
					flipTile()
					if (word == guess) {
						console.log('here')
						showMessage('Congratulations')

					}
					else if (currentRow>=5) {
						showMessage('Game Over')
					}
					else {
						currentRow++
						currentCol = 0
					}	
				}

			}).catch(err => console.log(err))

		
	}
}

const showMessage = (text) => {
	const message = document.createElement('p')
	message.textContent = text
	messageDisplay.append(message)
}

const handleClick = (letter) => {
	console.log('clicked')
	if (letter == '«') {
		deleteLetter()
		return
	}
	if (letter == 'ENTER') {
		checkEnter()
		return
	}
	addLetter(letter)
}


const addLetter = (letter) => {
	if (currentRow>=6 || currentCol>=5) {
		return
	}
	const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentCol)
	tile.textContent = letter
	tile.setAttribute('data', letter)
	guessRows[currentRow][currentCol] = letter
	console.log(guessRows)
	currentCol++
}

const colorKey = (keyColor, key) => {
	const k = document.getElementById(key)
	k.classList.add(keyColor)
}

const flipTile = () => {
	const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
	rowTiles.forEach((tile,index) => {
		let dataLetter = tile.getAttribute('data')
		if (dataLetter == word[index]) {
			colorKey('green-overlay',dataLetter)
		}
		else if (word.includes(dataLetter)) {
			colorKey('yellow-overlay',dataLetter)
		}
		else {
			colorKey('grey-overlay',dataLetter)
		}

	})
	rowTiles.forEach((tile,index) => {
		setTimeout (() => {
			console.log('here')
			tile.classList.add('flip')
			let dataLetter = tile.getAttribute('data')
			if (dataLetter == word[index]) {
				tile.classList.add('green-overlay')
				
			}
			else if (word.includes(dataLetter)) {
				tile.classList.add('yellow-overlay')
			}
			else {
				tile.classList.add('grey-overlay')
			}

		}, 500*index)
		
	})
}





