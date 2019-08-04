const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const roomSchema= new Schema({
    name:{type:String,required:true},
    roomnumber:{type:String,default: 1},
    status:{type:Boolean,default:false},
    image:{type:String},
    space:{type:Number}
});

module.exports=mongoose.model('rooms',roomSchema);
