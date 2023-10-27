const sequelize = require('../../library/database/connect.mysql');
const { DataTypes } = require('sequelize');

//định nghĩa tạo ra 1 bảng user gồm các trường id, name...
const User = sequelize.define(
  'Users',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false },
    passwords: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.INTEGER, allowNull: false },
    birthday: { type: DataTypes.DATE, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.INTEGER, defaultValue: 1 },
    role: { type: DataTypes.INTEGER, defaultValue: 1 },
  },
  { timestamp: true }
);

// tạo bảng User
User.sync()
  .then(() => {
    console.log('Create successfully');
  })
  .catch((error) => {
    console.log('Error create table', error);
  });

module.exports = User;
