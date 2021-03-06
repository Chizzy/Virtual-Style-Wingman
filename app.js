const createError = require('http-errors');
const express = require('express');
const path = require('path');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const methodOverride = require('method-override');
const logger = require('morgan');
const passport = require('passport')
const routes = require('./routes/index');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

app.use(session({secret: 'VIRTUAL-STYLE-WINGMAN-EXPRESS'}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use('/', routes);


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
