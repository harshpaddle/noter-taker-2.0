const express = require('express');
const mysql = require("mysql");
const PORT = 3000;
const path = require("path");

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var connection = mysql.createConnection({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "root1234",
  database: "notes_db"
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "home.html"))
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "notes.html"))
});

// app.get("/api/notes", function (req, res) {
//   connection.query("SELECT * FROM notes", function (err, notesData) {
//     if (err) throw err;
//     res.json(notesData)
//   });
// });

app.get("/api/notes", function (req, res) {
  connection.query("SELECT * FROM notes", function (err, noteInfo) {
    if (err) {

      return console.log("19");
    }
    res.json(noteInfo);
  });
});

app.get("/api/notes/:selected", function (req, res) {
  connection.query("SELECT * FROM notes where id = ?", [req.params.selected], function (err, result) {
    if (err) {

      return console.log("29");
    }
    res.json(result);
  })
})

app.post("/api/notes", function (req, res) {
  connection.query("INSERT INTO notes SET ?", req.body, function (err, createNote) {
    if (err) {

      return console.log("post\n" + err);
    }
    res.json(createNote);
  })
})

app.delete("/api/notes/:selected", function (req, res) {
  connection.query("DELETE FROM notes where id = ?", [req.params.selected], function (err, result) {
    if (err) {

      return console.log("delete");
    }
    res.json(result);
  })
})

app.listen(PORT, () => console.log("now live on localhost" + PORT));

