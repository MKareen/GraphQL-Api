import {
    UNAUTHORIZED_CODE,
    BAD_REQUEST_CODE,
    GONE_CODE,
    FORBIDDEN_CODE,
    SERVICE_UNAVAILABLE_CODE,
    CONFLICT_CODE,
    NOT_FOUND_CODE
} from '../configs/status-codes';
import {
    PERMISSION_DENIED,
    SOMETHING_WENT_WRONG,
    SERVICE_UNAVAILABLE
} from '../configs/constants';
import { GraphQLError } from 'graphql';

export class ValidationError extends GraphQLError {
    constructor(errors) {
        super();
        this.state = errors.reduce((result, error) => {
            if (Object.prototype.hasOwnProperty.call(result, error.key)) {
                result[error.key].push(error.message);
            } else {
                result[error.key] = [error.message];
            }

            return result;
        }, {});
    }
}

export class AuthError extends Error {
    status = UNAUTHORIZED_CODE;
    message;
    errors;

    constructor(message, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class BadRequest extends Error {
    status = BAD_REQUEST_CODE;
    message;
    errors;

    constructor(message, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class Conflict extends Error {
    status = CONFLICT_CODE;
    message;
    errors;

    constructor(message, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class NotFound extends Error {
    status = NOT_FOUND_CODE;
    message;
    errors;

    constructor(message, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class Forbidden extends Error {
    status = FORBIDDEN_CODE;
    message = PERMISSION_DENIED;
    errors;

    constructor(errors = null) {
        super();
        this.errors = errors;
    }
}

export class Gone extends Error {
    status = GONE_CODE;
    message;
    errors;

    constructor(message, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class ExternalApiError extends Error {
    status = SERVICE_UNAVAILABLE_CODE;
    message = SERVICE_UNAVAILABLE;
    errors;

    constructor(errors) {
        super();
        this.errors = errors;
    }
}

export class ServiceUnavailable extends Error {
    status = BAD_REQUEST_CODE;
    message = SOMETHING_WENT_WRONG;
    errors;

    constructor(message, errors = null) {
        super();

        if (errors) {
            this.message = message;
            this.errors = errors;
        } else {
            if (typeof message === 'string') {
                this.message = message;
            } else {
                this.errors = message;
            }
        }
    }
}
