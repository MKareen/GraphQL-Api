import User from './user';
import Contact from './contact';
import Blacklist from './blacklist';

export function initModels(mongoose) {
    User(mongoose);
    Contact(mongoose);
    Blacklist(mongoose);
}
