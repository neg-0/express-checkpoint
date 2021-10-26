const express = require('express')
const app = express();
const movies = require('./movies.json')
const morgan = require('morgan');
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.status(200).send()
})

app.get('/movies', (req, res) => {
    let search = req.query
    let title = search.title
    function isTitleMatch(movie) {
        return movie.title === title
    }
    let index = movies.findIndex(isTitleMatch)
    if (title) {
        res.status(200).json(movies[index])
    } else {
        res.status(200).json(movies)
    }
})

app.get('/movies/:id', (req, res) => {
    let id = +req.params.id
    let index = movies.findIndex(movie => parseInt(movie.movieId) === id)

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

app.post("/movies", (req, res) => {
    let newMovie = req.body

    movies.push(newMovie)

    res.status(201).json(newMovie)
})

app.delete("/movies/:id", (req, res) => {
    let id = +req.params.id

    if (isNaN(id)) {
        res.status(400).send("Invalid ID")
        return
    }

    let index = movies.findIndex((movie) => movie.movieId === id)

    if (index < 0) {
        res.status(404).send("Movie not found")
    }

    movies.splice(index, 1)

    res.status(200).send(`Deleted movie ${id}`)
})

app.post('/setCookie', (req, res) => {
    let firstName = req.body.firstName
    let lastName = req.body.lastName

    res.cookie("firstName", firstName)
    res.cookie("lastName", lastName)

    res.status(200).send(`Cookies have been set: ${firstName} ${lastName}`)
})

app.get('/readCookie', (req, res) => {
    res.status(200).send(`Your name is ${req.cookies.firstName} ${req.cookies.lastName}`)
})

module.exports = app;
