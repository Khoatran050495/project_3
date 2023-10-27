const dev = {
  db: {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: '123456789',
    DATABASE: 'ProductBuyGun',
    dialect: 'mysql',
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

module.exports = dev;
