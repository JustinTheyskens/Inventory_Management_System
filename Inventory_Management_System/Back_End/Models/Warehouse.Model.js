import mongoose from "mongoose";


const warehouseSchema = new mongoose.Schema({
    // id : {
    //     type : Number,
    //     required : true
    // },
    location : String,
    max_capacity : String,
    current_capacity : Number,
    items : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref: "Item"
        }
    ]
});

export const Warehouse = mongoose.model('Warehouse', warehouseSchema);

// const mongoose = require('mongoose');
// const ItemModel = require('./Item.Model');

// class Warehouse
// {
//     id;
//     location;
//     max_capacity;
//     current_capacity;
//     items;
// }

// module.exports = Warehouse;