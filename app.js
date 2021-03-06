/* eslint-env node, es6, JSX */
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}
// let favicon = require('serve-favicon');

let dbConnection = require('./helpers/dbConnection')
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let cors = require('cors');
let express = require('express');
let LocalStrategy = require('passport-local').Strategy
let logger = require('morgan');
let mongoose = require('mongoose');
let passport = require('passport')
let path = require('path');

// +++++++++ Routes  +++++++++ 
let index = require('./routes/index');
let todos = require('./routes/todos');
let users = require('./routes/users');
let auth  = require('./routes/auth');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// ??? passport tutorial 
app.use(require('express-session')({
	secret: 'MY_SECRET',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', index);
app.use('/api/auth', auth);
app.use('/api/todos', todos);
app.use('/api/users', users);

// +++++++++ passport config +++++++++
var User = require('./models/user') 
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// +++++++++ mongoose +++++++++ 
// connection to imported db constant
let mongoDB = dbConnection
// establish pending connection to db
mongoose.connect(mongoDB);
// use the global Promise library
mongoose.Promise = global.Promise;

// default connection
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

// +++++++++ error handling  +++++++++ 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// +++++++++ dev error handler to print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req,res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		})
	})
}

// +++++++++ production error handler: no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// +++++++++ prior handler  +++++++++ 
/*app.use(function(err, req, res, next) {
// set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/

module.exports = app;
