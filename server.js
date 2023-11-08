const express = require('express');
const app = express();
const path = require("path");
const fs = require("fs");
const uuid = require('uuid');
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
app.delete('/notes/:id', (req, res) => {
    const idToDelete = req.params.id; // Get the ID to delete from the request parameters

    let readPosts = fs.readFileSync(path.join(__dirname, "./db/db.json"), "utf8", (err) => {
        if (err) throw err;
    });

    let arrayofPosts = JSON.parse(readPosts);

    let postDeleted = false; // To track whether the post was deleted

    // Use a forEach loop to find and delete the post with the specified ID
    arrayofPosts.forEach((post, index) => {
        if (post.id === idToDelete) {
            arrayofPosts.splice(index, 1); // Remove the post from the array
            postDeleted = true;
        }
    });

    if (postDeleted) {
        // If the post with the specified ID was found and deleted
        fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(arrayofPosts), "utf8", (err) => {
            if (err) throw err;
        });

        res.json({ message: 'Note deleted successfully' });
    } else {
        res.status(404).json({ message: 'Note not found' });
    }
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
    let filePost = fs.readFileSync(path.join(__dirname, "./db/db.json"), "utf8", (err) => {
        if (err) throw err;
    });
    let filePostArray = JSON.parse(filePost);

    const newNote = req.body;
    newNote.id = uuid.v4(); // Generate a unique ID for the new note

    // Add the new note to the array
    filePostArray.push(newNote);

    // Overwrite db.json with the updated array
    fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(filePostArray), "utf8", (err) => {
        if (err) throw err;
    });

    res.json(newNote); // Respond with the created note (including its ID)
});


app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
})