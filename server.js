const express = require('express');
const multer  = require('multer');
const path = require('path');
const app = express();

// Set up storage engine for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Folder to save uploaded files
  },
  filename: function (req, file, cb) {
    // Keep the original file name
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle file upload POST
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send('File uploaded successfully!');
});

// Make sure the uploads folder exists
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});