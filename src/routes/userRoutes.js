const express = require('express');
const { createUser, getAllUsers, updateUser, deleteUser } = require('../controllers/userController')

const router = express.Router();


router.post('/signup', createUser);
router.get('/users', getAllUsers);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);



module.exports = router;
