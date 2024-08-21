const express = require('express');
const router = express.Router();

const conn = require('./../connection');

conn.getConnection((err, connection) => {
    if (err) {
        throw err;
        console.log("Could not connect to database");
    }
    console.log("Database connection has been secured");
})

router.post('/signup', async(req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // validate input
        if(!name || !email || !password) {
            return res.status(102).json({"Error": "Please fill out all the information"})
        }

        const checkUserAlreadyExists = 'select * from users where email = ?';
        conn.query(checkUserAlreadyExists, [email], (err, results) => {
            if(err) {
                console.error(err);
                res.status(500).json({Error: 'Internal Server Error'});
            }

            if (results.length > 0) {
                return res.status(409).json({Error: "User already exists"});
            }

            const insertUserQuery = 'insert into users (name, email, password) values (?,?,?)';
            conn.query(insertUserQuery, [name, email, password], (err, results) => {
                
            })
        })
    } catch(err) {
        console.error(err);
        res.status(500).json({Error: "Internal Server Error!"});
    }
})

module.exports = router;