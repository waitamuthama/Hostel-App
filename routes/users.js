var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose=require('mongoose');
const {ensureAuthenticated} = require('../helpers/auth');

require('../models/user');
const User=mongoose.model('users');

require('../models/hostel');
const Hostel=mongoose.model('hostels');



router.get('/index',  (req, res) => {
  Hostel.find({})
    .then(hostel => {
      res.render('users/index', {
        hostel:hostel
      });
    });
});


router.get('/profile',ensureAuthenticated, function(req, res, next) {
  res.render('users/profile', { title: ' ' });
});

router.get('/register', function(req, res, next) {
  res.render('users/register', { title: ' ' });
});

router.get('/login', function(req, res, next) {
  res.render('users/login', { title: '' });
});

router.get('/createAccount', function(req, res, next) {
  res.render('users/createAccount', { title: '' });
});



// Login Form POST
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect:'/users/index',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// User registration
router.post('/register', (req, res) => {

    let errors=[];
  if(!req.body.firstName){
  errors.push({text:'Please FirstName field is empty'});
  }
  if(!req.body.lastName){
  errors.push({text:'Please lastName field is empty'});
  }
  if(!req.body.email){
  errors.push({text:'Please email field is empty'});
  }
  if(req.body.password != req.body.password1){
  errors.push({text:'passwords do not match'});
  }
  if(req.body.password.length < 4){
    errors.push({text:'password must be atleast four characters'});
  }
  if(errors.length > 0){
    res.render('users/register', {
      errors: errors,
      firstName:req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      password1: req.body.password1,

    });
  } else {
    User.findOne({email: req.body.email})
      .then(user => {
        if(user){
          req.flash('error_msg', 'Email already regsitered');
          res.redirect('/users/register');
        } else {
          const newUser = new User({
            firstName:req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  req.flash('success_msg', 'You are now registered ');
                  res.redirect('/users/index');
                })
                .catch(err => {
                  console.log(err);
                  return;
                });
            });
          });
        }
      });
  }
});

//find all users


// load user profile form
router.get('/profile/:id',function(req,res){
  User.findOne({_id:req.params.id},function(err,user){
    if(err){
    console.log(err);
    }
    var model={
      user:user
    };
    res.render('users/profile',model);
  });
});

// update user profile
router.post('/profile/:id',function(req,res){
  let errors=[];
  if(!req.body.phone){
    errors.push({text:'Please ensure all field are not empty'});
  }
  if(errors.length>0){
    res.render('users/profile',{
      name:req.body.name,
      email:req.body.email,
      phone:req.body.phone

    });
  }else{
    User.update({_id:req.params.id},{
      location:req.body.location,
      phone:req.body.phone

    },function(err){
      if(err){
        console.log(err);
      }
      req.flash('success_msg',' data updated sucessfully');
      res.redirect('/users/index');
    });
  }
});

// Logout User
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});


module.exports = router;
