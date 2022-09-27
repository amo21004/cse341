module.exports = async function (request, response, dependencies) {
    const listings_raw = [];

    await dependencies.db.collection("listings").find().forEach(listing => listings_raw.push(listing));

    const listings = await Promise.all(listings_raw.map(async listing => {
        const category_id = listing.category;

        const category = await dependencies.db.collection('categories').findOne({ _id: dependencies.objectId(category_id) });

        listing.category_title = category.title;

        return listing;
    }));

    response.status(200).send(listings);
};