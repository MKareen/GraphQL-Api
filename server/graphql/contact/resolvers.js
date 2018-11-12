import { ContactService } from '../../services';
import { NotFound } from '../../errors';
import { NOT_EXISTS } from '../../configs/constants';

export class ContactResolver {
    static async addContact(payload, user) {
        try {
            payload.owner = user._id;

            const contact = await ContactService.create(payload);

            return contact;
        } catch(err) {
            throw err;
        }
    }

    static async editContact(payload) {
        try {
            const contact = await ContactService.getById(payload.id);

            if (!contact) {
                throw new NotFound(NOT_EXISTS('Contact'));
            }

            return await ContactService.update(payload.id, contact);
        } catch(err) {
            throw err;
        }
    }

    static async deleteContact(payload) {
        try {
            return await ContactService.delete(payload.id);
        } catch(err) {
            throw err;
        }
    }

    static async addToFavourites(payload) {
        try {
            const contact = await ContactService.getById(payload.id);

            const attributes = {
                isFavourite: !contact.isFavourite
            };

            return await ContactService.update(payload.id, attributes);
        } catch(err) {
            throw err;
        }
    }

    static async searchContact(payload, user) {
        try {
            if (payload.q) {
                let searchResult = await ContactService.search(payload.q);

                return searchResult.filter(res => res.owner === user._id.toString());
            } else {
                return await ContactService.getByUserId(user._id);
            }
        } catch(err) {
            throw err;
        }
    }

    static async getByUser(user) {
        try {
            return await ContactService.getByUserId(user._id);
        } catch (err) {
            throw err;
        } 
    }
}
