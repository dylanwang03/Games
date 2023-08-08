const cardArray = [
	{
		name: 'cheeseburger',
		img: 'images/cheeseburger.png',
	},
	{
		name: 'fries',
		img: 'images/fries.png',
	},
	{
		name: 'hotdog',
		img: 'images/hotdog.png',
	},
	{
		name: 'ice-cream',
		img: 'images/ice-cream.png',
	},
	{
		name: 'milkshake',
		img: 'images/milkshake.png',
	},
	{
		name: 'pizza',
		img: 'images/pizza.png',
	},
	{
		name: 'cheeseburger',
		img: 'images/cheeseburger.png',
	},
	{
		name: 'fries',
		img: 'images/fries.png',
	},
	{
		name: 'hotdog',
		img: 'images/hotdog.png',
	},
	{
		name: 'ice-cream',
		img: 'images/ice-cream.png',
	},
	{
		name: 'milkshake',
		img: 'images/milkshake.png',
	},
	{
		name: 'pizza',
		img: 'images/pizza.png',
	}
]

cardArray.sort(() => 0.5 - Math.random())

const gridDisplay = document.querySelector('#grid')
let cardsChosen = []
let cardsChosenId = []
let cardsWon = []
const resultDisplay = document.querySelector('#result')

function createBoard() {
	for (let i=0; i<12; i++) {
		const card = document.createElement('img')
		card.setAttribute('src','images/blank.png')
		card.setAttribute('data-id', i)
		card.addEventListener('click',flipCard)
		
		gridDisplay.append(card)
	}
}

function checkMatch() {
	console.log("check for match")
	const cards = document.querySelectorAll('img')
	const optionOne=cardsChosenId[0]
	const optionTwo=cardsChosenId[1]

	if (optionOne === optionTwo) {
		alert('You have clicked the same image!')
		cards[optionOne].setAttribute('src','images/blank.png')
	}
	else if (cardsChosen[0] === cardsChosen[1]) {
		alert('You found a match!')
		cards[optionOne].setAttribute('src','images/white.png')
		cards[optionTwo].setAttribute('src','images/white.png')
		cards[optionOne].removeEventListener('click', flipCard)
		cards[optionTwo].removeEventListener('click', flipCard)
		cardsWon.push(cardsChosen)
	}
	else {
		cards[optionOne].setAttribute('src','images/blank.png')
		cards[optionTwo].setAttribute('src','images/blank.png')
	}
	cardsChosen = []
	cardsChosenId = []

	resultDisplay.textContent = cardsWon.length
	if (cardsWon.length === cardArray.length/2) {
		resultDisplay.textContent = 'Congratuations!'
	}
}

createBoard()

function flipCard() {
	const cardId = this.getAttribute('data-id')
	cardsChosen.push(cardArray[cardId].name)
	cardsChosenId.push(cardId)
	this.setAttribute('src',cardArray[cardId].img)
	if (cardsChosen.length === 2) {
		setTimeout ( checkMatch, 500)
	} 
	console.log(cardsChosen)
}









