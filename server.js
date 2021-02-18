const express = require('express');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// const obj = [
//   {
//       "title":"Test Title",
//       "text":"Test text"
//   }
// ];

// console.log(obj[0].title);

app.use(express.static(path.join(__dirname, 'public/assets')))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('/api/notes', (req, res) => {
  // var obj = JSON.parse(fs.readFileSync('file', 'utf8'));
  // fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8')
  res.json(JSON.parse(fs.readFileSync(path.join(__dirname, '/db/db.json'), 'utf-8')));
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uniqid();
  const obj = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/db.json'), 'utf-8'))
  obj.push(newNote);
  fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(obj, null, 2))
  res.json(JSON.parse(fs.readFileSync(path.join(__dirname, '/db/db.json'), 'utf-8')));
  console.log(newNote);
});

app.delete('/api/notes/:id', function (req, res) {
  const { id } = req.params;
  let obj = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/db.json'), 'utf-8'))
  const deleted = obj.find(e => e.id === id)

  if (deleted) {
    obj = obj.filter(e => e.id !== id)
    console.log(obj);
    fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(obj, null, 2))
  } else {
    res.send('Got a DELETE request at /user');
  }
})

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));