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

module.exports = router;