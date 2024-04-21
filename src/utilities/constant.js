const CONSTANT = {
  WEB_SERVER_URL: process.env.WEB_SERVER_URL || 'http://127.0.0.1:8000',
  VERSION: 'v1.0.0',
  THING_STATUS: {
    // 运转启停
    STOP: 0,
    RUNNING: 1,
  },
  CONDITION_EXPRESSION: {
    EQUAL: 1, // =
    LARGER: 2, // >
    LARGER_EQUAL: 3, // >=
    SMALLER: 4, // <
    SMALLER_EQUAL: 5, // <=
  },
  QUERY_MODELS: `/tm/query`,
  GET_MODEL: `/tm/get/`,
  CREATE_MODEL: `/tm`,
  QUERY_INSTANCES: `/ti/query/`,
  GET_INSTANCE: `/ti/get/`,
}

export default CONSTANT;