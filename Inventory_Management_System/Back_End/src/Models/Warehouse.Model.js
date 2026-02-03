import mongoose from "mongoose";


const warehouseSchema = new mongoose.Schema({

    location : String,
    max_capacity : Number,
    current_capacity : Number,
});

export const Warehouse = mongoose.model('Warehouse', warehouseSchema);