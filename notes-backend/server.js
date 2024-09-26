const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const conn = require('./connection');

const app = express();

const corsOptions = {
    "origin": ["https://notesfrontend-lovat.vercel.app", "http://localhost:3000"],
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
};

// cors middleware
app.use(cors(corsOptions));

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

const noteRoutes = require('./routes/notesRoutes');
app.use('/', noteRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})