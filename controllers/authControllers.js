const bcrypt = require('bcryptjs')
const User = require('../module/user')
const ErrorHandler = require("../utils/errorHandelr");
const dotenv = require('dotenv');
const CatchAsyncError = require('../middleware/CatchAsyncError');
const sendToken = require('../utils/JwtCreate');
dotenv.config();

exports.register = CatchAsyncError(async (req, res, next) => {

    const { first_name, last_name, email, password } = req.body

    let user = await User.findOne({
        email
    })

    if (user) {
        return next(new ErrorHandler("user already exist", 400));
    }

    let hashed_password = await bcrypt.hash(password, 10);

    const createuser = await User.create({
        first_name, last_name, email,
        password: hashed_password,
    });

    sendToken(createuser, 201, res);

})


exports.login = CatchAsyncError(async (req, res, next) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({ email })

    if (!user) {
        return next(new ErrorHandler("user not found", 401));
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    // const token = createJWT(user._id);
    sendToken(user, 200, res)

})

exports.logout = CatchAsyncError(async (req, res, next) => {

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });

    // next();
})

exports.verifyuser = CatchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});

exports.GetAllUsers = CatchAsyncError(async (req, res, next) => {
    const users = await User.find();
    res.status(200).send(users);

})
exports.GetSingleUser = CatchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).send(user);

})
exports.DeleteUser = CatchAsyncError(async (req, res, next) => {
    const { id } = req.params
    const users = await User.findByIdAndDelete(id);
    res.status(200).send(users);
})

exports.UpdateUserPasword = CatchAsyncError(async (req, res, next) => {

    const {
        password
    } = req.body
    let hashed_password = await bcrypt.hash(password, 10);
    const { id } = req.params;
    const users = await User.findByIdAndUpdate(
        id,
        {
            $set: { password: hashed_password }
        },
        {
            new: true
        }
    )
    res.status(200).send(users);


})

