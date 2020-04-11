const express = require('express');
// const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const path = require('path');

const api = require('./api/router.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SECRET_KEY || 'SECRET_KEY'));
app.use(express.static('dist'));

// protect the API:
app.disable('x-powered-by');

app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist/index.html'));
});

module.exports = app;
