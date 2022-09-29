const createError = require('http-errors');

const path = require('path');

const express = require("express");

const app = express();

app.use(express.json());

require("dotenv").config();

const port = process.env.PORT || 3000;

app.listen(port);

const cors = require("cors");

app.use(cors());

const MongoClient = require("mongodb");

const [db, objectId] = require("./services/connection")(
    process.env.MONGO_URI.replace("dbname", "wdd431"),
    MongoClient
);

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const swaggerUi = require("swagger-ui-express");

const swaggerDocument = require("./swagger.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const url = require("url");

const { validationResult, check } = require('express-validator');

const {
    createListingValidation,
    createCategoryValidation,

    viewSingleListingValidation,
    viewSingleCategoryValidation,
    
    deleteSingleListingValidation,
    deleteSingleCategoryValidation
} = require('./services/validation.js')(check);

const dependencies = {
    db: db,
    url: url,
    objectId: objectId,
    validationResult: validationResult,

    createListingValidation: createListingValidation,
    createCategoryValidation: createCategoryValidation,

    viewSingleListingValidation: viewSingleListingValidation,
    viewSingleCategoryValidation: viewSingleCategoryValidation,

    deleteSingleListingValidation: deleteSingleListingValidation,
    deleteSingleCategoryValidation: deleteSingleCategoryValidation
};

require("./routes")(app, dependencies);