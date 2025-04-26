const express = require('express');
const { Prescription, Patient, User } = require('../models');

const router = express.Router();

// Create Prescription
router.post('/', async (req, res) => {
  try {
    const prescription = await Prescription.create(req.body);
    res.status(201).json(prescription);
  } catch (err) {
    res.status(400).json({ message: 'Error creating prescription', error: err });
  }
});

// Get All Prescriptions
router.get('/', async (req, res) => {
  try {
    const prescriptions = await Prescription.findAll({
      include: [
        { model: Patient },
        { model: User, as: 'doctor' }
      ]
    });
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching prescriptions', error: err });
  }
});

// Get Single Prescription
router.get('/:id', async (req, res) => {
  try {
    const prescription = await Prescription.findByPk(req.params.id, {
      include: [
        { model: Patient },
        { model: User, as: 'doctor' }
      ]
    });
    if (!prescription) return res.status(404).json({ message: 'Prescription not found' });
    res.json(prescription);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching prescription', error: err });
  }
});

// Update Prescription
router.put('/:id', async (req, res) => {
  try {
    const prescription = await Prescription.findByPk(req.params.id);
    if (!prescription) return res.status(404).json({ message: 'Prescription not found' });

    await prescription.update(req.body);
    res.json(prescription);
  } catch (err) {
    res.status(400).json({ message: 'Error updating prescription', error: err });
  }
});

// Delete Prescription
router.delete('/:id', async (req, res) => {
  try {
    const prescription = await Prescription.findByPk(req.params.id);
    if (!prescription) return res.status(404).json({ message: 'Prescription not found' });

    await prescription.destroy();
    res.json({ message: 'Prescription deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting prescription', error: err });
  }
});

module.exports = router;
