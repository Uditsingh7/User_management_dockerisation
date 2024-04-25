const zod = require("zod"); // importing zod middleware for validating input
const User = require("../models/User");

// create user req body  validation schema using Zod
const signupBody = zod.object({
    email: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string().min(8),
    mobileNumber: zod.string()
})

// update user req body  validation schema using Zod
const updateUserBody = zod.object({
    email: zod.string().email().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    mobileNumber: zod.string().optional(),
    password: zod.string().min(8).optional()
});


// Create a new user
const createUser = async (req, res) => {
    try {
         // check for zod validation  error 
        const { success, error } = signupBody.safeParse(req.body)
        //and throw if there is one
        if (!success) {
            return res.status(400).json({
                success: false,
                message: "Incorrect inputs",
                errors: error.formErrors.fieldErrors
            })
        }

        //checking if the user already exists in the database
        const existingUser = await User.findOne({
            email: req.body.email
        })

        // send error responseif exists
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already taken",
                errors: {
                    email: "email already exists"
                }
            })
        }
        // If all fine, create the  user
        const user = await User.create({
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mobileNumber: req.body.mobileNumber
        })
        res.status(200).json({
            success: true,
            message: "User created successfully",
            data: user
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message || "Error Message"
        });
    }
}


const getAllUsers = async (req, res) => {
    try {
        // Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;

        // Sorting and Ordering
        const sortField = req.query.sort || 'createdAt';
        const sortOrder = req.query.order === 'desc' ? -1 : 1;

        const users = await User.find({}).select("-password").
            skip(skip).limit(limit).sort({ [sortField]: sortOrder });
        // Count total number of records
        const totalUsers = await User.countDocuments();

        res.status(200).json({
            success: true,
            pagination: {
                totalUsers,
                totalPages: Math.ceil(totalUsers / limit),
                currentPage: page,
                hasNextPage: page < Math.ceil(totalUsers / limit),
                hasPrevPage: page > 1
            },
            data: users,

        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message || "Error Message"
        });
    }
}

const updateUser = async (req, res) => {
    try {
         // check for zod validation  error 
        const { success, data, error } = updateUserBody.safeParse(req.body);
        //and throw if there is one
        if (!success) {
            return res.status(400).json({
                success: false,
                message: "Incorrect inputs",
                errors: error.formErrors.fieldErrors
            })
        }
        const id = req.params.userId;

        // Find the useer byid and then update
        const user = await User.findByIdAndUpdate(id, data, { new: true })

        // if not found, throw error
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not found!"
            })
        }

        // send success response
        res.status(200).json({
            success: true,
            message: "User updated successfully!",
            data: user
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message || "Error Message"
        });
    }
}


const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'No user with the provided ID'
            })
        }
        res.json({
            success: true,
            message: "User deleted Successfully",
        })
    } catch (error) {

        console.log(error);
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid user ID'
            });
        }
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message || "Error Message"
        });
    }
}


module.exports = {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser
}