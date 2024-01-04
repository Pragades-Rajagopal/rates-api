/// <reference path="../global.d.ts" />
'use strict'
const moment = require('moment');

/** @param {import('fastify').FastifyInstance} app */
module.exports = async function (app) {
    app.platformatic.addEntityHooks('rate', {
        save: async (originalSave, options) => {
            const currentTime = moment().utcOffset("+05:30").format('YYYY-MM-DD HH:mm:ss');
            options.input.timeStamp = currentTime;
            return await originalSave(options);
        }
    });
}
