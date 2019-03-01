// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var logger = require('morgan');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

// create a new express server
var app = express();


app.enable('trust proxy');
// mongoose
mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, {
    useCreateIndex: true,
    useNewUrlParser: true
});




let sessionStore = new MongoStore({mongooseConnection: mongoose.connection, autoReconnect: true});

var cookie = {
    httpOnly: true,
    maxAge: (1000 * 60 * 60 * 24) * 365 // 1 year
};

var sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    cookie: cookie,
    store: sessionStore,
    saveUninitialized: false,
    resave: false
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(sessionMiddleware);

app.use(express.static(path.join(__dirname, 'public')));

var indexRouter = require('./routes/index');
var receiptRouter = require('./routes/receipt');


app.use('/', indexRouter);
app.use('/receipt', receiptRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    // next(createError(404));

    // render the error page
    res.status(404);
    res.render('404');

});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};


    // add this line to include winston logging
    // todo winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);


    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

