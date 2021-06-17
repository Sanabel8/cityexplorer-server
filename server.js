const express = require('express') 
const app = express() 


// const weatherData = require('./data/weather.json')

const cors = require('cors');
app.use(cors()) 

require('dotenv').config();
const PORT = process.env.PORT;

const weatherController = require('./controller/weather.controller')
const indexcontroller = require('./controller/index.controller')
const movieController = require('./controller/movie.controller')

app.get('/weather', weatherController)

app.get('/',indexcontroller)

app.get('/movie', movieController)

app.listen(PORT)



