module.exports = async function (request, response, dependencies) {
    const categories = [];

    await dependencies.db.collection("categories").find().forEach(category => categories.push(category));

    response.status(200).send(categories);
};