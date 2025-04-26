const express = require('express');
const { Inventory } = require('../models');

const router = express.Router();

// Create Inventory Item
router.post('/', async (req, res) => {
  try {
    const item = await Inventory.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: 'Error creating inventory item', error: err });
  }
});

// Get All Inventory Items
router.get('/', async (req, res) => {
  try {
    const items = await Inventory.findAll();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching inventory', error: err });
  }
});

// Get Single Inventory Item
router.get('/:id', async (req, res) => {
  try {
    const item = await Inventory.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Inventory item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching inventory item', error: err });
  }
});

// Update Inventory Item
router.put('/:id', async (req, res) => {
  try {
    const item = await Inventory.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Inventory item not found' });

    await item.update(req.body);
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: 'Error updating inventory item', error: err });
  }
});

// Delete Inventory Item
router.delete('/:id', async (req, res) => {
  try {
    const item = await Inventory.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Inventory item not found' });

    await item.destroy();
    res.json({ message: 'Inventory item deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting inventory item', error: err });
  }
});

module.exports = router;
