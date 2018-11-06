const express = require('express');
const parser = require('body-parser');
const path = require('path');
const router = require('./router.js');


const app = express();
const port = 9001;



app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../public')));

app.use(router);

app.listen(port, () => {
  console.log(`Airdrop Toolkit is running on Port: ${port}`);
});