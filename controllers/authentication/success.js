module.exports = async function (request, response, dependencies, silent = false) {
    const access_token = request.query.access_token;

    const result = await dependencies.axios({
        method: 'get',
        url: 'https://api.github.com/user',
        headers: {
            Authorization: 'token ' + access_token
        }
    }).then(_response => {
        return {
            status: _response.status,
            message: _response.statusText,
            data: _response.data
        };
    }).catch(error => {
        return {
            status: error.response.status,
            message: error.message
        };
    });

    if (result.status != 200) {
        if (silent === true) {
            return;
        }

        response.status(result.status).send(result.message);
    }
    else {
        request.session.user = {
            login: result.data.login,
            id: result.data.id,
            provider: 'github',
            access_token: access_token
        };

        const user = await dependencies.db.collection('users').findOne({
            oauth_provider: 'github',
            oauth_login: result.data.login,
            oauth_id: result.data.id            
        });

        if (!user) {
            await dependencies.db.collection('users').insertOne({
                oauth_provider: 'github',
                oauth_login: result.data.login,
                oauth_id: result.data.id
            });
        }

        if (silent === true) {
            return;
        }

        response.status(result.status).send('You can now do whatever it is that you were trying to do.');
    }
};