const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const schoolsSchema = new Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId,
        auto:true,
    },
    name:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    latitude:{
        type:Number,
        required:true,
    },
    longitude:{
        type:Number,
        required:true,
    },

});

const School = mongoose.model('School', schoolsSchema);

module.exports = School;