import { Sequelize } from "sequelize";
import { dbConfig } from "../configs/db.config.js";

const sequelize = new Sequelize(dbConfig.dbName, dbConfig.dbUser, dbConfig.dbPass, {
    host: dbConfig.dbHost,
    port: dbConfig.dbPort,
    dialect: dbConfig.dbDialect
});

export {
    sequelize,
}