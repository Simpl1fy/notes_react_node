const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const conn = require('./../connection');
const { generateToken, jwtAuthMiddleware } = require('./../jwt');

const saltRounds=10;

router.post('/signup', async(req, res) => {
    try {
        console.log('/signup was accessed')
        const { name, email, password } = req.body;
        
        // validate input
        if(!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill out all the fields"
            })
        }
        
        // const checkUserAlreadyExists = 'select * from users where email = ?';
        const [rows] = await conn.query('select * from users where email = ?', [email]);
        if (rows.length > 0) {
            return res.status(200).json({
                success: false,
                message: "User already exists"
            });
        }
        // hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // insert the data into the database
        const response = await conn.query('insert into users (name, email, password) values (?,?,?)', [name, email,  hashedPassword]);
        const userId = response.insertId;

        const payload = {
            id: userId
        }
        const generatedToken = generateToken(payload);
        console.log(`Token has been generated = ${generatedToken}`);

        
        // return response
        return res.status(201).json({
            success: true,
            message: "You have signed up",
            token: generatedToken
        });
    } catch(err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: err.message
        });
    }
})

router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;
        
        // checking for input
        if(!email || !password) {
            return res.status(102).json({
                success: false,
                message: "Please fill out all the information"
            })
        }

        // checking if the email exists or not
        const [rows] = await conn.query('select * from users where email = ?', [email]);
        console.log(rows.password);
        if (rows.length === 0) {
            return res.status(200).json({
                success: false,
                message: "Please sign up first!"
            });
        }
        // console.log(rows[0].id)

        // hashed password
        const hashedPassword = rows[0].password;

        // comparing the input password with the hashed password
        const isMatch = await bcrypt.compare(password, hashedPassword);

        // false condition
        if(!isMatch) {
            return res.status(200).json({
                success: false,
                message: "Incorrect Password"
            });
        } else {
            const userId = rows[0].id;
            const payload = {
                id: userId
            }
            const generatedToken = generateToken(payload);
            console.log(`Token has been generated = ${generatedToken}`);

            return res.status(200).json({
                success: true,
                message: "You have been logged in!",
                token: generatedToken
            });
        }        
    } catch(err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: err.message
        });
    }
})

// route to update email
router.put('/update/email', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.jwtPayload.id;
        const { email } = req.body;
        const [response] = await conn.query('update users set email=? where id=?', [email, userId]);
        console.log(response)
        if(response.affectedRows === 1) {
            return res.status(200).json({
                success: true,
                message: "Email has been updated successfully"
            });
        } else {
            return res.status(200).json({
                success: false,
                message: "Email could not be updated, Try again later"
            })
        }
    } catch(err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
})


// route for updating password
router.put('/update/password', jwtAuthMiddleware, async(req, res) => {
    try {
        const userId = req.jwtPayload.id;
        const { password } = req.body;
        const hashedPassword =await bcrypt.hash(password, saltRounds);
        const [response] = await conn.query('update users set password=? where id=?', [hashedPassword, userId]);
        if(response.affectedRows === 1) {
            return res.status(200).json({
                success: true,
                message: "Password has been updated successfully"
            })
        } else {
            return res.status(200).json({
                success: false,
                message: "Password could not be updated"
            })
        }
    } catch(err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

router.get('/profile', jwtAuthMiddleware, async(req, res) => {
    try {
        const user_id = req.jwtPayload.id;
        if(!user_id) {
            return res.status(400).json({
                message: "No user id"
            })
        }
        const [rows] = await conn.query('select * from users where id=?', [user_id]);
        if (rows.length > 0) {
            return res.status(200).json(rows);
        } else {
            return res.status(200).json({
                "message": "Not found"
            })
        }

    } catch(err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error!"
        })
    }
})

module.exports = router;