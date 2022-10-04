module.exports = (app, dependencies) => {
    app.get('/', (request, response) => {
        require('../controllers/index')(request, response, dependencies);
    });

    app.get('/authentication', (request, response) => {
        require('../controllers/authentication/index')(request, response, dependencies);
    });

    app.get('/authentication/callback', (request, response) => {
        require('../controllers/authentication/callback')(request, response, dependencies);
    });

    app.get('/authentication/success', (request, response) => {
        require('../controllers/authentication/success')(request, response, dependencies);
    });

    app.get('/listings', (request, response) => {
        require('../controllers/listings/index')(request, response, dependencies);
    });

    app.post('/listings', dependencies.require_authorization, dependencies.create_listing_validation, (request, response) => {
        require('../controllers/listings/create')(request, response, dependencies);
    });

    app.get('/listings/:listing_id', dependencies.view_single_listing_validation, (request, response) => {
        require('../controllers/listings/single')(request, response, dependencies);
    });

    app.put('/listings/:listing_id', dependencies.require_authorization, dependencies.create_listing_validation, (request, response) => {
        require('../controllers/listings/update')(request, response, dependencies);
    });

    app.delete('/listings/:listing_id', dependencies.require_authorization, dependencies.delete_single_listing_validation, (request, response) => {
        require('../controllers/listings/delete')(request, response, dependencies);
    });


    app.get('/categories', (request, response) => {
        require('../controllers/categories/index')(request, response, dependencies);
    });

    app.post('/categories/', dependencies.require_authorization, dependencies.create_category_validation, (request, response) => {
        require('../controllers/categories/create')(request, response, dependencies);
    });

    app.get('/categories/:category_id', dependencies.view_single_category_validation, (request, response) => {
        require('../controllers/categories/single')(request, response, dependencies);
    });

    app.put('/categories/:category_id', dependencies.require_authorization, dependencies.create_category_validation, (request, response) => {
        require('../controllers/categories/update')(request, response, dependencies);
    });

    app.delete('/categories/:category_id', dependencies.require_authorization, dependencies.delete_single_category_validation, (request, response) => {
        require('../controllers/categories/delete')(request, response, dependencies);
    });
};