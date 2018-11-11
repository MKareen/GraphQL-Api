import mongoose from 'mongoose';
const Contact = mongoose.model('Contact');

export class ContactService {

    constructor() { }

    static async getAll() {
        return await Contact.find();
    }

    static async getById(_id) {
        return await Contact.findOne({ _id });
    }

    static async create(contact) {
        return await Contact.create(contact);
    }

    static async getUserFavourites(id) {
        return await Contact.find({
            owner: id,
            isFavourite: true
        });
    }

    static async search(query) {
        return await Contact.find(
            {
              $text: { $search: query }
            },
            {
              score: { $meta: "textScore" }
            }
          ).sort({
            score: { $meta: "textScore" }
          });
    }

    static async getByUserId(id) {
        return await Contact.find({ owner: id });
    }

    static async update(_id, contact) {
        const options = { new: true };

        return Contact.findOneAndUpdate({ _id }, contact, options);
    }

    static async delete(_id) {
        return Contact.findOneAndRemove({ _id });
    }

}
