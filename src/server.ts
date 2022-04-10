import dotenv from 'dotenv';

dotenv.config();
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import Logging from './library/logging';
import authorRoutes from './routes/author';
import bookRoutes from './routes/book';
import saleRoutes from './routes/pagination';
const app = express();

/** Connect to Mongo */
mongoose
    .connect(`${process.env.DATABASE}`)
    .then(() => {
        Logging.info('Mongo connected successfully.');
        StartServer();
    })
    .catch((error) => Logging.error(error));

const StartServer = () => {
    app.use((req, res, next) => {
        Logging.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            Logging.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });

        next();
    });

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    /** Rules of our API */
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    /** Routes */
    app.use('/authors', authorRoutes);
    app.use('/books', bookRoutes);
    app.use('/sales', saleRoutes);

    /** Healthcheck */
    app.get('/ping', (req, res, next) => res.status(200).json({ hello: 'Hello World. My Name is Sinh' }));

    /** Error handling */
    app.use((req, res, next) => {
        const error = new Error('Not found');

        Logging.error(error);

        res.status(404).json({
            message: error.message
        });
    });

    http.createServer(app).listen(process.env.SERVER_PORT, () => Logging.info(`Server is running on port ${process.env.SERVER_PORT}`));
};
