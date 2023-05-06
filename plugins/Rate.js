/// <reference path="../global.d.ts" />
'use strict'
const moment = require('moment');
const csv = require('fast-csv');
const fs = require('fs');
const { exportPath } = require('../exports/config/config')

/** @param {import('fastify').FastifyInstance} app */
module.exports = async function (app) {
    app.platformatic.addEntityHooks('rate', {
        save: async (originalSave, options) => {
            const currentTime = moment().utcOffset("+05:30").format('YYYY-MM-DD HH:mm:ss');
            options.input.timeStamp = currentTime;
            return await originalSave(options);
        }
    })

    app.get(
        '/export',
        async (request, response) => {
            try {
                const { db, sql } = app.platformatic;
                const sqlStatement = sql`SELECT * FROM rates;`
                const data = await db.query(sqlStatement)
                const filePath = exportPath;
                let time = moment().utcOffset("+05:30").format('YYYYMMDDhhmmss');
                const filename = '/export_' + time + '.csv';
                const endPath = filePath + filename;
                console.log("endPath  --- ", endPath);
                const ws = fs.createWriteStream(endPath);
                csv.write(
                    data,
                    { headers: true }
                )
                    .on('finish', () => {
                        return {
                            message: "file ready for download",
                            download_link: ""
                        }
                    })
                    .pipe(ws)
            } catch (error) {
                console.log(error);
                return {
                    message: "error while exporting report",
                    download_link: ""
                }
            }
        }
    )
}