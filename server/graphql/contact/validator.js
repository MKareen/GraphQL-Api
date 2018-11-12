import validator from 'validator';
import { AuthError, ValidationError } from '../../errors';
import { REQUIRED } from '../../configs/constants';

export class ContactValidator {
    static saveContact(payload, user) {
        let errors = [];

        if (validator.isEmpty(payload.firstName)) {
            errors.push({ key: 'firstName', message: REQUIRED('FirstName') });
        }

        if (validator.isEmpty(payload.phone)) {
            errors.push({ key: 'phone', message: REQUIRED('Phone') });
        }

        if (errors.length) {
            throw new ValidationError(errors);
        }

        if (!user) {
            throw new AuthError('Unauthorized');
        }
    }

    static checkAuth(user) {
        if (!user) {
            throw new AuthError('Unauthorized');
        }
    }

}
