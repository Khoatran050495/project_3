const sequelize = require('../../library/database/connect.mysql');
const product = require('../models/product.model');
const { DataTypes } = require('sequelize');

// Định nghĩa tạo ra một bảng Products gồm các trường id, name...
const Spesc = sequelize.define('Spescproducts', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  manufacturer: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  caliber: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  velocity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  conditions: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ammo_type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  actions: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  barrel_style: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fire_mode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gun_weight: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  loudness: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  mechanism: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Ammo_Weight: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  Pellet_Shape: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Pellet_Quantity: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
product.hasOne(Spesc, { foreignKey: 'product_id' });
Spesc.belongsTo(product, { foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Tạo bảng Products
Spesc.sync()
  .then(() => {
    console.log('Created successfully');
  })
  .catch((error) => {
    console.log('Error creating table', error);
  });

module.exports = Spesc;
