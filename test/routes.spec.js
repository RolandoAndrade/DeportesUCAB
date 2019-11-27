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

describe('POST /api/v1/login', function() {
    it('Debe logear al usuario', function(done) {

        chai.request(server)
            .post('/api/v1/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({user: 'rolandoandrade@gmail.com',
                password: '12345678'})
            .end(function(err, res) {
                res.should.have.status(200);
                console.log(res.body)
                done();
            });
    });
    it('Error en autenticación', function(done) {

        chai.request(server)
            .post('/api/v1/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({user: 'rolandoandrade',
                password: '12345678'})
            .end(function(err, res) {
                res.should.have.status(401);
                console.log(res.body)
                done();
            });
    });
});

describe('GET /api/v1/teams/sports/:id', function() {
    it('Debe retornar todos los equipos pertenecientes a un deporte', function(done) {

        chai.request(server)
            .get('/api/v1/teams/sports/1')
            .end(function(err, res) {
                res.should.have.status(200);
                console.log(res.body)
                done();
            });
    });
});

describe('GET /api/v1/events', function() {
    it('Debe retornar todos los eventos', function(done) {

        chai.request(server)
            .get('/api/v1/events')
            .end(function(err, res) {
                res.should.have.status(200);
                console.log(res.body)
                done();
            });
    });
});

describe('GET /api/v1/events/:id/caracteristicas', function() {
    it('Debe retornar las caracteristicas del evento', function(done) {

        chai.request(server)
            .get('/api/v1/events/1/caracteristicas')
            .end(function(err, res) {
                res.should.have.status(200);
                console.log(res.body)
                done();
            });
    });
});

describe('GET /api/v1/events/:id/partidos', function() {
    it('Debe retornar las caracteristicas del evento', function(done) {

        chai.request(server)
            .get('/api/v1/events/1/partidos')
            .end(function(err, res) {
                res.should.have.status(200);
                console.log(res.body)
                done();
            });
    });
});

describe('GET /api/v1/events/:id/clasifiacion', function() {
    it('Retorna las clasificaciones del torneo', function(done) {

        chai.request(server)
            .get('/api/v1/events/1/clasificacion')
            .end(function(err, res) {
                res.should.have.status(200);
                console.log(res.body)
                done();
            });
    });
});

describe('GET /api/v1/events/:id/eliminatoria', function() {
    it('Retorna las eliminatorias del torneo', function(done) {

        chai.request(server)
            .get('/api/v1/events/1/eliminatoria')
            .end(function(err, res) {
                res.should.have.status(200);
                console.log(res.body)
                done();
            });
    });
});

describe('POST /api/v1/events', function() {
    it('Debe crear un evento y una competición', function(done) {

        chai.request(server)
            .post('/api/v1/events')
            .set('content-type', 'application/json')
            .send(
                {imagen: 'https://estaticos.muyinteresante.es/media/cache/760x570_thumb/uploads/images/article/55365e3c066de9087b6a5b4b/futbol7.jpg',
                nombre: 'Evento de API TEST',
                fechainicio: "2019-12-01",
                fechafin: "2019-12-31",
                lugar: "UCAB",
                    genero: 1,
                    caracteristicas: [
                        {titulo:"PRUEBA",descripcion:"Esto viene de una prueba unitaria",tipo:"info"},
                        {titulo:"UNITARIA",descripcion:"LAs pruebas ayudan a ver si furula",tipo:"pregunta"},
                        {titulo:"TIEMPO",descripcion:"Es cuestión de probar con tiempo",tipo:"tiempo"},
                        {titulo:"FECHA",descripcion:"Lorem ksjkab ipsum",tipo:"fecha"}]
                })
            .end(function(err, res) {
                res.should.have.status(200);
                console.log(res.body)
                done();
            });
    });
});