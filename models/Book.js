// book
// Titte
// Author
// Number
// Count
// Bought On
// Price
// Category (Google ENI* in JS and use it in Mongoose)

const mongoose=require("mongoose");
 const categoryEnum={
    Fiction:'fiction',
    NonFiction:'non-fiction',
 };
 Object.freeze(categoryEnum);
 
const BookSchema=mongoose.Schema({
    Author:{
        type:String,
        required: true,
    },
    Title:{
        type:String,
        required:true,
    },
    ISBN:{
        type:Number,
        required: true,
    },
    Count:{
        type:Number,
        required: true,
    },
    BoughtOn:{
        type:Number,
        required: true,
    },
    Price:{
        type:Number,
        required: true,
    },
    Category:{
        type:String,
        enum: Object.values(categoryEnum),
        required:true,
    }
});

const BookModel=mongoose.model("library",BookSchema);

module.exports=BookModel;
