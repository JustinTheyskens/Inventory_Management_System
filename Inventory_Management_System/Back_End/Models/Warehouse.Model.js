const mongoose = require('mongoose');
const ItemModel = require('./Item.Model');

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

// class Warehouse
// {
//     id;
//     location;
//     max_capacity;
//     current_capacity;
//     items;
// }

// module.exports = Warehouse;