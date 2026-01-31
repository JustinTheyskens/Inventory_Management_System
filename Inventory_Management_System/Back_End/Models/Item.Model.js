// class Item
// {
//     id;
//     name;
//     sku;
//     quantity;

// }

// module.exports = Item;

const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    id : {
        type : Number,
        required : true
    },
    name : String,
    sku : String,
    quantity : Number
});

module.exports = mongoose.Model('item', itemSchema);