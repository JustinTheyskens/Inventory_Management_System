import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    // id : {
    //     type : Number,
    //     required : true

    // },
    name : String,
    sku : { 
        type : String, 
        unique : true,
        index : true
    },
    category : 
    {
        type : String,
        index : true
    }
});

export const Item = mongoose.model('item', itemSchema);

// class Item
// {
//     id;
//     name;
//     sku;
//     quantity;

// }

// module.exports = Item;

// const mongoose = require('mongoose');