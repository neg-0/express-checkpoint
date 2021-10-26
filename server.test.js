const app = require('./app')
const request = require('supertest');

test('GET /', (done) => {
    request(app)
        .get('/')
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            done()
        })
});