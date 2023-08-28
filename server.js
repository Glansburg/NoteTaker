const express = require('express');
const app = express();
const path = require("path");
const fs = require("fs");
const PORT = process.env.PORT || 3001;

app.use(express.json())

app.use(express.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, "./public")))

 //getting you to index.html                                                   
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})
//getting notes end point sending file to notes.html
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
    //res.json({players:[{name:"John", characterClass:"wizard"}]})
    // fetch... then... then... response.players in a for loop
})
//deleting note id in notes endpoint, needs id to work
app.delete('/notes/:id', (req,res) => {
    let readPosts = fs.readFileSync(path.join(__dirname, "./db/db.json"), "utf8",
    (err) => {
        if (err) throw err;
    })
    let arrayofPosts = JSON.parse(readPosts)
    // for each
    //deleteNote(notes, req.params.id);
    res.json(note);
    //overwrite system
    fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(arrayofPosts), "utf8",
        (err) => {
            if (err) throw err;
        })

    res.json({})
});

// getting notes from database
app.get("/api/notes", (req, res) => {
    let fileText = fs.readFileSync(path.join(__dirname, "./db/db.json"), "utf8", (err) => {
        if (err) throw err;
    })
    let arrayOfNotes = JSON.parse(fileText)

    console.log(arrayOfNotes)
    res.json(arrayOfNotes)
})
//posting notes to the api/notes endpoint
app.post("/api/notes", (req, res) => {
    let filePost = fs.readFileSync(path.join(__dirname, "./db/db.json"), "utf8",
        (err) => {
            if (err) throw err;
        })
    let filePostArray = JSON.parse(filePost);
    // user writing note
    filePostArray.push(req.body);
    //overwritting db.json
    fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(filePostArray), "utf8",
        (err) => {
            if (err) throw err;
        })

    res.json({})
    


  

    
  
    console.log(req.body)
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
})