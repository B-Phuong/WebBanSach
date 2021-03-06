const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const route = require('./Server/route');
const db = require('./Server/config/database');
var bodyParser = require('body-parser');

app.use(bodyParser)

//Connect to DB
db.connect();
// Without middleware

//đặt đường dẫn luôn vào src/Server 
app.use(express.static(path.join(__dirname, 'Server'))); //MỚI THÊM
app.use(express.urlencoded({   //có thể dùng để đọc req.body 
  extended: true
}));
app.use(express.json());
//app.use("/public", express.static(path.join(__dirname, "uploads")));   //MỚI THÊM
route(app);

//localhost 127.0.0.1
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})