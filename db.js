const mongoose = require('mongoose');

async function connectDb() {
    try {
        await mongoose.connect('mongodb://localhost:27017/test');
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error("Connection to mongodb failed", error.message);
        process.exit(1); //Exit process with failure
    }
}

module.exports = connectDb();