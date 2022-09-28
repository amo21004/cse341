module.exports = (app, dependencies) => {
    app.get("/", (request, response) => {
        require("../controllers/index")(request, response, dependencies);
    });

    app.get("/listings", (request, response) => {
        require("../controllers/listings/index")(request, response, dependencies);
    });
    
    app.get("/listings/:listing_id", dependencies.viewSingleListingValidation, (request, response) => {
        require("../controllers/listings/single")(request, response, dependencies);
    });

    app.post("/listings", dependencies.createListingValidation, (request, response) => {
        require("../controllers/listings/create")(request, response, dependencies);
    });

    app.get("/categories", (request, response) => {
        require("../controllers/categories/index")(request, response, dependencies);
    });
};