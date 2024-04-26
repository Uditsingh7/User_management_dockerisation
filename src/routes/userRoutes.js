const express = require('express');
const { createUser, getAllUsers, updateUser, deleteUser } = require('../controllers/userController')

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: User Controller 
 *   description: APIs for user management
 */

/**
 * @openapi
 * /api/v1/user/signup:
 *   post:
 *     tags:
 *       - User Controller
 *     summary: Sign up a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 default: johndoe@mail.com
 *               password:
 *                 type: string
 *                 default: johnDoe20!@
 *               firstName:
 *                  type: string
 *                  default: John
 *               lastName:
 *                  type: string
 *                  default: travolta
 *               mobileNumber:
 *                  type: string
 *                  default: 1234567890
 *     responses:
 *       '201':
 *         description: Created
 *       '409':
 *         description: Conflict
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Server Error
 */
router.post('/signup', createUser);

/**
 * @openapi
 * /api/v1/user/users:
 *   get:
 *     tags:
 *       - User Controller
 *     summary: Get all Users
 *     responses:
 *       '200':
 *         description: Success
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Server Error
 */

router.get('/users', getAllUsers);

/**
 * @openapi
 * /api/v1/user/{id}:
 *   put:
 *     tags:
 *       - User Controller
 *     summary: Update User creds
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       '200':
 *         description: Updated
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Server Error
 */
router.put('/:userId', updateUser);

/**
 * @openapi
 * /api/v1/user/{id}:
 *   delete:
 *     tags:
 *       - User Controller
 *     summary: Delete a user by Id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the todo to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Deleted
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Server Error
 */
router.delete('/:userId', deleteUser);



module.exports = router;
