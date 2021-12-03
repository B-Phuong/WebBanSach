const express = require('express');
const app = express();
require('dotenv').config()
const port = 3000;
const path = require('path');
const route = require('./Server/route');
const db = require('./Server/config/database');
const cors = require('cors');
var bodyParser = require('body-parser');
const paypal = require('paypal-rest-sdk');
const multer = require('multer');
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AVSsoXfkVjr4Onhha6mdXf2yqOJcgxI1qL4nan3KSJTz7rDfHoOKtSA-OHmxNnZbED1GEkOOpDjBejy0',
  'client_secret': 'EKKWhYhmNwIfyVhmNhNamNNk4Tz4gAeohafRWiAzhvsO8ZprgwbRXxFeke5b6mCD38wgVXI10H9c4q54'
});
app.use(bodyParser.urlencoded({ extended: false }))

//Connect to DB
db.connect();
// Without middleware
//app.use('/', express.static(path.join(__dirname, 'Server/views')));
//đặt đường dẫn luôn vào src/Server 
app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'Server')));
app.use(express.urlencoded({   //có thể dùng để đọc req.body
  extended: true
}));
app.use(express.json());
app.use(cors());
const storage = multer.diskStorage({ 
  destination: (req,file,cb) => {
    cb(null,'public/images')
  }, 
  filename: (req,file,cb) => {
    // constcb(null,Date.now()+'-' +file.originalname)
    cb(null,file.originalname)
  }

});

// sửa lỗi upload file https://github.com/expressjs/multer/issues/159
const upload = multer({storage}).single('file')
//app.use(multer({ storage : storage}).fields([{name:'image',maxCount:1}]));
app.post('/upload',(req,res) => {
  upload(req,res,(err) =>{
    if(err) {
      return res.status(500).json(err)
    }

    return res.status(200).send(req.file)
  })
})
route(app);

//localhost 127.0.0.1
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})