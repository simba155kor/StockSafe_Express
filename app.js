const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const compression = require('compression');

var indexRouter = require('./routes/index');
var memberRouter = require('./routes/member');
var memberstockRouter = require('./routes/memberstock');
var newsRouter = require('./routes/news');
var replyRouter = require('./routes/reply');
var likestockRouter = require('./routes/likestock');
var stockRouter = require('./routes/stock');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());




app.use('/', indexRouter);
app.use('/member', memberRouter);
app.use('/memberstock', memberstockRouter);
app.use('/news', newsRouter);
app.use('/reply', replyRouter);
app.use('/likestock', likestockRouter);
app.use('/stock', stockRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;