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
                        {titulo:"FECHA",descripcion:"Lorem ksjkab ipsum",tipo:"fecha"}
                    ],
                    equipos: [
                        {id:1},{id:2},{id:3},{id:4}
                    ]
                })
            .end(function(err, res) {
                res.should.have.status(200);
                console.log(res.body)
                done();
            });
    });
});

describe('POST /api/v1/phases', function() {
    it('Debe crear una fase de un evento', function(done) {

        chai.request(server)
            .post('/api/v1/phases')
            .set('content-type', 'application/json')
            .send(
                {
                    nombre: 'GRUPO B',
                    tipo: 'clasificacion',
                    evento: 1
                })
            .end(function(err, res) {
                res.should.have.status(200);
                console.log(res.body)
                done();
            });
    });
});

describe('GET /api/v1/phases/:id/matches?tipo=', function() {
    it('Retorna los partidos de una fase', function(done) {

        chai.request(server)
            .get('/api/v1/phases/1/matches?tipo=clasificacion')
            .end(function(err, res) {
                res.should.have.status(200);
                console.log(res.body)
                done();
            });
    });
});

describe('GET /api/v1/events/:id/phases', function() {
    it('Retorna las fases del evento', function(done) {

        chai.request(server)
            .get('/api/v1/events/1/phases')
            .end(function(err, res) {
                res.should.have.status(200);
                console.log(res.body)
                done();
            });
    });
});

describe('POST /api/v1/phases/delete', function() {
    it('Debe eliminar una fase de un evento', function(done) {

        chai.request(server)
            .post('/api/v1/phases/delete')
            .set('content-type', 'application/json')
            .send(
                {
                    fase: 1,
                    tipo: 'clasificacion'
                })
            .end(function(err, res) {
                res.should.have.status(200);
                console.log(res.body)
                done();
            });
    });
});

describe('GET /api/v1/teams/events/:id', function() {
    it('Retorna los participantes del torneo', function(done) {
        chai.request(server)
            .get('/api/v1/teams/events/2')
            .end(function(err, res) {
                res.should.have.status(200);
                console.log(res.body)
                done();
            });
    });
});

describe('GET /users/:id', function() {
    it('Retorna la información del jugador', function(done) {
        chai.request(server)
            .get('/api/v1/users/1')
            .end(function(err, res) {
                res.should.have.status(200);
                console.log(res.body)
                done();
            });
    });
});

describe('POST /api/v1/matches/delete', function() {
    it('Debe eliminar un partido', function(done) {

        chai.request(server)
            .post('/api/v1/matches/delete')
            .set('content-type', 'application/json')
            .send(
                {
                    partido: 1
                })
            .end(function(err, res) {
                res.should.have.status(200);
                console.log(res.body)
                done();
            });
    });
});

describe('GET /api/v1/events/:id', function() {
    it('Retorna los datos del torneo', function(done) {
        chai.request(server)
            .get('/api/v1/events/1')
            .end(function(err, res) {
                res.should.have.status(200);
                console.log(res.body)
                done();
            });
    });
});

describe('GET /api/v1/players/events/:id', function() {
    it('Retorna los jugadores en evento', function(done) {
        chai.request(server)
            .get('/api/v1/players/events/1')
            .end(function(err, res) {
                res.should.have.status(200);
                console.log(res.body)
                done();
            });
    });
});

describe('GET /api/v1/events/stats/:id', function() {
    it('Retorna las estadísticas del evento', function(done) {
        chai.request(server)
            .get('/api/v1/events/stats/1')
            .end(function(err, res) {
                res.should.have.status(200);
                console.log(res.body)
                done();
            });
    });
});

describe('GET /api/v1/matches/:id', function() {
    it('Retorna las situaciones del partido', function(done) {
        chai.request(server)
            .get('/api/v1/matches/1')
            .end(function(err, res) {
                res.should.have.status(200);
                console.log(res.body)
                done();
            });
    });
});

describe('GET /api/v1/players/teams/:id', function() {
    it('Retorna los jugadores del equipo', function(done) {
        chai.request(server)
            .get('/api/v1/players/teams/1')
            .end(function(err, res) {
                res.should.have.status(200);
                console.log(res.body)
                done();
            });
    });
});

describe('POST /api/v1/situations', function() {
    it('Debe asignar una situación a un partido', function(done) {

        chai.request(server)
            .post('/api/v1/situations')
            .set('content-type', 'application/json')
            .send(
                {
                    partido: 1,
                    minuto: 55,
                    tipo: 'gol',
                    goleador: 2
                })
            .end(function(err, res) {
                res.should.have.status(200);
                console.log(res.body)
                done();
            });
    });
});

describe('GET /api/v1/teams', function() {
    it('Retorna todos los equipos', function(done) {
        chai.request(server)
            .get('/api/v1/teams')
            .end(function(err, res) {
                res.should.have.status(200);
                console.log(res.body)
                done();
            });
    });
});

describe('GET /api/v1/matches/teams/:id', function() {
    it('Retorna todos los partidos del equipo', function(done) {
        chai.request(server)
            .get('/api/v1/matches/teams/1')
            .end(function(err, res) {
                res.should.have.status(200);
                console.log(res.body)
                done();
            });
    });
});