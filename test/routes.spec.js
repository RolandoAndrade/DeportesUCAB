process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../app');

chai.use(chaiHttp);


describe('GET /api/v1/usuarios', function() {
    it('Debe retornar todos los usuarios', function(done) {

        chai.request(server)
            .get('/api/v1/usuarios')
            .end(function(err, res) {
                res.should.have.status(200);
                console.log(res.body)
                done();
            });
    });
});