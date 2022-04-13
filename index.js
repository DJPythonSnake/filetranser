const express = require('express')
const multer  = require("multer");

const app = express()
const port = 3000

const dirname_index = "/home/whiteyaki/filetranser/public/"
let currentdate = new Date()

app.get('/', (req, res) => {
  res.redirect('/page/')
})

app.get('/page/', (req, res) => {
    res.sendFile(dirname_index + '/index.html')
})

app.get('/about/', (req, res) => {
  res.sendFile(dirname_index + '/about.html')
})

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) =>{
      cb(null, "uploads");
  },
  filename: (req, file, cb) =>{
      cb(null, file.originalname);
  }
});

app.use(express.static(__dirname));
app.use(multer({storage:storageConfig}).single("filedata"));
app.post("/upload", function (req, res, next) {
   
    let filedata = req.file;
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
        res.redirect('/page/')
});

app.use(function (req, res) {
  res.status(404).send('not found');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(currentdate)
})
