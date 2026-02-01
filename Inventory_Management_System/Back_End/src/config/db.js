//const mongoose = require('mongoose');
import mongoose from 'mongoose';

export async function connectDB(){
    const DB_URL = "mongodb://127.0.0.1:27017/admin";

    try{
        await mongoose.connect(DB_URL); 
        console.log(`Connected to DB: ${DB_URL}`);

    } catch (error){
        console.error(`MongoDB connection error: ${error}`);

        // Ends process w/ an error (1)
        process.exit(1);
    }
}