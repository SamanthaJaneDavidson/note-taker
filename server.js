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

// Get for html pages 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// Get for notes data 
app.get('/api/notes', (req, res) => {
    console.log(data)
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

            data.push(newNote)
            console.log(newNote)
            return fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(data), (err) => {
                err ? console.error(err) : console.log("Note written")
                return res.status(200).json(response)
            });

        } else {
            res.status(500).json(`Error posting note`);
        }
    });

// Delete for notes data
app.delete(`/api/notes/:id`, (req, res) => {
    res.send("Note deleted");
    console.log(typeof data)
    console.log(data)
    var updateNotes = data.filter((note) => note.id != req.params.id)

    console.log("testing delete", updateNotes)
    
    return fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(updateNotes), (err) => {
        err ? console.error(err) : console.log("Note deleted")
        return updateNotes
    });
});


// Listen 
app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}/`);
});