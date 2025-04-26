const express = require('express');
const { Billing, Patient, Inventory, Appointment, User, Role } = require('../models');
const { Sequelize } = require('sequelize');

const router = express.Router();

// Revenue Report with Date Range Filter
router.get('/revenue', async (req, res) => {
const { start, end } = req.query;
const whereClause = {};

if (start && end) {
whereClause.createdAt = {
[Sequelize.Op.between]: [new Date(start), new Date(end)]
};
}

try {
const revenue = await Billing.findAll({
attributes: [
[Sequelize.fn('DATE', Sequelize.col('createdAt')), 'date'],
[Sequelize.fn('SUM', Sequelize.col('amount')), 'total']
],
where: whereClause,
group: ['date'],
order: [['date', 'ASC']]
});
res.json(revenue);
} catch (err) {
res.status(500).json({ message: 'Error generating revenue report', error: err });
}
});

// Patients by Role with Role Filter
router.get('/patients-by-role', async (req, res) => {
const { role } = req.query;  // e.g., role=Doctor

const roleWhere = role ? { name: role } : {};

try {
const data = await User.findAll({
include: [
{ model: Role, where: roleWhere },
{
model: Appointment,
as: 'Appointments',
attributes: []
}
],
attributes: [
'id',
'name',
[Sequelize.fn('COUNT', Sequelize.col('Appointments.id')), 'patientCount']
],
group: ['User.id', 'Role.id']
});
res.json(data);
} catch (err) {
res.status(500).json({ message: 'Error generating patients by role report', error: err });
}
});

// Inventory Report with Low Stock Filter
router.get('/inventory', async (req, res) => {
const { lowStock } = req.query;

const whereClause = {};
if (lowStock) {
whereClause.quantity = { [Sequelize.Op.lte]: parseInt(lowStock) };  // e.g., lowStock=10
}

try {
const inventory = await Inventory.findAll({ where: whereClause });
res.json(inventory);
} catch (err) {
res.status(500).json({ message: 'Error fetching inventory report', error: err });
}
});

// Doctor Productivity Report with Doctor & Date Range Filters
router.get('/doctor-productivity', async (req, res) => {
const { start, end, doctorId } = req.query;

const appointmentWhere = {};
if (start && end) {
appointmentWhere.date = {
[Sequelize.Op.between]: [new Date(start), new Date(end)]
};
}
if (doctorId) {
appointmentWhere.doctorId = doctorId;
}

try {
const data = await User.findAll({
include: [
{ model: Role, where: { name: 'Doctor' } },
{
model: Appointment,
where: appointmentWhere,
as: 'Appointments',
attributes: []
}
],
attributes: [
'id',
'name',
[Sequelize.fn('COUNT', Sequelize.col('Appointments.id')), 'appointmentsCount']
],
group: ['User.id', 'Role.id']
});
res.json(data);
} catch (err) {
res.status(500).json({ message: 'Error generating doctor productivity report', error: err });
}
});

module.exports = router;

