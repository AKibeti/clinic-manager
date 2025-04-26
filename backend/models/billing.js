const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Patient = require('./patient');

const Billing = sequelize.define('Billing', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  patientId: {
    type: DataTypes.INTEGER,
    references: {
      model: Patient,
      key: 'id',
    },
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Unpaid', // Unpaid, Partial, Paid
  },
  dueDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
}, {
  tableName: 'billings',
  timestamps: true,
});

// Associations
Billing.belongsTo(Patient, { foreignKey: 'patientId' });

module.exports = Billing;
