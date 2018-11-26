import validator from 'validator';
import { AuthError, ValidationError } from '../../../errors';
import { INVALID, REQUIRED } from '../../../configs/constants';

export class UserValidator {
    static edit(payload, user) {
        let errors = [];

        if (validator.isEmpty(payload.fullName)) {
            errors.push({ key: 'fullName', message: REQUIRED('Full Name') });
        }

        if (!validator.isEmail(payload.email)) {
            errors.push({ key: 'email', message: INVALID('Email') });
        }

        if (validator.isEmpty(payload.email)) {
            errors.push({ key: 'email', message: REQUIRED('Email') });
        }

        if (errors.length) {
            throw new ValidationError(errors);
        }

        if (!user) {
            throw new AuthError('Unauthorized');
        }
    }
}
