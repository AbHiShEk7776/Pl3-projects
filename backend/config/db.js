const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('database_name', 'root', 'your_password', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;


const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Database connected...');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
};

module.exports = { connectDB, sequelize };
