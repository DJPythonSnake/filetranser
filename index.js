const express = require('express');
const multer  = require("multer");

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

const TelegramBot = require('node-telegram-bot-api');

const expressHandlebars = require('express-handlebars');
const handlebars = expressHandlebars.create({defaultLayout: 'main', extname: 'hbs'});

const token = '5196528766:AAG-mE9Fe6apPgNNXxJpCG7pU2wU2acBKvI';

const bot = new TelegramBot(token);

const app = express()
const port = 3000

app.use(express.static(__dirname + '/public'));

app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs'); 

const dirname_index = "/home/whiteyaki/filetranser/public/"
let currentdate = new Date()

app.get('/', (req, res) => {
  res.redirect('/page/')
})

app.get('/page/', (req, res) => {
  res.redirect('/page/1')
})

app.get('/about/', (req, res) => {
  res.sendFile(dirname_index + '/about.html')
})

app.use(bodyParser.urlencoded({extended: true}));
app.get('/page/:page/', function(req, res) {
  res.render("page"+req.params.page, {
    text1: 'aaa',
    text2: 'bbb',
    text: '<b>aaa</b>',
    title: 'title '+req.params.page
  });
});

app.post('/form/handler', function (req, res) {
  console.log(req.body); // объект с данными
  
  //name, email, phone, message
  
  let result = (req.body.name||"-") +" "
  +(req.body.email||"-")+" "
  +(req.body.message||"-")+" "
  +(req.body.phone||"-")+" ";

  bot.sendMessage("-1001747470920",result);
  
  res.render("page3", {
    text1: 'aaa',
    text2: 'bbb',
    result: result,
    query: req.body,
    text: '<b>aaa</b>',
    title: "Contact Result"
  });
});

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
