const PORT = 8000
const axios = require("axios").default;
const express = require("express")
const cors = require("cors")
const app = express()


app.use(cors())
app.get('/word', (req,res) => {
	const options = {
	  method: 'GET',
	  url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
	  params: {count: '5', wordLength: '5'},
	  headers: {
	    'x-rapidapi-host': 'random-words5.p.rapidapi.com',
	    'x-rapidapi-key': 'd79990b291msh4671e4050f205d7p1d35bajsn29c714776a0d'
	  }
	};

	axios.request(options).then((response) => {
		console.log(response.data)
		res.json(response.data[0])
	}).catch((error) => {
		console.error(error);
	});
})

app.get('/check', (req,res) => {
	const word = req.query.word
	const options = {
	  method: 'GET',
	  url: 'https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary',
	  params: {entry: word},
	  headers: {
	    'x-rapidapi-host': 'dictionary-by-api-ninjas.p.rapidapi.com',
	    'x-rapidapi-key': 'd79990b291msh4671e4050f205d7p1d35bajsn29c714776a0d'
	  }
	}

	axios.request(options).then(response => {
		console.log(response.data)
		res.json(response.data.valid)
	}).catch(error => {
		console.error(error)
	});	
})

app.listen(PORT, () => console.log('server running on port '+ PORT))

