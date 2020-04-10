const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');

const api = require('./api/router.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser(process.env.SECRET_KEY || 'SECRET_KEY'));
app.use(express.static('dist'));

// protect the API:
app.disable('x-powered-by');

app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  console.log('AAAAAAAAAAAA');
  const error = app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.json({status: err.status || 500, ...error});
});

module.exports = app;