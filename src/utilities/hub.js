const moment = require('moment');
const FormData = require('form-data');

const utils = require('./tools');
const CONSTANT = require('./constant').default;

const queryModels = async () => {
    let url = `${CONSTANT.WEB_SERVER_URL}/${CONSTANT.VERSION}${CONSTANT.QUERY_MODELS}`;
    const options = {
        method: 'GET',
        url,
    }

    const resp = await utils.invokeWebServer(options);
    // console.log(resp);

    return utils.handleHttpResponse(resp);
}

const getModel = async (id) => {
    let url = `${CONSTANT.WEB_SERVER_URL}/${CONSTANT.VERSION}${CONSTANT.GET_MODEL}${id}`;
    const options = {
        method: 'GET',
        url,
    }

    const resp = await utils.invokeWebServer(options);
    // console.log(resp);

    return utils.handleHttpResponse(resp);
}

const queryInstances = async (conditions) => {
    let url = `${CONSTANT.WEB_SERVER_URL}/${CONSTANT.VERSION}${CONSTANT.QUERY_INSTANCES}${JSON.stringify(conditions)}`;
    const options = {
        method: 'GET',
        url,
    }

    const resp = await utils.invokeWebServer(options);
    // console.log(resp);

    return utils.handleHttpResponse(resp);
}

const getInstance = async (id) => {
    let url = `${CONSTANT.WEB_SERVER_URL}/${CONSTANT.VERSION}${CONSTANT.GET_INSTANCE}${id}`;
    const options = {
        method: 'GET',
        url,
    }

    const resp = await utils.invokeWebServer(options);
    // console.log(resp);

    return utils.handleHttpResponse(resp);
}

module.exports = {
    queryModels,
    getModel,
    queryInstances,
    getInstance,
};
