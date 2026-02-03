import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({

    item: 
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Item",
        required : true
    },
    warehouse: 
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Warehouse",
        required : true
    },
    quantity:
    {
        type : Number,
        required : true,
        min : 0
    }
});

// no duplicate rows
inventorySchema.index(
    {
        item: 1,
        warehouse: 1
    },
    {
        unique : true
    }
);

export const Inventory = mongoose.model('inventory', inventorySchema);