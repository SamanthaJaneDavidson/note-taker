const express = require(`express`);
const path = require(`path`);
const data = require(`./db/db.json`);
const uuid = require("./helpers/uuid");

const app = express();
const PORT = process.env.PORT || 7001;

// Middleware 
app.use(express.static(`public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get for homepage 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Get for notes data 
app.get('/api/notes', (req, res) => {
    res.json(data);
});

// Post for notes data 
app.post(`/api/notes`, (req, res) => {
    
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        const response = {
            status: `Note added`,
            body: newNote,
        };

        console.log(response);
        res.status(200).json(response);
    } else {
        res.status(500).json(`Error posting note`);
    }
    });


// Listen 
app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}/`);
});