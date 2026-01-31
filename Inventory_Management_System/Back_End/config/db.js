const mongoose = require('mongoose');

export async function connectDB(){
    const DB_URL = "";

    try{
        await mongoose.connect(DB_URL); 

    } catch (error){
        console.error("Error: Failed to connect");

        // Ends process w/ an error (1)
        process.exit(1);
    }
}