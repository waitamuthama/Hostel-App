var express = require('express');
var router = express.Router();
const mongoose=require('mongoose');

require('../models/user');
const User=mongoose.model('users');


router.get('/index',function(req, res, next) {
  res.render('admin/index', { title: 'banking' });
});

//Members
router.get('/members',function(req,res){
  User.find({},function(err,members){
    if(err){
      console.log(err);
    }
    var model={
      members:members
    }
    res.render('admin/members',model);
  });
});

//deposits
router.get('/deposits',function(req,res){
  Deposit.find({},function(err,deposits){
    if(err){
      console.log(err);
    }
    var model={
      deposits:deposits
    }
    res.render('admin/deposits',model);
  });
});

//loan
router.get('/loanreqs',function(req,res){
  Loan.find({},function(err,loanreqs){
    if(err){
      console.log(err);
    }
    var model={
      loanreqs:loanreqs
    }
    res.render('admin/loanreqs',model);
  });
});

//pay
router.get('/pay',function(req,res){
  Pay.find({},function(err,pay){
    if(err){
      console.log(err);
    }
    var model={
      pay:pay
    }
    res.render('admin/pay',model);
  });
});

//load edit Form
router.get('/edit/:id',function(req,res){
  User.findOne({_id:req.params.id},function(err,user){
    if(err){
      console.log(err);
    }
    var model={
      user:user
    }
    res.render('admin/edit',model);
  });
});

// post user edit for
router.post('/edit/:id',function(req,res){
  let errors=[];
  if(!req.body.name){
    errors.push({text:'Please ensure all field are not empty'});
  }
  if(errors.length>0){
    res.render('admin/edit',{
      name:req.body.name,
      email:req.body.email,
      phone:req.body.phone,
      location:req.body.location
    });
  }else{
    User.update({_id:req.params.id},{
      name:req.body.name,
      email:req.body.email,
      phone:req.body.phone,
      account:req.body.account,
      regno:req.body.regno,
      location:req.body.location
    },function(err){
      if(err){
        console.log(err);
      }
      req.flash('success_msg','member data updated sucessfully');
      res.redirect('/admin/members');
    });
  }
});

// Delete member
router.delete('/:id', (req, res) => {
  User.remove({_id: req.params.id})
    .then(() => {
      req.flash('success_msg', 'member deleted');
      res.redirect('/admin/members');
    });
});





module.exports=router;
