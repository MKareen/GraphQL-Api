import { ContactService } from '../../services';
import { ADDRGETNETWORKPARAMS } from 'dns';

export class ContactResolver {
    static async addContact(payload, user) {
        try {
            payload.owner = user._id;

            const contact = await ContactService.create(payload);

            return contact;
        } catch(err) {
            console.log(err);
        }
    }

    static async editContact(payload) {
        try {
            const contact = await ContactService.getById(paylaod.id);

            if (!contact) {
                throw new Error('Contact does not exist');
            }

            return await ContactService.update(payload.id, contact);
        } catch(err) {
            console.log(err);
        }
    }

    static async deleteContact(payload) {
        try {
            return await ContactService.delete(payload.id);
        } catch(err) {
            throw err
        }
    }

    static async addToFavourites(payload) {
        try {
            const contact = await ContactService.getById(payload.id);

            const attributes = {
                isFavourite: !contact.isFavourite
            }

            return await ContactService.update(payload.id, attributes);
        } catch(err) {
            console.log(err);
        }
    }

    static async searchContact(payload, user) {
        try {
            if (payload.q) {
                let searchresult = await ContactService.search(payload.q);
                return searchresult.filter(res => res.owner === user._id.toString());
            } else {
                return await ContactService.getByUserId(user._id);
            }
        } catch(err) {
            console.log(err);
        }
    }

    static async getByUser(user) {
        try {
            return await ContactService.getByUserId(user._id);
        } catch (err) {
            console.log(err);
        } 
    }
}