const express = require('express');
const { jwtAuthMiddleware } = require('../jwt');
const router = express.Router();

const conn = require('./../connection');

router.post('/note/submit', jwtAuthMiddleware, async (req, res) => {
    try {
       const userId = req.jwtPayload.id;
       console.log(userId);
       const { heading, content } = req.body;
       if(!heading || !content) {
            return res.status(102).json({
                success: false,
                message: "Please fill out all the fields"
            })
        } 
        const response = await conn.query('insert into notes (user_id, heading, content) values (?, ?, ?)', [userId, heading, content]);
        console.log(response);
        if(response) {return res.status(200).json({
            success: true,
            message: "Your note has been saved successfully!"
        })} else {
            return res.status(500).json({
                success: false,
                message: "Your note could not be saved!" 
            })
        }
    } catch(err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err.message
        })
    }
})

router.get('/note/show', jwtAuthMiddleware, async(req, res) => { 
    try {
        const userId = req.jwtPayload.id;
        const [rows] = await conn.query('select * from notes where user_id=?', [userId]);
        if(rows.length > 0) {
            return res.status(200).json(rows);
        } else {
            return res.status(404).json({
                message: "No notes found"
            })
        }
    } catch(err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err.message
        })
    }
})


module.exports = router;