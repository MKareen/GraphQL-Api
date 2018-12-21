import express from 'express';
import expressGraphQL from 'express-graphql';
import { json, urlencoded } from 'body-parser';
import RateLimit from 'express-rate-limit';
import limiter from './configs/limiter';
import cookieParser from 'cookie-parser';
import graphql from './configs/graphql';
import cors from 'cors';
import corsOptions from './configs/cors';
import logger from 'morgan';
import authentication from './middlewares/authentication';
import tokenChecker from './cron/tokenChecker';

class Application {
    app;

    constructor () {
        this.app = express();
        this.initApp();
    }
    initApp() {
        this.configApp();
        this.configAuthentication();
        this.setParams();
        this.configCron();
        this.configGraphQL();
    }

    configApp() {
        if (this.app.get('env') !== 'production') {
            this.app.use(logger('dev'));
        }

        this.app.use(cors(corsOptions))
                .use(json())
                .use(urlencoded({ extended: true }))
                .use(cookieParser())
                .use(this.createLimiter());
    }

    createLimiter() {
        return new RateLimit(limiter);
    }

    configAuthentication() {
        this.app.use(authentication);
    }

    setParams() {
        this.app.set('json spaces', 4);
    }

    configCron() {
        tokenChecker.start();
    }

    configGraphQL() {
        this.app.use('/graphql', expressGraphQL(graphql));
    }
}

export default () => new Application().app;
