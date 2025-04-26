const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
  res.send('Clinic Manager API is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const sequelize = require('./config/database');

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

  const { syncModels } = require('./models');

sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    return syncModels(); // Sync models after connection
  })
  .then(() => {
    console.log('Models synced.');
  })
  .catch(err => console.log('Error: ' + err));


  const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const patientRoutes = require('./routes/patient');
app.use('/api/patients', patientRoutes);

const appointmentRoutes = require('./routes/appointment');
app.use('/api/appointments', appointmentRoutes);

const labTestRoutes = require('./routes/labtest');
app.use('/api/labtests', labTestRoutes);

const inventoryRoutes = require('./routes/inventory');
app.use('/api/inventory', inventoryRoutes);

const prescriptionRoutes = require('./routes/prescription');
app.use('/api/prescriptions', prescriptionRoutes);

const billingRoutes = require('./routes/billing');
app.use('/api/billings', billingRoutes);

const reportsRoutes = require('./routes/reports');
app.use('/api/reports', reportsRoutes);

