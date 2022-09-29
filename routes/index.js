module.exports = (app, dependencies) => {
    app.get("/", (request, response) => {
        require("../controllers/index")(request, response, dependencies);
    });


    app.get("/listings", (request, response) => {
        require("../controllers/listings/index")(request, response, dependencies);
    });

    app.post("/listings", dependencies.createListingValidation, (request, response) => {
        require("../controllers/listings/create")(request, response, dependencies);
    });

    app.get("/listings/:listing_id", dependencies.viewSingleListingValidation, (request, response) => {
        require("../controllers/listings/single")(request, response, dependencies);
    });

    app.put("/listings/:listing_id", dependencies.createListingValidation, (request, response) => {
        require("../controllers/listings/update")(request, response, dependencies);
    });

    app.delete("/listings/:listing_id", dependencies.deleteSingleListingValidation, (request, response) => {
        require("../controllers/listings/delete")(request, response, dependencies);
    });


    app.get("/categories", (request, response) => {
        require("../controllers/categories/index")(request, response, dependencies);
    });

    app.post("/categories/", dependencies.createCategoryValidation, (request, response) => {
        require("../controllers/categories/create")(request, response, dependencies);
    });

    app.get("/categories/:category_id", dependencies.viewSingleCategoryValidation, (request, response) => {
        require("../controllers/categories/single")(request, response, dependencies);
    });

    app.put("/categories/:category_id", dependencies.createCategoryValidation, (request, response) => {
        require("../controllers/categories/update")(request, response, dependencies);
    });

    app.delete("/categories/:category_id", dependencies.deleteSingleCategoryValidation, (request, response) => {
        require("../controllers/categories/delete")(request, response, dependencies);
    });
};