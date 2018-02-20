/* eslint-env node, es6, JSX */

let express = require('express');
let cors = require('cors');

let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let index = require('./routes/index');
let todos = require('./routes/todos.routes');
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// =========================== Connect database
let mongoose = require('mongoose');

// ========= test db
// let mongoDB = 'mongodb://Tester:test2015@ds239117.mlab.com:39117/todo-test-db';

// ========= default db
let mongoDB = 'mongodb://Tester:test2015@ds135537.mlab.com:35537/react-redux-todo';

// establish pending connection to db
mongoose.connect(mongoDB);
// use the global Promise library
// mongoose.Promise = global.Promise;
// default connection
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

// db.once('open', function() {
// console.log("we're connected!");
// });

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', index);
app.use('/api/todos', todos);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
