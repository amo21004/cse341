module.exports = async function (request, response, dependencies) {
    const listing = request.body;

    if (Object.keys(listing).length === 0) {
        return response.status(400).send('No listing information sent!');
    }

    dependencies.db.collection("listings").insertOne(listing, function (error, result) {
        if (error) {
            return response.status(500).send("Insert failed");
        }

        return response.status(201).send(result.insertedId.toString());
    });
};