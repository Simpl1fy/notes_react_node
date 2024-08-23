const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

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
        const saltRounds=10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        // validate input
        if(!name || !email || !password) {
            return res.status(102).json({"Error": "Please fill out all the information"})
        }

        // const checkUserAlreadyExists = 'select * from users where email = ?';
        const [rows] = await conn.query('select * from users where email = ?', [email]);
        if (rows.length > 0) {
            res.status(409).json({"Error": "User Already Exists"});
        }

        await conn.query('insert into users (name, email, password) values (?,?,?)', [name, email, hashedPassword]);

        res.status(201).json({"Message": "User has been created"});
    } catch(err) {
        console.error(err);
        res.status(500).json({Error: "Internal Server Error!"});
    }
})

module.exports = router;