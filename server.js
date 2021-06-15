const express = require('express') // require the express package
const app = express() // initialize your express app instance
const weatherData = require('./data/weather.json')
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

app.use(cors()) // after you initialize your express app instance

const PORT = process.env.PORT;
const weatherBitKey = process.env.WEATHER_API_KEY;

// app.get('/weather',
// function (req, res) {
//   const theNewData=weatherData.data.map(value=>{
//     let editedData=new Weather(value);
//     console.log(editedData);
//     return editedData;
//   });
//   res.send(theNewData);
// })

app.get('/weather', (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
console.log(lat);
console.log(lon);

  if (lat && lon) {

    const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weatherBitKey}&lat=${lat}&lon=${lon}`
    axios.get(weatherBitUrl).then(response => {

      const responseData = response.data.data.map((obj) => new Weather(obj) );

      res.json(responseData)

    }).catch(error => {
      
      res.send(error.message)
    });

  }else {
    res.send('please provied the lon & lat')
  }
})


class Weather {
  constructor(obj) {
    this.description = obj.weather.description
    this.data = obj.valid_date
  }
}

// a server endpoint 
app.get('/', // our endpoint name
  function (req, res) { // callback function of what we should do with our request
    res.send('Hello World') // our endpoint function response
  })



app.listen(PORT) // kick start the express server to work



