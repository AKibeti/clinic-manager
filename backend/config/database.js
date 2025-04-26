const { Sequelize } = require('sequelize');
require('dotenv').config();  // Load environment variables

// Debugging: Print DB config (remove in production)
console.log('Connecting to DB with:');
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS ? '******' : 'Not set');
console.log('DB_HOST:', process.env.DB_HOST);

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  String(process.env.DB_PASS),  // Force password to be a string
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false, // Disable SQL query logging (set to true if debugging)
  }
);

module.exports = sequelize;
