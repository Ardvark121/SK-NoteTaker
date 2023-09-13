const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const uuid = require("./helpers/uuid");
let Notesdata = require("./db/db.json");
const PORT = process.env.port || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);
app.get("/api/notes", (req, res) => {
  res.json(Notesdata);
});
app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;
  const newNote = {
    title,
    text,
    id: uuid(),
  };
  Notesdata.push(newNote);
  writefile(Notesdata);
});
app.delete("/api/notes/:id", (req, res) => {
  const { notesid } = req.params.id;
  let Notesdatadel = Notesdata.filter(function (obj) {
    return obj.id !== notesid;
  });
  Notesdata = Notesdatadel;
  writefile(Notesdata);
});
function writefile(data) {
  fs.writeFileSync("./db/db.json", JSON.stringify(data), (err) =>
    err ? console.error(err) : console.log(`Could not record note to json file`)
  );
}
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
