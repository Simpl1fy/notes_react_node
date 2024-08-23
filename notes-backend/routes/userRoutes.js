const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const conn = require('./../connection');

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

router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(102).json({"Error": "Please fill out all the information"})
        }
        const [rows] = await conn.query('select * from users where email = ?', [email]);
        // console.log(rows[0].password);
        if (rows.length === 0) {
            return res.status(300).json({"Error": "Please sign up first!"});
        }
        const hashedPassword = rows[0].password;
        console.log(password);
        console.log(hashedPassword);
        const bool = await bcrypt.compare(password, hashedPassword);
        console.log(bool);
        if(bool) {
            console.log("You have been logged in succesfully");
            return res.status(200).json({"Message": "You have been logged in succesfully!"});
        } else {
            return res.status(300).json({"Message": "Password does not match"});
        }
    } catch(err) {
        console.error(err);
        res.status(500).json({"Error": "Internal Server Error!"});
    }
})

module.exports = router;