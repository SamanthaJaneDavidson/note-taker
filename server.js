const express = require('express');
const path = require('path');
const data = require('./db/db.json');
const uuid = require('./helpers/uuid');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 7001;

// Middleware 
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get for homepage 
app.get('/', (req, res) => {
    res.send(path.join(__dirname, "public", "index.html"));
});

app.get('/notes', (req, res) => {
    res.send(path.join(__dirname, "public", "notes.html"));
});

// Get for notes data 
app.get('/api/notes', (req, res) => {
    res.json(data);
});

// Post for notes data 
app.post('/api/notes', (req, res) => {

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        const response = {
            status: 'Note added',
            body: newNote,
        };

        // // if {
        //     data.push({ ...req.body })
            console.log(newNote)
            return fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(data), (err) => {
                err ? console.error(err) : console.log("Note written")
                return res.status(200).json(response)
            });

        // } else {
        //     res.status(500).json(`Error posting note`);
        // }
    }
});

// Add delete app

// Listen 
app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}/`);
});