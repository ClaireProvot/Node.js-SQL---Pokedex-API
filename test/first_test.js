const chai = require('chai');
const assert = chai.assert;
const server = require('../index');
const request = require('supertest');
const db = require('../models/index');

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

    
    it('should create a new pokemon', testSlash = (done) => {
        let body = {
            base: 'base',
            cname: 'cname',
            ename: 'ename',
            id_pokemon: '800',
            jname: 'jname',
            type1: 'Poison', 
            type2: 'Water',
        };
        request(app)
            .post('/pokemons/800')
            .send(body)
            .expect(201)
            .expect(res => {
                console.log(res.body);
                assert.equal(res.body.base, 'base')
                assert.equal(res.body.id_pokemon, '800')
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                done()
            })
    })
    

    it('should not create pokemon with invalid data body', testPath = (done) => {
        request(app)
            .post('/pokemon/800')
            .send({})
            .expect(404)
            .end((err, res) => {
                if (err) {
                  return done(err)
                }
                done();
            })
    });

    it('should not create pokemon with invalid id', testPath = (done) => {
        let body = {
            base: 'base',
            cname: 'cname',
            ename: 'ename',
            id_pokemon: 'abc',
            jname: 'jname',
            type1: 'Poison', 
            type2: 'Water',
        };
        request(app)
            .post('/pokemon/abc')
            .send({body})
            .expect(404)
            .end((err, res) => {
                if (err) {
                  return done(err)
                }
                done();
            })
    });

    it('should get all pokemons with offset and limit 50', done => {
        request(app)
          .get('allpokemons?offset=30')
          .expect(200, res => {
            console.log("first id", res.body[0].id_pokemon);
            assert.equal(res.body[0].id_pokemon, 31);
            assert.lengthOf(res.body, 50, 'array has length of 50');
          })
          .end(done())
      });

    it('should return pokemons with 1 type', (done) => {
    request(app)
        .get('/pokemons?type=Water')
        .expect(200)
        .expect(res => {
            console.log('Type is:', res.body[0].Types[0].ename)
            assert.equal(res.body[0].Types[0].ename, 'Water')
        })
        .end((err, res) => {
            if (err) {
              return done(err)
            }
            done();
        })
    });

    it('should return one pokemon by id', done => {
    request(app)
        .get(`/pokemons?id=001`)
        .expect(200)
        .expect(res => {
            assert.equal(res.body.id_pokemon, 1)
        })
        .end((err, res) => {
            if (err) {
              return done(err)
            }
            done();
        })
    });

    it('should return one pokemon by name', done => {
        request(app)
            .get(`/pokemons?name=Ivysaur`)
            .expect(200)
            .expect(res => {
                assert.equal(res.body.ename, 'Ivysaur')
            })
            .end((err, res) => {
                if (err) {
                  return done(err)
                }
                done();
            })
        });

    it('wip responds to /allpokemons with wrong offset', testSlash = (done) => {
        request(app)
            .get('/allpokemons?offset=abd')
            .expect(404, done);
    });

    it('should return null for an incorrect id', testSlash = (done) => {
        request(app)
          .get(`/pokemons?id=foo`)
          .expect(200)
          .expect(res => {
            assert.equal(res.send, null);
            console.log('response :', res.send);
        })
          .end(done)
      })

    it('should return null for an incorrect name', testSlash = (done) => {
        request(app)
        .get(`/pokemons?name=foo`)
        .expect(200)
        .expect(res => {
            assert.equal(res.send, null);
            console.log('response :', res.send);
        })
        .end(done)
    })
    
    it('should return null for an incorrect type', testSlash = (done) => {
        request(app)
          .get(`/pokemons?type=fes`)
          .expect(200)
          .expect(res => {
            assert.equal(res.send, null);
            console.log('response :', res.send);
        })
          .end(done)
      })

    it('should remove a pokemon', testSlash = (done) => {
    let hexId = 001;
    request(app)
        .delete(`/pokemons/${hexId}`)
        .expect(200)
        .end(done)
    })

    
    it('should not remove a pokemon with wrong number', testSlash = (done) => {
        let hexId = 'fes';
        request(app)
            .delete(`/pokemons/${hexId}`)
            .expect(404)
            .end((err, res) => {
            if (err) {
                return done(err)
            }
            console.log(res.send)
            db.Pokemons.findOne({
                where: {
                    id_pokemon: hexId,
                }
            }).then(p => {
                    assert.notExists(p)
                    done()
            }).catch(err => done(err))
            })
        })
});