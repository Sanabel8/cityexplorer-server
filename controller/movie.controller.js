const axios = require('axios');
const Movie =require('../models/movie.model')
require('dotenv').config();
const movieKey = process.env.MOVIE_API_KEY;

const movieController = (req, res) => {
    let region = req.query.region;  
      
    console.log(region);
    if (region) {
        region = region.slice(0, 2)
        const movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${movieKey}&region=${region}`

        axios.get(movieUrl).then((response) => {
            const modeledData = response.data.results.map((obj) => new Movie(obj));
            res.json(modeledData);
        }).catch((error) => {
            res.send(error.message)
        });
    }
    else {
        res.send('please provide region as search query')
    }
}

module.exports = movieController; 
