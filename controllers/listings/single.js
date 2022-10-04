module.exports = async function (request, response, dependencies) {
    try {
        const errors = dependencies.validation_result(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const id = request.params.listing_id;

        const listing = await dependencies.db.collection('listings').findOne({ _id: dependencies.object_id(id) });

        if (!listing) {
            response.status(404).send('No listing matches that ID');

            return;
        }

        const category = await dependencies.db.collection('categories').findOne({ _id: dependencies.object_id(listing.category) });

        listing.category_title = category.title;

        response.status(200).send(listing);
    }
    catch (error) {
        response.status(500).send(error);
    }
};