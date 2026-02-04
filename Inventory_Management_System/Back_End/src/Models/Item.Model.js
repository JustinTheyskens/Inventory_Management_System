import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({

    name : String,
    sku : 
    { 
        type : String, 
        unique : true,
        index : true
    },
    category : 
    {
        type : String,
        index : true
    },
    description: String
});

export const Item = mongoose.model('item', itemSchema);
