const express = require('express');
const { Appointment, Patient, User } = require('../models');

const router = express.Router();

// Create Appointment
router.post('/', async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ message: 'Error creating appointment', error: err });
  }
});

// Get All Appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: [
        { model: Patient },
        { model: User, as: 'doctor' }
      ]
    });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching appointments', error: err });
  }
});

// Get Single Appointment
router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        { model: Patient },
        { model: User, as: 'doctor' }
      ]
    });
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching appointment', error: err });
  }
});

// Update Appointment
router.put('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    await appointment.update(req.body);
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ message: 'Error updating appointment', error: err });
  }
});

// Delete Appointment
router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    await appointment.destroy();
    res.json({ message: 'Appointment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting appointment', error: err });
  }
});

module.exports = router;
