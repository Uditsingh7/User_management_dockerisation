const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
async function connectDb() {
    try {
        let uri;

        if (process.env.NODE_ENV === 'test') {
            // Use a mock MongoDB URI for testing
            uri = 'mongodb://localhost:27017/testDB';
        } else {
            // Use the MongoDB URI from the environment variables
            uri = process.env.MONGODB_URI;
        }
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error("Connection to mongodb failed", error.message);
        process.exit(1); //Exit process with failure
    }
}

module.exports = connectDb();