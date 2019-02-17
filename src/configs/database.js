import { initModels } from '../models';
import {
    mongoUrl
} from '../helpers/configs';
import mongoose from 'mongoose';

function mongoConnection() {
    function connect() {
        const timeout = 30 * 1000;
        const options = {
            connectTimeoutMS: timeout,
            keepAlive: timeout,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 500,
            useNewUrlParser: true,
            useCreateIndex: true
        };

        return mongoose.connect(mongoUrl, options);
    }

    connect();
    mongoose.set('debug', true);

    initModels(mongoose);

    mongoose.connection.on('error', (err) => {
        console.error('Mongoose connection: error - ' + err);
    });

    mongoose.connection.on('connected', () => {
        console.info('Mongoose connection: connected');
    });

    mongoose.connection.on('open', () => {
        console.info('Mongoose connection: open');
    });

    mongoose.connection.on('reconnected', () => {
        console.info('Mongoose connection: reconnected');
    });

    mongoose.connection.on('disconnected', () => {
        console.warn('Mongoose connection: disconnected');
    });

    process.on('SIGINT', () => {
        mongoose.disconnect(() => {
            process.exit(0);
        });
    });

    return mongoose;
}

export default mongoConnection();
