const express = require('express');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send("This is the backend of the notes-taking app!");
})


app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})