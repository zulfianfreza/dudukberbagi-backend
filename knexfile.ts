require("dotenv").config();
require("ts-node/register");
import type { Knex } from "knex";
import config from "./config";

const environments: string[] = ["development", "staging", "production"];

// const connection: Knex.StaticConnectionConfig = {
//     host: config.get("dbHost"),
//     database: config.get("dbName"),
//     user: config.get("dbUser"),
//     password: config.get("dbPassword"),
//     port: 2345,
// };

const commonConfig: Knex.Config = {
    client: "pg",
    connection: config.databaseUrl,
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: "qadabra",
        directory: "./src/database/migrations",
    },
    seeds: {
        directory: "./src/database/seeds",
    },
};

export default Object.fromEntries(
    environments.map((env: string) => [env, commonConfig])
);
