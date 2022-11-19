// const { urlencoded } = require(`express`); // VSC did this on it's own...
const express = require(`express`);
// const { appendFile, fstat } = require(`fs`); // VSC did this on it's own...
// const { restart } = require("nodemon");
const path = require(`path`);
const data = require(`./db/db.json`);
const fs = require(`fs`)

const app = express();
const PORT = 5001;

// Middleware 
app.use(express.static(`public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get 
app.get(`/`, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
});

app.get(`/api/notes`, (req, res) => {
    res.json(data);
});

// Post
//has to generate a random ID
app.post(`api/notes`, (req, res) => {
    if (typeof req.body.note !== `undefined`) {
        data.push({ ...req.body })
        console.log(note)
        return fs.writeFile(path.join(__dirname, "./db/db.json", JSON.stringify(data), (err) => {
            err ? console.error(err) : console.log("Note written")
            return res.status(200).json(req.body)
        }));
    }
        return res.status(500).send("Error");
    });


// Listen
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});

