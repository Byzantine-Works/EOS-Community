const express = require('express');
const parser = require('body-parser');
const path = require('path');
const cors = require('cors')
const router = require('./router.js');

const app = express();
const port = 3000;

app.use(cors({
  allowedHeaders: 'Content-Type, authorization',
  origin: '*',
  methods: ['GET, POST, PUT, DELETE', 'OPTIONS']
}));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
// console.log('dirname', __dirname)
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});
app.get('/chartli.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/chartli.js'));
});
// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../build/index.html'));
// });
// app.get('/chartli.js', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../build/chartli.js'));
// });

app.use(express.static(path.resolve(__dirname, '../public')));
app.use(router);

//


app.listen(port, () => {
  console.log(`Airdrop Toolkit is running on Port: ${port}`);
});