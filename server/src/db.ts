import { Sequelize } from 'sequelize';
import { createPool, Pool, PoolOptions } from 'mysql2/promise';
import * as dotenv from 'dotenv';
dotenv.config();

const dbConfig: PoolOptions = {
  // host: 'localhost',
  // port: 3307,
  // user: 'root',
  // password: 'root',
  // database: 'activity_management',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const dbConnection: Pool = createPool(dbConfig);
export default dbConnection;

const sequelize = new Sequelize({
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  host: 'localhost',
  port: 3307,
  username: 'hustdb',
  password: 'hust',
  database: 'activity_management',
  pool: {
    ...dbConfig,
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export { sequelize };
