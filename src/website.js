"use strict";
const mysql = require("promise-mysql");
const config = require("../config/website.json");
let db;

(async function () {
    db = await mysql.createConnection(config);

    process.on("exit", () => {
        db.end();
    });
})();

let website = {
    login: async function (username, password) {
        let sql = `CALL login_check(?, ?);`;
        let res;

        res = await db.query(sql, [username, password]);
        return res[0];

    },
    register: async function (username, password, email) {
        let success = false;
        let res;
        let sql = `CALL registerCheck(?);`;
        res = await db.query(sql, [username]);
        if (res[0].length == 0) {
            sql = `CALL register(?, ?, ?);`;


            await db.query(sql, [username, password, email]);
            success = true;
        }
        return success;
    },
    getID: async function (username, password) {
        let sql = 'CALL getID(?, ?);';
        let res;

        res = await db.query(sql, [username, password]);
        return res[0];
    }
};

module.exports = website;