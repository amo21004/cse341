module.exports = function (uri, mc) {
    const client = new mc.MongoClient(uri);

    const db = client.db('directory');

    return [db, mc.ObjectId];
};