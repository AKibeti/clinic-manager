const express = require('express');
const { LabTest, Patient, User } = require('../models');

const router = express.Router();

// Create Lab Test
router.post('/', async (req, res) => {
  try {
    const labtest = await LabTest.create(req.body);
    res.status(201).json(labtest);
  } catch (err) {
    res.status(400).json({ message: 'Error creating lab test', error: err });
  }
});

// Get All Lab Tests
router.get('/', async (req, res) => {
  try {
    const labtests = await LabTest.findAll({
      include: [
        { model: Patient },
        { model: User, as: 'technician' }
      ]
    });
    res.json(labtests);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching lab tests', error: err });
  }
});

// Get Single Lab Test
router.get('/:id', async (req, res) => {
  try {
    const labtest = await LabTest.findByPk(req.params.id, {
      include: [
        { model: Patient },
        { model: User, as: 'technician' }
      ]
    });
    if (!labtest) return res.status(404).json({ message: 'Lab test not found' });
    res.json(labtest);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching lab test', error: err });
  }
});

// Update Lab Test
router.put('/:id', async (req, res) => {
  try {
    const labtest = await LabTest.findByPk(req.params.id);
    if (!labtest) return res.status(404).json({ message: 'Lab test not found' });

    await labtest.update(req.body);
    res.json(labtest);
  } catch (err) {
    res.status(400).json({ message: 'Error updating lab test', error: err });
  }
});

// Delete Lab Test
router.delete('/:id', async (req, res) => {
  try {
    const labtest = await LabTest.findByPk(req.params.id);
    if (!labtest) return res.status(404).json({ message: 'Lab test not found' });

    await labtest.destroy();
    res.json({ message: 'Lab test deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting lab test', error: err });
  }
});

module.exports = router;
