import jwt from 'jsonwebtoken';
import ErrorHandler from '../utils/errorHandler.js';
import catchAsyncError from './catchAsyncError.js';

export const authentication = catchAsyncError(async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return next(new ErrorHandler(401, 'Invalid Token.'))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        return next(new ErrorHandler(401, 'Token is invalid or expired'));
    }

    req.user = decoded
    next();
})