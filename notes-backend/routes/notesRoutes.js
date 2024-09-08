const express = require('express');
const { jwtAuthMiddleware } = require('../jwt');
const router = express.Router();

const conn = require('./../connection');

router.post('/note/submit', jwtAuthMiddleware, async (req, res) => {
    try {
       const userId = req.jwtPayload.id;
       const { heading, content } = req.body;
       if(!heading || !content) {
            return res.status(102).json({
                success: false,
                message: "Please fill out all the fields"
            })
        } 
        const response = await conn.query('insert into notes (user_id, heading, content) values (?, ?, ?)', [userId, heading, content]);
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
        if(!userId) {
            return res.json({
                message: "No Notes Yet!"
            })
        }
        const [rows] = await conn.query('select * from notes where user_id=?', [userId]);
        if(rows.length > 0) {
            return res.status(200).json(rows);
        } else {
            return res.status(200).json({
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

router.post('/note/delete/:note_id', async(req, res) => {
    const id = req.params.note_id;
    try {
        const [result] = await conn.query('delete from notes where notes_id=?', [id]);
        console.log(result);
        if(result.affectedRows === 1) {
            return res.status(200).json({
                success: true,
                message: "Your Note has been deleted successfully!"
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Your Note could not be deleted! Try again later"
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