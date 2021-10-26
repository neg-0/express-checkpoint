const app = require('./app');
const request = require('supertest');
const movies = require('./movies.json');


describe('/movies', () => {
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

    it('returns movie by movie title', (done) => {
        let title = "Star Trek"
        request(app)
            .get(`/movies?title=${title}`)
            .expect(200)
            .expect(res => expect(res.body.title).toEqual(title))
            .end(done)
    })

    it('POSTS a movie at /movies. it sends a 201 status and the movie that was posted', (done) => {
        request(app)
            .post("/movies")
            .send(movies[10])
            .expect(201, movies[10])
            .end(done)
    });
});

describe('/movies/:id', () => {
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

    it('DELETES a movie at /movies/:id', (done) => {
        request(app)
            .delete("/movies/1")
            .expect(200)
            .end(done)
        request(app)
            .get("/movies/1")
            .expect(404)
            .end(done)
    });
});

describe('EATS THE COOKIES', () => {

    let agent

    beforeAll(() => {
        agent = request.agent(app)
    })

    it('sets the cookie', (done) => {
        let firstName = "Aaron"
        let lastName = "Gettemy"

        agent
            .post(`/setCookie`)
            .send({ firstName, lastName })
            .expect(200)
            .expect(`Cookies have been set: ${firstName} ${lastName}`)
            .expect('set-cookie', `firstName=${firstName}; Path=/,lastName=${lastName}; Path=/`, done)
    })

    it('sets the cookie', (done) => {
        let firstName = "Aaron"
        let lastName = "Gettemy"

        agent
            .get('/readCookie')
            .expect(200)
            .expect(`Your name is ${firstName} ${lastName}`, done)
    })
});
