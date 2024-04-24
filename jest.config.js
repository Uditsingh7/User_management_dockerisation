module.exports = {
    testEnvironment: 'node',
    testTimeout: 10000, // Increase timeout to 10 seconds
    verbose: true,
    detectOpenHandles: true, // Detect open handles to troubleshoot asynchronous operations
    setupFilesAfterEnv: ['./jest.setup.js'], // Optional: Add setup file for custom Jest configurations
};
