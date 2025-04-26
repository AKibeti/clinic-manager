const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Patient = require('./patient');
const User = require('./user'); // Doctor

const Prescription = sequelize.define('Prescription', {
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
  doctorId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  medication: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dosage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'prescriptions',
  timestamps: true,
});

// Associations
Prescription.belongsTo(Patient, { foreignKey: 'patientId' });
Prescription.belongsTo(User, { foreignKey: 'doctorId', as: 'doctor' });

module.exports = Prescription;
