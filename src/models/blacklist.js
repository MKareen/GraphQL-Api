export default (mongoose) => {
    let BlacklistSchema = mongoose.Schema({
        token: String
    });

    return mongoose.model('Blacklist', BlacklistSchema);
}
