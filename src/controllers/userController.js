const zod = require("zod");
const User = require("../models/User");

const signupBody = zod.object({
    email: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string().min(8),
    mobileNumber: zod.string()
})

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
        const { success, error } = signupBody.safeParse(req.body)
        if (!success) {
            return res.status(400).json({
                success: false,
                message: "Incorrect inputs",
                errors: error.formErrors.fieldErrors
            })
        }
        console.log('Checking email:', req.body.email);  // Debug log
        const existingUser = await User.findOne({
            email: req.body.email
        })

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already taken",
                errors: {
                    email: "email already exists"
                }
            })
        }

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
        const { success, data, error } = updateUserBody.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                success: false,
                message: "Incorrect inputs",
                errors: error.formErrors.fieldErrors
            })
        }
        const id = req.params.userId;
        console.log("User Id in update controller: ", id);

        const user = await User.findByIdAndUpdate(id, data, { new: true })
        console.log("User  after updating : ", user);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not found!"
            })
        }
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