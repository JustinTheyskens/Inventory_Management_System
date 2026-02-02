import mongoose from "mongoose";


const warehouseSchema = new mongoose.Schema({
    // id : {
    //     type : Number,
    //     required : true
    // },
    location : String,
    max_capacity : Number,
    current_capacity : Number,
    items : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref: "Item"
        }
    ]
});

export const Warehouse = mongoose.model('Warehouse', warehouseSchema);