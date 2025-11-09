import configdb      from "../config/db.config.js";
import { Sequelize } from "sequelize";
import   { User }    from "./User.js";
import   { Task }    from "./Task.js";
import pg            from "pg";

const useSsl = process.env.DB_SSL === 'true' || process.env.NODE_ENV === 'production' || (configdb.HOST !== 'localhost' && configdb.HOST !== '127.0.0.1');

const sequelize = new Sequelize(
    configdb.DB,
    configdb.USER,
    configdb.PASSWORD,
    {
        host: configdb.HOST,
        port: configdb.PORT ? Number(configdb.PORT) : undefined,
        dialect: configdb.dialect,
        dialectModule: pg,
        pool: {
            max: configdb.pool.max,
            min: configdb.pool.min,
            acquire: configdb.pool.acquire,
            idle: configdb.pool.idle,
            evict: configdb.pool.evict
        },
        dialectOptions: useSsl ? {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        } : undefined,
        // Control SQL logging via env var SQL_LOGGING. Default: false (quiet)
        logging: process.env.SQL_LOGGING === 'true' ? console.log : false,
    }
);

const db: any = {Sequelize, sequelize, users: {}, books: {} };
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = User(sequelize, Sequelize);
db.tasks = Task(sequelize, Sequelize);

export default db;