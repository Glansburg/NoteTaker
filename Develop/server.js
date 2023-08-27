// THIS FILE SHOULD RETURN THE INDEX.HTML FILE?
const express = require('express');
const app = express();
const path = require("path");
const fs = require("fs");
const PORT = 3001;


app.use(express.json())

app.use(express.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, "./public")))

                                                    
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
    //res.json({players:[{name:"John", characterClass:"wizard"}]})
    // fetch... then... then... response.players in a for loop
})

app.delete('/notes/:id', (req,res) => {
    deleteNote(notes, req.params.id);
    res.json(note);
})


app.get("/api/notes", (req, res) => {
    let fileText = fs.readFileSync(path.join(__dirname, "./db/db.json"), "utf8", (err) => {
        if (err) throw err;
    })
    let arrayOfNotes = JSON.parse(fileText)

    console.log(arrayOfNotes)
    res.json(arrayOfNotes)
})
app.post("/api/notes", (req, res) => {
    let filePost = fs.readFileSync(path.join(__dirname, "./db/db.json"), "utf8",
        (err) => {
            if (err) throw err;
        })
    let filePostArray = JSON.parse(filePost);
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