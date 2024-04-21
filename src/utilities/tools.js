const axios = require('axios');

const invokeWebServer = async (options) => {
    try {
        // if (!options.headers) {
        //     options.headers = {};
        // }
        // options.headers['external'] = true;

        console.log(`request target URL: ${options.url}`);
        const resp = await axios(options);

        return resp;
    } catch (error) {
        console.error(`============  axios invoke error`);
        if (error.response) {
            console.error(error.response.data);
            console.error(error.response.status);
            console.error(error.response.headers);

            return error.response;
        }

        throw error;
    }
}

const handleHttpResponse = (resp) => {
    if (resp.status === 200) {
        return resp.data;
    }

    throw new Error(`status: ${resp.status}, error: ${resp.data}`);
}

const authCheck = (globalInfo, mark) => {
    // TODO

    return false;
}

module.exports = {
    invokeWebServer,
    handleHttpResponse,
    authCheck,
};