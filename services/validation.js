module.exports = (check) => {
    return {
        create_listing_validation: [
            check('title', 'Title is requied').not().isEmpty(),
            check('category', 'Category is requied').not().isEmpty(),
            check('location', 'Location is requied').not().isEmpty()
        ],
        create_category_validation: [
            check('title', 'Title is requied').not().isEmpty()
        ],

        view_single_listing_validation: [
            check('listing_id', 'Invalid ID. Must be 24 characters long hex string').isLength({ min: 24, max: 24 })
        ],
        view_single_category_validation: [
            check('category_id', 'Invalid ID. Must be 24 characters long hex string').isLength({ min: 24, max: 24 })
        ],

        delete_single_listing_validation: [
            check('listing_id', 'Invalid ID. Must be 24 characters long hex string').isLength({ min: 24, max: 24 })
        ],
        delete_single_category_validation: [
            check('category_id', 'Invalid ID. Must be 24 characters long hex string').isLength({ min: 24, max: 24 })
        ]
    };
};