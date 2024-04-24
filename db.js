const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const dotenv = require('dotenv');

dotenv.config();

async function connectDb() {
    try {
        if (process.env.NODE_ENV === 'test') {
            mongoServer = await MongoMemoryServer.create();
            const uri = mongoServer.getUri();
            await mongoose.connect(uri);
        } else {
            const uri = process.env.MONGODB_URI;
            await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        }
    }
    catch (error) {
        console.error("Connection to mongodb failed", error.message);
        process.exit(1); //Exit process with failure
    }
}

module.exports = connectDb();