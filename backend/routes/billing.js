const express = require('express');
const { Billing, Patient } = require('../models');

const router = express.Router();

// Create Billing Record
router.post('/', async (req, res) => {
  try {
    const bill = await Billing.create(req.body);
    res.status(201).json(bill);
  } catch (err) {
    res.status(400).json({ message: 'Error creating billing record', error: err });
  }
});

// Get All Billing Records
router.get('/', async (req, res) => {
  try {
    const bills = await Billing.findAll({
      include: [{ model: Patient }]
    });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching billing records', error: err });
  }
});

// Get Single Billing Record
router.get('/:id', async (req, res) => {
  try {
    const bill = await Billing.findByPk(req.params.id, {
      include: [{ model: Patient }]
    });
    if (!bill) return res.status(404).json({ message: 'Billing record not found' });
    res.json(bill);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching billing record', error: err });
  }
});

// Update Billing Record
router.put('/:id', async (req, res) => {
  try {
    const bill = await Billing.findByPk(req.params.id);
    if (!bill) return res.status(404).json({ message: 'Billing record not found' });

    await bill.update(req.body);
    res.json(bill);
  } catch (err) {
    res.status(400).json({ message: 'Error updating billing record', error: err });
  }
});

// Delete Billing Record
router.delete('/:id', async (req, res) => {
  try {
    const bill = await Billing.findByPk(req.params.id);
    if (!bill) return res.status(404).json({ message: 'Billing record not found' });

    await bill.destroy();
    res.json({ message: 'Billing record deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting billing record', error: err });
  }
});

module.exports = router;
