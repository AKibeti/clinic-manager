const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Patient = require('./patient');
const User = require('./user'); // Lab Technician

const LabTest = sequelize.define('LabTest', {
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
  technicianId: {  // Linked to User (Lab Tech)
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  testType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  result: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'lab_tests',
  timestamps: true,
});

// Associations
LabTest.belongsTo(Patient, { foreignKey: 'patientId' });
LabTest.belongsTo(User, { foreignKey: 'technicianId', as: 'technician' });

module.exports = LabTest;
