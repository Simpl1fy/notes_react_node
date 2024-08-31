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
            return res.status(400).json({
                success: false,
                message: "Please fill out all the fields"
            })
        } 
        const response = await conn.query('insert into notes (user_id, heading, content) values (?, ?, ?)', [userId, heading, content]);
        console.log(response);
        if(response) {return res.status(200).json({
            success: true,
            message: "Your note has been saved successfully"
        })} else {
            return res.status(500).json({
                success: false,
                message: "Internal server error!" 
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


module.exports = router;