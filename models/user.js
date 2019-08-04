
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const USerSchema= new Schema({
  googleID:{type:String},
  email:{type:String,required:true},
  firstName:{type:String},
  lastName:{type:String},
  phone:{type:Number},
  location:{type:String},
  image:{type:String},
  usertype:{type:String},
  password:{type:String},

  sentRequest:[{
    firstName:{type:String, default:''}
  }],

  request:[{
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    firstName:{type:String,default:''}
  }],
  friendsList:[{
    friendId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    friendName:{type:String,default:''}
  }],
  totalRequest:{type:Number,default:0}
});

mongoose.model('users',USerSchema);
