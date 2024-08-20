const express = require('express');
require('dotenv').config();
const conn = require('./connection');


const app = express();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send("This is the backend of the notes-taking app!");
})

conn.getConnection((err, connection) => {
    if (err) {
        throw err;
        console.log("Could not connect to database");
    }
    console.log("Database connection has been secured");
})


app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})