const express=require('express');
const router=express.Router();

const mongoose=require('mongoose');

require('../models/hostel');
const Hostel=mongoose.model('hostels');

require('../models/room');
const Room=mongoose.model('rooms');

// require('../models/rooms');
// const Rooom=mongoose.model('rooms');

// fetch all data per hostel

router.get('/rooms',function(req,res){
  res.render('hostel/rooms');
});


router.get('/registerhostels',function(req,res){
  res.render('hostel/registerhostels');
});

// router.get('/registerrooms/:name/:id',function(req,res){
//   res.render('hostel/registerrooms');
// });

router.post('/registerhostels',function(req,res){
  const newHostel = new Hostel();
  newHostel.name =req.body.name;
  newHostel.location =req.body.location;
  newHostel.totalrooms=req.body.totalrooms;
  newHostel.save()
  .then(hostel=>{
    res.redirect('/users/index');
  });
});

//load roomregistration form
router.get('/registerrooms/:name/:id',function(req,res){
  Hostel.findOne({_id:req.params.id},function(err,room){
    if(err){
    console.log(err);
    }
    var model={
      room:room
    };
    res.render('hostel/registerrooms',model);
  });
});

//insert rooms to database
router.post('/registerrooms/:id', (req,res) => {
   Hostel.findOne({_id:req.params.id})
   .then(room =>{
     const newRoom = {
       roomnumber:req.body.roomnumber,
       space:req.body.space,
       hostel:req.body.hostel
     }
    // Add rooms array
     room.rooms.unshift(newRoom);
      room.save()
      //new Room(newRoom).save()
      .then(room => {
        res.redirect(`/hostel/rooms/${room.name}/${room.id}`);
      });
   });
});

//get rooms page
router.get('/rooms/:name/:id',function(req,res){
    Hostel.findOne({_id:req.params.id}, function(err,hostel){
    if(err){
        console.log(err);
      }
      var model={
        hostel:hostel
      }
      res.render('hostel/rooms',model)
    })
});

//load room details
router.get('/book/:name/:id',function(req,res){
  Hostel.findOne({id:req.params.id},function(err,book){
    if(err){
    console.log(err);
    }
    var model={
      book:book
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
   res.render('hostel/book');
  });
 });

// //post Book
router.post('/book/:name/:id',function(req,res){
   Hostel.findOne({_id:req.params.id})
   .then(user=>{
     const roomUser ={
       name:req.body.name
     }
     user.rooms.unshift(roomUser);
     user.save()
     .then(user=>{
       res.redirect('users/index');
     })
   })
 });



















module.exports=router;
