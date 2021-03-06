var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');

var mongo = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dbsmtlcn');
var db = mongoose.connection;

var home = require('./routes/home');
var login = require('./routes/login');
var users = require('./routes/users');
var phanbien = require('./routes/phanbien');
var phieuphanbien = require('./routes/phieuphanbien');
var tacgia_suabai = require('./routes/tacgia_suabai');
var tacgia = require('./routes/tacgia');
var tongbientap = require('./routes/tongbientap');
var docbai = require('./routes/docbai');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));


// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/', home);
app.use('/login',login);
app.use('/phanbien',phanbien);
app.use('/phanbien/phieuphanbien',phieuphanbien);
app.use('/tacgia',tacgia);
//app.use('/suabai',tacgia_suabai);
app.use('/tongbientap',tongbientap);
app.use('/users', users);
app.use('/docbai', docbai);
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
