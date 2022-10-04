module.exports = async function (request, response, dependencies) {
    try {
        const errors = dependencies.validation_result(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const category = request.body;

        dependencies.db.collection('categories').insertOne(category, function (error, result) {
            if (error) {
                return response.status(500).send('Insert failed');
            }

            return response.status(201).send(result.insertedId.toString());
        });
    }
    catch (error) {
        response.status(500).send(error);
    }
};