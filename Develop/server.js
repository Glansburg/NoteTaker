// THIS FILE SHOULD RETURN THE INDEX.HTML FILE?
const express = require('express');
const app = express();
const path = require("path");
const fs = require("fs");
const PORT = 3001;
// const routes = require("./routes"); 
// when it's ./routes, it looks for either routes.js or routes/index.js
// const routes = require("./routes/index.js"); 

app.use(express.json())
// fetch... body:{...}
app.use(express.urlencoded({extended:false}));
// <form> <label for="name">Name:</label> 
// <input type="text" id="name" name="customer.name">
// <label for="phonenumber">Phone:</label> 
// <input type="text" id="phonenumber" name="customer.phonenumber">

app.use(express.static(path.join(__dirname, "./public")))


app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "./public/index.html"))
})
app.get("/notes", (req,res)=>{
    res.sendFile(path.join(__dirname, "./public/notes.html"))
    //res.json({players:[{name:"John", characterClass:"wizard"}]})
    // fetch... then... then... response.players in a for loop
})

///api/note
app.get("/api/notes", (req,res)=>{
    let fileText = fs.readFileSync(path.join(__dirname, "./db/db.json"), "utf8", (err)=>{
        if(err) throw err;
    })
    let arrayOfNotes = JSON.parse(fileText)

    console.log(arrayOfNotes)
    res.json(arrayOfNotes)
})
app.post("/api/notes", (req,res)=>{
    // Read the notes into an array like before
    // Push `req.body` into the array
    /*
        original array arrayOfNotes [ { title: 'Test Title', text: 'Test text' } ]
        arrayOfNote.push(req.body)
        req.body { title: 'a', text: 'b' }

        Such that:
        original array arrayOfNotes [ { title: 'Test Title', text: 'Test text' },  { title: 'a', text: 'b' } ]

    */
    // Then rewrite / overwrite the db.json
    console.log(req.body)
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
})