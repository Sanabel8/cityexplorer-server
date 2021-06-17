const axios = require('axios');
const Movie = require('../models/movie.model')

const Cache = require('../helper/cache')
const cacheMovieObj = new Cache();
             
require('dotenv').config();
const movieKey = process.env.MOVIE_API_KEY;

const movieController = (req, res) => {
    let region = req.query.region;

    console.log(region);
    if (region) {
        if (cacheMovieObj[region] ) {
            res.json(cacheMovieObj[region])
        } else {

            region = region.slice(0, 2)
            const movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${movieKey}&region=${region}`

            axios.get(movieUrl).then((response) => {
                const modeledData = response.data.results.map((obj) => new Movie(obj));
                cacheMovieObj[region] = modeledData
                res.json(modeledData);
            }).catch((error) => {
                res.send(error.message)
            });
        }
    }
    else {
        res.send('please provide region as search query')
    }
}

module.exports = movieController;
