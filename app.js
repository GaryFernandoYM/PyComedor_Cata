var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var flash = require('express-flash');
var session = require('express-session');
var mysql = require('mysql');
var connection  = require('./lib/db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cursosRouter = require('./routes/cursos');
var booksRouter = require('./routes/books');
var productsRouter = require('./routes/products');
var workersRouter = require('./routes/workers');
var salesRouter = require('./routes/sales');
var menuRouter = require('./routes/menu');
var crudusersRouter = require('./routes/crudusers');
var climenuRouter = require('./routes/climenu');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({ 
    cookie: { maxAge:  oneDay},
    store: new session.MemoryStore,
    saveUninitialized: true,
    resave: 'false',
    secret: '0123456789'
}))

app.use(flash());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cursos', cursosRouter);
app.use('/books', booksRouter);
app.use('/products', productsRouter);
app.use('/workers', workersRouter);
app.use('/menu', menuRouter);
app.use('/sales', salesRouter);
app.use('/crudusers', crudusersRouter);
app.use('/climenu', climenuRouter);

//app.use('/sales', salesRouter);
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
