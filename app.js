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
    let id = req.body.id
    function isIdMatch(movie) {
        return movie.movieId === id
    }
    let movie = movies.filter(isIdMatch)
    res.status(200).send(movie)
})


//app.post()
module.exports = app;

// let id = req.params.id
// let index = +id-1
// let author = authors[index]
// if (isNaN(index)){
//   res.status(400).send()
// }
// if (author){
//   res.status(200).json(author)
// } else {
//   res.status(404).send();
