const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const conn = require('./connection');


const app = express();

// Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("This is the backend of the notes-taking app!");
})

// conn.getConnection((err, connection) => {
//     if (err) {
//         throw err;
//         console.log("Could not connect to database");
//     }
//     console.log("Database connection has been secured");
// })

const userRoutes = require('./routes/userRoutes');
app.use('/', userRoutes);


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})