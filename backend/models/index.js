const sequelize = require('../config/database');

// Import models
const Role = require('./role');
const User = require('./user');
const Patient = require('./patient');
const Appointment = require('./appointment');
const LabTest = require('./labtest');
const Inventory = require('./inventory');
const Prescription = require('./prescription');
const Billing = require('./billing');

// Associations

// User & Role
User.belongsTo(Role, { foreignKey: 'roleId' });
Role.hasMany(User, { foreignKey: 'roleId' });

// Appointments
User.hasMany(Appointment, { foreignKey: 'doctorId', as: 'Appointments' });  // Doctor has many appointments
Patient.hasMany(Appointment, { foreignKey: 'patientId' });
Appointment.belongsTo(Patient, { foreignKey: 'patientId' });

// Lab Tests
User.hasMany(LabTest, { foreignKey: 'technicianId', as: 'Technician' });
Patient.hasMany(LabTest, { foreignKey: 'patientId' });
LabTest.belongsTo(Patient, { foreignKey: 'patientId' });

// Prescriptions
User.hasMany(Prescription, { foreignKey: 'doctorId', as: 'Prescriptions' });
Patient.hasMany(Prescription, { foreignKey: 'patientId' });
Prescription.belongsTo(Patient, { foreignKey: 'patientId' });

// Billing
Patient.hasMany(Billing, { foreignKey: 'patientId' });
Billing.belongsTo(Patient, { foreignKey: 'patientId' });

// Sync all models
const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true }); // Use { force: true } to drop tables, alter to adjust schema
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Error syncing models:', error);
  }
};

module.exports = {
  sequelize,
  Role,
  User,
  Patient,
  Appointment,
  LabTest,
  Inventory,
  Prescription,
  Billing,
  syncModels,
};
