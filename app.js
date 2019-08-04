
const express = require('express');
const path = require('path');
const http=require('http');
const cookieParser = require('cookie-parser');
const bodyParser=require('body-parser');
const logger = require('morgan');
const exphbs=require('express-handlebars');
const bcrypt=require('bcryptjs');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const socketIO=require('socket.io');

const indexRouter = require('./routes/index');
const usersRouter=require('./routes/users');
const adminRouter=require('./routes/admin');
const hostelRouter=require('./routes/hostel');
const auth=require('./routes/auth');

const multer=require('multer');
const mongoose=require('mongoose');
const app = express();

// connect to mongo db
mongoose.connect('mongodb://localhost/hostel',{ useNewUrlParser: true });

// setting middleware for handlebars
app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// Passport Config
require('./passport/passport-local')(passport);
require('./passport/passport-google')(passport);

//load keys
const keys=require('./config/keys');

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Method override middleware
app.use(methodOverride('_method'));

// Express session midleware
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// middleware for flash
app.use(flash());


// declare global constiables
app.use(function(req,res,next){
  res.locals.success_msg=req.flash('success_msg');
  res.locals.error_msg=req.flash('error_msg');
  res.locals.error=req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/', indexRouter);
app.use('/users',usersRouter);
app.use('/admin',adminRouter);
app.use('/auth',auth);
app.use('/hostel',hostelRouter);

const server=http.createServer(app);
server.listen(3000,function(){
  console.log('server running on port 3000');
});


module.exports = app;
