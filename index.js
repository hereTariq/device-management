import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import errorMiddleware from './middlewares/errorMiddleware.js';
import connectDatabase from './config/database.js';
import ErrorHandler from './utils/errorHandler.js';
import logger from './config/logger.js';
import httpStatus from 'http-status';
import routes from './routes/index.js'
import './cron/deviceCron.js'

config();

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

app.use(cors());

const limiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 100,
    statusCode: 429,
    message: { success: false, message: "Too many requests, please try again later." },
    standardHeaders: true,
    legacyHeaders: false
})

app.use(limiter)
// connect database
connectDatabase();

app.get('/', (req, res) => {
    res.status(httpStatus.OK).json({
        msg: 'server is working fine!',
        success: true,
    });
});

// api routes
app.use(routes);

// 404 error middleware
app.use((req, res, next) => {
    logger.error('NotFound Error');
    next(new ErrorHandler(httpStatus.NOT_FOUND, 'Route Not Found'));
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    logger.info('server is running on http://localhost:' + PORT)
);
