import mongoose from "mongoose";


const warehouseSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    location : String,
    max_capacity : Number,
    current_capacity : Number,
});

export const Warehouse = mongoose.model('Warehouse', warehouseSchema);