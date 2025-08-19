import httpStatus from 'http-status';
import userModel from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createAccount = async (userData) => {
    const existUser = await userModel.findOne({ email: userData.email });
    if (existUser) {
        throw new ErrorHandler(httpStatus.BAD_REQUEST, "Email already in use.");
    }

    await userModel.create(userData);
};

export const loginUser = async (email, password) => {
    const existUser = await userModel.findOne({ email });
    if (!existUser) {
        throw new ErrorHandler(httpStatus.BAD_REQUEST, "Account not found with this email.");
    }

    const isValidPassword = await existUser.matchPassword(password);
    if (!isValidPassword) {
        throw new ErrorHandler(httpStatus.BAD_REQUEST, "Email or Password is incorrect.");
    }

    const { password: pwd, __v, ...user } = existUser.toObject();
    const token = existUser.generateJWT();

    return { user, token };
};
