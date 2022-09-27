const express = require("express");

const app = express();

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

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const swaggerUi = require("swagger-ui-express");

const swaggerDocument = require("./swagger.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const url = require("url");

const events = require("events");

const dependencies = {
    db: db,
    url: url,
    events: events,
    objectId: objectId
};

require("./routes")(app, dependencies);