const axios = require('axios');
const Weather = require('../models/weather.model');

const Cache = require('../helper/cache')
const cacheWeatherObj = new Cache();

const weatherBitKey = process.env.WEATHER_API_KEY;
require('dotenv').config();


const weatherController = (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
 
  const requstWeatheKey = `${lat}-${lon}`;

  if (lat && lon) {

    if (cacheWeatherObj[requstWeatheKey]  ) {


      res.json(cacheWeatherObj[requstWeatheKey])
    } else {

      const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weatherBitKey}&lat=${lat}&lon=${lon}`
      axios.get(weatherBitUrl).then(response => {

        const responseData = response.data.data.map((obj) => new Weather(obj));
        cacheWeatherObj[requstWeatheKey] =responseData;
        // cacheWeatherObj[requstWeatheKey].timestamp =Data.now();

        res.json(responseData)

      }).catch(error => {

        res.send(error.message)
      });

    }
  } else {
    res.send('please provied the lon & lat')
  }
}
module.exports = weatherController;