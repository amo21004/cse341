module.exports = async function (request, response, dependencies) {
    try {
        const errors = dependencies.validation_result(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const user = await dependencies.db.collection('users').findOne({
            oauth_id: request.session.user.id,
            oauth_login: request.session.user.login,
            oauth_provider: request.session.user.provider
        });

        if (!user) {
            response.status(400).send('Failed');
        }

        const listing = request.body;

        listing.user_id = dependencies.object_id(user._id);

        dependencies.db.collection('listings').insertOne(listing, function (error, result) {
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