const request = require('supertest');
const server = require('../index.js');
const User = require('../src/models/User.js');
const mongoose = require('mongoose');
const { closeDb } = require("../db.js");

const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();


// Set the env to test
process.env.NODE_ENV = "test";


// Mock User data for testing
const mockUser = {
    email: 'testuser@example.com',
    firstName: 'Test',
    lastName: 'User',
    password: 'testpassword',
    mobileNumber: '1234567890'
};

describe('User Management API Endpoints', () => {
    let userId;

    // Setup: Create a user before running the tests
    beforeAll(async () => {
        const res = await request(server)
            .post('/api/v1/user/signup')
            .send(mockUser);
        userId = res.body.data._id;
    });

    // Close the server after running all the test cases
    afterAll(async () => {
        await User.findByIdAndDelete(userId);
        await closeDb();
        await server.close();
        mongoose.connection.close();

    });

    it('should create a new user', async () => {
        const mockCreateUser = {
            email: 'mockcreateuser@example.com',
            firstName: 'Test23',
            lastName: 'User23',
            password: 'tessword',
            mobileNumber: '2928345860'
        }
        const res = await request(server)
            .post('/api/v1/user/signup')
            .send(mockCreateUser);
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.message).toEqual('User created successfully');
        expect(res.body.data).toHaveProperty('_id');
        expect(res.body.data.email).toEqual(mockCreateUser.email);

        // delete the created user
        const deletedUser = await User.findByIdAndDelete(res.body.data._id);
        expect(deletedUser).toBeTruthy();
    });

    // TO get all Users
    it('should get all users', async () => {
        const res = await request(server)
            .get('/api/v1/user/users');
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    // TO update the user
    it('should update a user by ID', async () => {
        console.log("userID in update test case: ", userId)
        const updatedUserData = {
            email: 'updatedemail@example.com',
            firstName: 'UpdatedFirstName'
        };
        // Check if the user exists before attempting to update
        const existingUser = await User.findById(userId);
        console.log("Existing user in test case: ", existingUser);
        expect(existingUser).toBeTruthy();

        const res = await request(server)
            .put(`/api/v1/user/${userId}`)
            .send(updatedUserData);
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.message).toEqual('User updated successfully!');
        expect(res.body.data.email).toEqual(updatedUserData.email);
        expect(res.body.data.firstName).toEqual(updatedUserData.firstName);
    });

    // To delete the user by id
    it('should delete a user by ID', async () => {
        const res = await request(server)
            .delete(`/api/v1/user/${userId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.message).toEqual('User deleted Successfully');
    });
});