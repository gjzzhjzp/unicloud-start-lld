'use strict';
const {
    Router
} = require('uni-cloud-router')
require('jz-common')
const router = new Router(require('./config.js'))
exports.main = async (event, context) => {
    return router.serve(event, context)
};
