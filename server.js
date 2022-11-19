// const { urlencoded } = require(`express`); // VSC did this on it's own...
const express = require(`express`);
// const { appendFile, fstat } = require(`fs`); // VSC did this on it's own...
// const { restart } = require("nodemon");
const path = require(`path`);
const data = require(`./db/db.json`);
const fs = require(`fs`)
const uuid = require(`./helpers/uuid`)

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware 
app.use(express.static(`public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get route for homepage
app.get(`/`, (req, res) => {
    res.sendFile(path.join(__dirname, `/public/index.html`))
});


// Get route for notes page 
app.get(`/api/notes`, (req, res) => {
    res.sendFile(path.join(__dirname, `/public/notes.html`))
});

// app.get(`*`, (req, res) => {
//     res.sendFile(path.join(__dirname, `public/index.html`))
// });

// Get API routes

// Post for new note
app.post(`api/notes`, (req, res) => {

    const { title, text } = req.body;

    if(req.body) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };
        
    }

});


    // if (typeof req.body.note !== `undefined`) {
    //     data.push({ ...req.body })
    //     console.log(note)
    //     return fs.writeFile(path.join(__dirname, "./db/db.json", JSON.stringify(data), (err) => {
    //         err ? console.error(err) : console.log("Note written")
    //         return res.status(200).json(req.body)
    //     }));
    // }
    //     return res.status(500).send("Error");



// Listen
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});

