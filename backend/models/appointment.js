const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Patient = require('./patient');
const User = require('./user'); // Doctor

const Appointment = sequelize.define('Appointment', {
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
  doctorId: {  // Linked to User (Doctor)
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Pending', // Pending, Completed, Cancelled
  },
}, {
  tableName: 'appointments',
  timestamps: true,
});

// Associations
Appointment.belongsTo(Patient, { foreignKey: 'patientId' });
Appointment.belongsTo(User, { foreignKey: 'doctorId', as: 'doctor' });

module.exports = Appointment;
