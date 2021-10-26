const express = require('express')
const app = express();
const movies = require('./movies.json')
const morgan = require('morgan');

app.use(express.json())
app.use(morgan('dev'))


app.get('/', (req, res) => {
    res.status(200).send()
})

app.get('/movies', (req, res) => {
    let search = req.query
    // console.log(search)
    res.status(200).json(movies)
})

app.get('/movies/:id', (req, res) => {
    let id = +req.params.id
    function isIdMatch(movie) {
        return movie.movieId === id
    }
    let index = movies.findIndex(isIdMatch)

    if (isNaN(id)) {
        res.status(400).send()
        return
    }

    if (index > -1) {
        res.status(200).send(movies[index])
    } else {
        res.status(404).send()
    }
})


//app.post()
module.exports = app;
