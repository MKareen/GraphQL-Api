import validator from 'validator';
import { ValidationError } from '../../../errors';
import { INVALID, REQUIRED } from '../../../configs/constants';

export class AuthValidator {
    static login(payload) {
        let errors = [];

        if (validator.isEmpty(payload.email)) {
            errors.push({ key: 'email', message: REQUIRED('Email') });
        }

        if (!validator.isEmail(payload.email)) {
            errors.push({ key: 'email', message: INVALID('Email') });
        }

        if (validator.isEmpty(payload.password)) {
            errors.push({ key: 'password', message: REQUIRED('Password') });
        }

        if (errors.length) {
            throw new ValidationError(errors);
        }
    }

    static signup(payload) {
        let errors = [];

        if (validator.isEmpty(payload.fullName)) {
            errors.push({ key: 'fullName', message: REQUIRED('Full Name') });
        }

        if (validator.isEmpty(payload.email)) {
            errors.push({ key: 'email', message: REQUIRED('Email') });
        }

        if (!validator.isEmail(payload.email)) {
            errors.push({ key: 'email', message: INVALID('Email') });
        }

        if (validator.isEmpty(payload.password)) {
            errors.push({ key: 'password', message: REQUIRED('Password') });
        }

        if (errors.length) {
            throw new ValidationError(errors);
        }
    }
}
