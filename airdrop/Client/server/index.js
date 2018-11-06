const express = require('express');
const parser = require('body-parser');
const path = require('path');
const router = require('./router.js');


const app = express();
const port = 9001;



app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/', function (req, res) {
  res.send('Client: GET request to the homepage')
})

// app.use(router);
// http://localhost:9001/get_price
app.get('/get_price', (req, res) => {
  // var airdropParams = req.body.AIRDROP_PARAMS
  // res.send(req.body);
  console.log('Server: GET request to /get_price received');
  res.send('Client: GET request to /get_price received');
})

app.listen(port, () => {
  console.log(`Airdrop Toolkit is running on Port: ${port}`);
});