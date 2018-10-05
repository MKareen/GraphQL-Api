import moment from 'moment';

export const VALIDATION_ERROR = `Request didn't pass validation`;
export const PERMISSION_DENIED = 'Permission Denied';
export const SOMETHING_WENT_WRONG = 'Something went wrong, please try again';
export const REQUIRED = resource => `${resource} is required`;
export const INVALID = resource => `${resource} is invalid`;
export const ALREADY_EXISTS = resource => `${resource} already exists!`;
export const NOT_EXISTS = resource => `${resource} doesn't exist!`;
export const INVALID_EMAIL_OR_PASSWORD = 'Invalid email or password';
export const USER_ALREADY_EXISTS_ON_ACCOUNT = 'User with this email is already on this account';
export const SERVICE_UNAVAILABLE = 'Service is temporarily unavailable';
export const BEARER_AUTH = 'bearer';

export const PASSWORD_MAX_LENGTH = 50;

export const ADMIN_AUTH = 'admin_auth';
export const USER_AUTH = 'user_auth';

export const CRONTIMEZONE = 'Asia/Jerusalem';
export const CRONTIME = '0 0 * * *';

export const LENGTH_REQUIRED = (resource, options) => {
    const { min, max } = options;
    if (min && max) {
        return `${resource} must be at least ${min} and maximum ${max} characters!`;
    } else if (min) {
        return `${resource} must be at least ${min} characters!`;
    } else {
        return `${resource} must be maximum ${max} characters!`;
    }
};
export const CONFIRMATION_MESSAGE = (link) => `<p>Please <a href="${link}">click here</a> to confirm your email</p>`;
export const INVITATION_MESSAGE = (link) => `<p>Please <a href="${link}">click here</a> to go to your account</p>`;
export const CONFIRMATION_EMAIL_SUBJECT = 'You have been invited to SerVC';
export const RESET_PASSWORD_MESSAGE = (link) => `<p>Please <a href="${link}">click here</a> to reset your password</p>`;
export const RESET_PASSWORD_EMAIL_SUBJECT = 'Reset password has been requested.';
export const EMAIL_ALREADY_VERIFIED = 'Email already verified';
export const TOKEN_EXPIRED = 'Token is expired';
export const SESSION_EXPIRED = 'Session expired';

export const TWENTY_MINUTES = 20 * 60;
export const DAY_IN_SECONDS = 24 * 60 * 60;
export const WEEK_IN_SECONDS = 7 * 24 * 60 * 60;

export const FILE_UPLOAD_CONFIRMATION_MESSAGE = 'You have a new file in the investors portal';
export const FILE_UPLOAD_CONFIRMATION_SUBJECT = 'SerVc File Manager';
export const QUARTERS_LIST = ['Q1', 'Q2', 'Q3', 'Q4'];

export const CONFIRMATION_MAIL_TEMPLATE_ID = 'd-93d986ab454b4c3383b1e80b0b1f82e9';
export const RESET_PASSWORD_MAIL_TEMPLATE_ID = 'd-57de84a253f94ac38f5eaeffa09136c9';
export const INVITATION_MAIL_TEMPLATE_ID = 'd-7f4f5f5d9840467fba469722702004d2';
export const FILE_ADDED_MAIL_TEMPLATE_ID = 'd-e033471e8a6c40c2aea855490f206602';

export const REFRESH_TOKEN_COOKIE_CONFIG = {
    path: '/',
    expires: moment().add(1, 'M')
            .toDate(),
    httpOnly: true,
    secure: true
};
