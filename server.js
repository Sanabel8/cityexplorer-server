const express = require('express') // require the express package
const app = express() // initialize your express app instance
const weatherData = require('./data/weather.json')

const cors = require('cors');
require('dotenv').config();

app.use(cors()) // after you initialize your express app instance

const PORT = process.env.PORT;

app.get('/weather', // our endpoint name
  function (req, res) { // callback function of what we should do with our request
    const newData = weatherData.data.map(value => {
      return new Weather(value);
    })

    res.json(newData) // our endpoint function response
  })


class Weather {
  constructor(obj) {
    this.desecription =obj.weather.desecription;
      this.date = obj.valid_date;
  }
}

// a server endpoint 
app.get('/', // our endpoint name
  function (req, res) { // callback function of what we should do with our request
    res.send('Hello World') // our endpoint function response
  })



app.listen(PORT) // kick start the express server to work



