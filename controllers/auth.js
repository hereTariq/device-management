import httpStatus from 'http-status';
import catchAsyncError from '../middlewares/catchAsyncError.js';
import { createAccount, loginUser } from '../services/authService.js';

export const signup = catchAsyncError(async (req, res, next) => {
    await createAccount(req.body);
    res.status(httpStatus.CREATED).json({
        success: true,
        message: 'User registered successfully!',
    });
});

export const login = catchAsyncError(async (req, res, next) => {
    const { user, token } = await loginUser(req.body.email, req.body.password);
    res.status(httpStatus.OK).json({
        success: true,
        token,
        user,
    });
});
