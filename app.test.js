const app = require('./app');
const request = require('supertest');


describe('getting all movies from /movies', () => {
    it('returns a list of all our movies from movies.json', (done) => {
        request(app)
            .get('/movies')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res) => {
                if (!res.body.length > 0) throw new Error(`Didn't receive list of movies`)
            })
            .expect(res => res.body.length > 0)
            .end(done)
    })

    it('get a movie by an ID', (done) => {
        let id = 1
        request(app)
            .get(`/movies/${id}`)
            .expect(200)
            .expect(res => { if (res.body.movieId !== id) throw new Error(`Didn't receive json with 'id' ${id}`) })
            .end(done)
    });


    it('returns a 404 if movie isnt found', (done) => {
        request(app)
            .get('/movies/1000000088888')
            .expect(404)
            .end(done)
    })

    it('it returns a 400 if invalid ID supplied', (done) => {
        request(app)
            .get('/movies/dfjvhdfhvdv')
            .expect(400)
            .end(done)
    })

});