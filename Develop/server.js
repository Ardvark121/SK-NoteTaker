const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const Notesdata = require("./db/db.json");
const PORT = process.env.port || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);
app.get("/api/notes", (req, res) => res.json(Notesdata));
app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;
  const newNote = {
    title,
    text,
  };
  Notesdata.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(Notesdata), (err) =>
    err
      ? console.error(err)
      : console.log(`Review for hello has been written to JSON file`)
  );
});

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
