var db = require('../models');
var sequelize = db.sequelize;

async function insertLink(name) {
    let res =  await sequelize.query(
        ` INSERT INTO "Links" (name, "createdAt", "updatedAt")
             VALUES (?, current_date, current_date) RETURNING id`
        , { replacements: [name], type: sequelize.QueryTypes.SELECT});
    return res;
}

async function getAllLinks() {
    let res =  await sequelize.query(
        ` SELECT id, name from "Links"`
        , { type: sequelize.QueryTypes.SELECT});
    return res;
}

async function getAllUserLinks(id) {
    let res =  await sequelize.query(
        ` select * from "Links"
            INNER JOIN "UserLink" on "Links".id = "UserLink"."LinkId"
            INNER JOIN "Users" on "Users".id = "UserLink"."UserId"
            WHERE "Users".id = ?`
        , { replacements: [id], type: sequelize.QueryTypes.SELECT});
    return res;
}
async function insertUserLink(userID, linkID) {
    let res =  await sequelize.query(
        ` INSERT INTO "UserLink" ("createdAt", "updatedAt", "LinkId", "UserId")
             VALUES (current_date, current_date, ?, ?)`
        , { replacements: [linkID, userID], type: sequelize.QueryTypes.SELECT});
    return res;
}

module.exports = {
    insertLink: insertLink,
    getAllLinks: getAllLinks,
    insertUserLink: insertUserLink,
    getAllUserLinks: getAllUserLinks,
};