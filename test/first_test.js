const chai = require('chai');
const assert = chai.assert;
const server = require('../index');
const request = require('supertest');

let app;

describe('loading express', () => {
    beforeEach((done) => {
        if (app) {
            return done();
        }
        server.then((_app) => {
            app = _app;
            done();
        });
    });

    afterEach((done) => {
        done();
    });

    it('wip responds to /allpokemons', testSlash = (done) => {
        request(app)
            .get('/allpokemons')
            .end((err, res) => {
                assert.equal(res.status, 200);
                console.log("body:", res.body);
                assert.lengthOf(res.body, 50);
                done();
            });
    });

    it('404 everything else', testPath = (done) => {
        request(app)
            .get('/wrongendpoint')
            .expect(404, done);
    });

    it('wip responds to /allpokemons with offset', testSlash = (done) => {
        request(app)
            .get('/allpokemons?offset=30')
            .end((err, res) => {
                assert.equal(res.status, 200);
                console.log("first id", res.body[0]);
                assert.equal(res.body[0].id, 31);
                done();
            });
    });

    it('wip responds to /allpokemons with wrong offset', testSlash = (done) => {
        request(app)
            .get('/allpokemons?offset=abd')
            .expect(404, done);
    });

    it('should return a pokemon with 1 type', (done) => {
        request(app)
            .get('/pokemons?type=Poison')
            .end((err, res) => {
                assert.equal(res.status, 200);
                done();
            });
    });

    it('wip responds to /pokemons with wrong type', testPath = (done) => {
        request(app)
            .get('/pokemons?type=Po')
            .expect(404, done);
    });

    it('wip responds to /pokemons with wrong number of type', testPath = (done) => {
        request(app)
            .get('/pokemon?type=Poison+Water')
            .expect(404, done);
    });

    it('should return a pokemon by id', (done) => {
        request(app)
            .get('/pokemons/1')
            .expect(200, done);
    });

});