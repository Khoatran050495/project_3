const dbConfig = require('../../configs/configs');
const Sequelize = require('sequelize');
const connectMysql = new Sequelize(dbConfig.db.DATABASE, dbConfig.db.USER, dbConfig.db.PASSWORD, {
  host: dbConfig.db.HOST,
  dialect: dbConfig.db.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

module.exports = connectMysql;
