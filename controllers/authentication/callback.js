module.exports = async function (request, response, dependencies) {
    const code = request.query.code;

    const body = {
        client_id: dependencies.github_client_id,
        client_secret: dependencies.github_client_secret,
        code
    };

    const options = {
        headers: {
            accept: 'application/json'
        }
    };

    await dependencies.axios.post('https://github.com/login/oauth/access_token', body, options).then(_response => _response.data.access_token).then(access_token => {
        if (!access_token) {
            return;
        }

        return response.redirect('/authentication/success?access_token=' + access_token);
    });

    response.send();
};