const express = require('express');
const { Patient } = require('../models');

const router = express.Router();

// Create Patient
router.post('/', async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ message: 'Error creating patient', error: err });
  }
});

// Get All Patients
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching patients', error: err });
  }
});

// Get Single Patient
router.get('/:id', async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching patient', error: err });
  }
});

// Update Patient
router.put('/:id', async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    await patient.update(req.body);
    res.json(patient);
  } catch (err) {
    res.status(400).json({ message: 'Error updating patient', error: err });
  }
});

// Delete Patient
router.delete('/:id', async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    await patient.destroy();
    res.json({ message: 'Patient deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting patient', error: err });
  }
});

module.exports = router;
