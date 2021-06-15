const express = require('express') // require the express package
const app = express() // initialize your express app instance
const weatherData = require('./data/weather.json')

const cors = require('cors');
require('dotenv').config();

app.use(cors()) // after you initialize your express app instance

const PORT = process.env.PORT;


app.get('/weather',
function (req, res) {
  const theNewData=weatherData.data.map(value=>{
    let editedData=new Weather(value);
    console.log(editedData);
    return editedData;
  });
  res.send(theNewData);
})
class Weather{
  constructor(obj){
    this.description=obj.weather.description
    this.data=obj.valid_date
  }
}

// a server endpoint 
app.get('/', // our endpoint name
  function (req, res) { // callback function of what we should do with our request
    res.send('Hello World') // our endpoint function response
  })



app.listen(PORT) // kick start the express server to work



