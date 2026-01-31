// class Item
// {
//     id;
//     name;
//     sku;
//     quantity;

// }

// module.exports = Item;

// const mongoose = require('mongoose');

import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    id : {
        type : Number,
        required : true
    },
    name : String,
    sku : String,
    quantity : Number
});

export const item = mongoose.Model('item', itemSchema);