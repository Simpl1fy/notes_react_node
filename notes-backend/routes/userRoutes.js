const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const conn = require('./../connection');

const saltRounds=10;

router.post('/signup', async(req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // validate input
        if(!name || !email || !password) {
            return res.status(102).json({"Error": "Please fill out all the information"})
        }
        
        // const checkUserAlreadyExists = 'select * from users where email = ?';
        const [rows] = await conn.query('select * from users where email = ?', [email]);
        if (rows.length > 0) {
            return res.status(409).json({"Error": "User Already Exists"});
        }
        // hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // insert the data into the database
        await conn.query('insert into users (name, email, password) values (?,?,?)', [name, email, hashedPassword]);
        
        // return response
        return res.status(201).json({"Message": "User has been created"});
    } catch(err) {
        console.error(err);
        return res.status(500).json({Error: "Internal Server Error!"});
    }
})

router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;
        
        // checking for input
        if(!email || !password) {
            return res.status(400).json({"Error": "Please fill out all the information"})
        }

        // checking if the email exists or not
        const [rows] = await conn.query('select * from users where email = ?', [email]);
        // console.log(rows[0].password);
        if (rows.length === 0) {
            return res.status(404).json({"Error": "Please sign up first!"});
        }

        // hashed password
        const hashedPassword = rows[0].password;

        // comparing the input password with the hashed password
        const isMatch = await bcrypt.compare(password, hashedPassword);

        // false condition
        if(!isMatch) {
            return res.status(401).json({"Error": "Password does not match!"});
        }
        return res.status(200).json({"message": "You have been logged in!"});
    } catch(err) {
        console.error(err);
        res.status(500).json({"Error": "Internal Server Error!"});
    }
})

module.exports = router;