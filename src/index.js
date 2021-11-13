const express = require('express');
const app = express();
const port = 3000;  
const path = require('path');
const route = require('./Server/route');
const db = require('./Server/config/database');
const cors = require('cors');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))

//Connect to DB
db.connect();
// Without middleware
app.use('/',express.static(path.join(__dirname, 'Server/views')));
//đặt đường dẫn luôn vào src/Server 
// app.use(express.static(path.join(__dirname, 'Server')));
app.use(express.urlencoded({   //có thể dùng để đọc req.body
  extended: true
}));
app.use(express.json());
app.use(cors());
route(app);

//localhost 127.0.0.1
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})