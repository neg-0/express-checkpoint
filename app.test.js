const app = require('./app');
const request = require('supertest');


describe('getting all movies from /movies', () => {
    it('returns a list of all our movies from movies.json', (done) => {
        request(app)
            .get('/movies')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res) => res.body.includes(
                { movieId: 1, title: "Guardians of the Galaxy Vol. 2", released: "05 May 2017", director: "James Gunn" }
            ))
            .expect(res => res.body.length > 0)
            .end(done)
    })

    it('get a movie by an ID', (done) => {
        request(app)
            .get('/movies/1')
            .expect(200)
            .expect((res) => res.body.includes(
                { movieId: 1, title: "Guardians of the Galaxy Vol. 2", released: "05 May 2017", director: "James Gunn" }
            ))
            .end(done)
    });


});