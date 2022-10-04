module.exports = function (request, response, dependencies) {
    try {
        response.redirect(dependencies.github_auth_url + dependencies.github_client_id);
    }
    catch (error) {
        response.status(500).send(error);
    }
};