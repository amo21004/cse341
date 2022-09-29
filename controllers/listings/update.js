module.exports = async function (request, response, dependencies) {
    try {
        const errors = dependencies.validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const id = request.params.listing_id;

        const listing = {
            $set: request.body
        };

        await dependencies.db.collection('listings').updateOne({ _id: dependencies.objectId(id) }, listing, function (error, result) {
            if (error) {
                return response.status(400).send("Update failed");
            }

            return response.status(204).send(
                "Updated listing with ID: " + id
            );
        });
    }
    catch(error) {
        response.status(500).send(error);
    }
};