const express = require('express');
const router = express.Router();

const { Client } = require('pg');
const connectionString = 'postgres://postgres:password@localhost:5432/deportesucab';

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



module.exports = router;