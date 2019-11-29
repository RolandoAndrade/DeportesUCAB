const express = require('express');
const router = express.Router();

const { Client } = require('pg');

const connectionString = 'postgres://postgres:password@localhost:5432/deportesucab';

//const connectionString = 'postgres://guardubqhvsnax:e9a24548de114affef5c3d892db1e11f5ef3548b115fef6782393cd73cd79259@ec2-54-227-249-202.compute-1.amazonaws.com:5432/d9ei7k0ds5ging?ssl=true';
const client = new Client({
    connectionString: connectionString
});

client.connect();

/* GET users listing. */
router.get('/usuarios', function(req, res, next) {
    client.query('SELECT * FROM usuario',0,(err, result)=>{
        if(err)
        {
            res.status(500)
                .json({
                    status: 'error',
                    data: err
                });
        }
        else
        {
            res.status(200)
                .json({
                    status: 'success',
                    data: result.rows
                });
        }
    })
});

router.post('/login',function (req, res, next)
{
    client.query('SELECT * FROM login($1,$2)',[req.body.user,req.body.password],(err, result)=>{
        if(err)
        {
            console.log(err)
            res.status(500).json(
            {
                status: 'error',
                data: err
            });
        }
        else
        {
            if(result.rows.length>0)
            {
                res.cookie("user_id",result.rows[0].id);
                res.status(200).json({
                    status: 'success',
                    data: result.rows
                });

            }
            else
            {
                res.status(401).json({
                    status: 'error',
                    data: ["Usuario o contraseña incorrectos"]
                });
            }

        }
    })
});

router.get('/teams/sports/:id(\\d+)',function (req, res, next)
{
    client.query('SELECT * FROM getteamsbydeporte($1)',[req.params.id],(err, result)=>{
        if(err)
        {
            console.log(err)
            res.status(500).json(
                {
                    status: 'error',
                    data: err
                });
        }
        else
        {
            if(result.rows.length>0)
            {
                res.status(200).json({
                    status: 'success',
                    data: result.rows
                });

            }
        }
    })
});


router.get('/events',function (req, res, next)
{
    client.query('SELECT * FROM getEvents()',0,(err, result)=>{
        if(err)
        {
            console.log(err)
            res.status(500).json(
                {
                    status: 'error',
                    data: err
                });
        }
        else
        {
            if(result.rows.length>0)
            {
                res.status(200).json({
                    status: 'success',
                    data: result.rows
                });

            }
        }
    })
});

router.get('/events/:id(\\d+)/caracteristicas',function (req, res, next)
{
    client.query('SELECT * FROM getEventCaracteristica($1)',[req.params.id],(err, result)=>{
        if(err)
        {
            console.log(err)
            res.status(500).json(
                {
                    status: 'error',
                    data: err
                });
        }
        else
        {
            if(result.rows.length>0)
            {
                res.status(200).json({
                    status: 'success',
                    data: result.rows
                });

            }
        }
    })
});

router.get('/events/:id(\\d+)/partidos',function (req, res, next)
{
    client.query('SELECT * FROM getPartidos($1)',[req.params.id],(err, result)=>{
        if(err)
        {
            console.log(err)
            res.status(500).json(
                {
                    status: 'error',
                    data: err
                });
        }
        else
        {
            if(result.rows.length>0)
            {
                res.status(200).json({
                    status: 'success',
                    data: result.rows
                });

            }
        }
    })
});

router.get('/events/:id(\\d+)/clasificacion',function (req, res, next)
{
    client.query('SELECT * FROM getclasificaciondeequipos($1)',[req.params.id],(err, result)=>{
        if(err)
        {
            console.log(err)
            res.status(500).json(
                {
                    status: 'error',
                    data: err
                });
        }
        else
        {
            if(result.rows.length>0)
            {
                res.status(200).json({
                    status: 'success',
                    data: result.rows
                });

            }
        }
    })
});

router.get('/events/:id(\\d+)/eliminatoria',function (req, res, next)
{
    client.query('SELECT * FROM geteliminatorias($1)',[req.params.id],(err, result)=>{
        if(err)
        {
            console.log(err)
            res.status(500).json(
                {
                    status: 'error',
                    data: err
                });
        }
        else
        {
            if(result.rows.length>0)
            {
                res.status(200).json({
                    status: 'success',
                    data: result.rows
                });

            }
        }
    })
});

router.post('/events',function (req, res, next)
{
    console.log(req.body)
    client.query('SELECT insertarcompeticion($1,$2,$3,$4,$5,$6)',[
        req.body.imagen,req.body.nombre, req.body.fechainicio, req.body.fechafin,
        req.body.lugar,req.body.genero],(err, result)=>{
        if(err)
        {
            console.log(err)
            res.status(500).json(
                {
                    status: 'error',
                    data: err
                });
        }
        else
        {
            let eventoid = result.rows[0].insertarcompeticion;
            req.body.caracteristicas.forEach(async (i)=>
            {
                await client.query('SELECT insertarCaracteristica($1,$2,$3,$4)',
                    [eventoid,i.titulo, i.descripcion, i.tipo],
                    null)
            });
            req.body.equipos.forEach(async (i)=>
            {
                await client.query('SELECT insertarparticipantes($1,$2)',
                    [i.id, eventoid],
                    null)
            });


            res.status(200).json({
                status: 'success',
                data: eventoid
            });
        }
    })
});


router.post('/phases',function (req, res, next)
{
    console.log(req.body)
    client.query('SELECT insertarFase($1,$2,$3)',[
        req.body.evento,req.body.tipo, req.body.nombre],(err, result)=>{
        if(err)
        {
            console.log(err)
            res.status(500).json(
                {
                    status: 'error',
                    data: err
                });
        }
        else
        {
            res.status(200).json({
                status: 'success',
                data: result.rows[0].insertarfase
            });
        }
    })
});

router.post('/phases/:id(\\d+)/matches',function (req, res, next)
{
    console.log(req.body)

    client.query('SELECT insertarpartido($1,$2,$3,$4,$5,$6,$7)',[
        req.body.fase,req.body.tipo,req.body.nombre,req.body.local,
        req.body.visitante,req.body.lugar, req.body.fecha ],(err, result)=>{
        if(err)
        {
            console.log(err)
            res.status(500).json(
                {
                    status: 'error',
                    data: err
                });
        }
        else
        {
            res.status(200).json({
                status: 'success',
                data: result.rows[0].insertarpartido
            });
        }
    })
});

router.get('/phases/:id(\\d+)/matches',function (req, res, next)
{
    client.query('SELECT * FROM getpart($1)',[req.params.id],(err, result)=>{
        if(err)
        {
            console.log(err)
            res.status(500).json(
                {
                    status: 'error',
                    data: err
                });
        }
        else
        {
            if(result.rows.length>0)
            {
                res.status(200).json({
                    status: 'success',
                    data: result.rows
                });

            }
        }
    })
});


module.exports = router;