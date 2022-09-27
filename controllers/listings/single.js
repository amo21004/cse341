module.exports = async function (request, response, dependencies) {
    const id = request.params.listing_id;

    if (id.length != 24) {
        response.status(400).send('Invalid ID. Must be 24 characters long hex string');

        return;
    }

    const listing = await dependencies.db.collection('listings').findOne({ _id: dependencies.objectId(id) });

    if (!listing) {
        response.status(404).send('No listing matches that ID');

        return;
    }

    const category = await dependencies.db.collection('categories').findOne({ _id: dependencies.objectId(listing.category) });

    listing.category_title = category.title;

    response.status(200).send(listing);
};