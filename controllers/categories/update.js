module.exports = async function (request, response, dependencies) {
    try {
        const errors = dependencies.validation_result(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const id = request.params.category_id;

        const category = {
            $set: request.body
        };

        await dependencies.db.collection('categories').updateOne({ _id: dependencies.object_id(id) }, category, function (error, result) {
            if (error) {
                return response.status(400).send('Update failed');
            }

            return response.status(204).send(
                'Updated category with ID: ' + id
            );
        });
    }
    catch (error) {
        response.status(500).send(error);
    }
};