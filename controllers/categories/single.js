module.exports = async function (request, response, dependencies) {
    try {
        const errors = dependencies.validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const id = request.params.category_id;

        const category = await dependencies.db.collection('categories').findOne({ _id: dependencies.objectId(id) });

        if (!category) {
            response.status(404).send('No category matches that ID');

            return;
        }

        response.status(200).send(category);
    }
    catch(error) {
        response.status(500).send(error);
    }
};