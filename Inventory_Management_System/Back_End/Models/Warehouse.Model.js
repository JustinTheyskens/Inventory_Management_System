// const mongoose = require('mongoose');
// const ItemModel = require('./Item.Model');
import mongoose from "mongoose";

const warehouseSchema = new mongoose.Schema({
    id : {
        type : Number,
        required : true
    },
    location : String,
    max_capacity : String,
    current_capacity : Number,
    item : [] // How do I import itemSchema into this properly?
});

export const warehouse = mongoose.Model('warehouse', warehouseSchema);

// class Warehouse
// {
//     id;
//     location;
//     max_capacity;
//     current_capacity;
//     items;
// }

// module.exports = Warehouse;