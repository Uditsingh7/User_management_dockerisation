const { Router } = require('express');
const router = Router();
const userRouter = require('./userRoutes');

router.get("/", (req, res) => {
    res.end("It is the end!")
})

router.use("/user", userRouter);



module.exports = { router };