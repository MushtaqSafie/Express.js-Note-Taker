const express = require('express');
const path = require('path');

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

console.log(obj[0].title);

app.use(express.static(path.join(__dirname, 'public/assets')))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));