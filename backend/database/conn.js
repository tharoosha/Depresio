import mongoose from "mongoose";
import {config} from 'dotenv';

async function connect(){

    try {
        config();
        const mongoString = 'mongodb+srv://tharooshavihidun:qgCrEdwkFZaYUPwv@cluster0.xaybn5f.mongodb.net/?retryWrites=true&w=majority';
        const database = await mongoose.connect(mongoString);
        console.log('Database Connected');
        return database;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error; // Rethrow the error to be caught in the calling function
    }
}

export default connect;



