const express = require('express');

const app = express();

app.use(express.json());

require('dotenv').config();

const port = process.env.PORT || 3000;

app.listen(port);

const cors = require('cors');

app.use(cors());

const MongoClient = require('mongodb');

const [db, objectId] = require('./services/connection')(
    process.env.MONGO_URI.replace('dbname', 'wdd431'),
    MongoClient
);

const body_parser = require('body-parser');

app.use(body_parser.urlencoded({ extended: true }));

app.use(body_parser.json());

const github_auth_url = 'https://github.com/login/oauth/authorize?client_id=';

const axios = require('axios');

var cookie_session = require('cookie-session');

const session_configuration = {
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
};

if (process.env.ENVIRONMENT != 'development') {
    app.set('trust proxy', 1);

    session_configuration.cookie.secure = true;
}

app.use(cookie_session(session_configuration));

const swagger_ui = require('swagger-ui-express');

const swagger_document = require('./swagger.json');

app.use('/api-docs', swagger_ui.serve, swagger_ui.setup(swagger_document));

const url = require('url');

const { validationResult, check } = require('express-validator');

const require_authorization = async (request, response, next) => {
    if (request.session.user) {
        return next();
    }

    response.status(403).send('Access denied. You need to authorize yourself first.');
};

const {
    create_listing_validation,
    create_category_validation,

    view_single_listing_validation,
    view_single_category_validation,

    delete_single_listing_validation,
    delete_single_category_validation
} = require('./services/validation.js')(check);

const dependencies = {
    db: db,
    url: url,
    object_id: objectId,
    validation_result: validationResult,

    axios: axios,

    require_authorization,

    create_listing_validation,
    create_category_validation,

    view_single_listing_validation,
    view_single_category_validation,

    delete_single_listing_validation,
    delete_single_category_validation,

    github_auth_url: github_auth_url,
    github_client_id: process.env.GITHUB_CLIENT_ID,
    github_client_secret: process.env.GITHUB_CLIENT_SECRET
};

require('./routes')(app, dependencies);