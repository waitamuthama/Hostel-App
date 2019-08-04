const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const hostelSchema= new Schema({
    name:{type:String,required:true},
    location:{type:String,required:true},
    totalrooms:{type:Number,default:'0'},
    test:{type:String},
    rooms:[{
        roomnumber:{type:String,default: 1},
        status:{type:Boolean,default:false},
        image:{type:String},
        space:{type:Number},
        hostel:{type:String},
        users:[{
          name:{type:String}
        }]
    }]
});
module.exports=mongoose.model('hostels',hostelSchema);
