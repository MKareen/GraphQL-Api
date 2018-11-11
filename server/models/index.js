import User from './user';
import Contact from './contact';

export function initModels(mongoose) {
    User(mongoose);
    Contact(mongoose);
}