module.exports = async function (request, response, dependencies) {
    try {
        const categories = [];

        await dependencies.db.collection('categories').find().forEach(category => categories.push(category));

        response.status(200).send(categories);
    }
    catch (error) {
        response.status(500).send(error);
    }
};