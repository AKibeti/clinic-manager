const { sequelize, Role, User } = require('../models');
const bcrypt = require('bcryptjs');

const seed = async () => {
  try {
    await sequelize.sync({ force: true }); // Recreates tables (careful in prod!)

    // Seed Roles
    const roles = await Role.bulkCreate([
      { name: 'Admin' },
      { name: 'Doctor' },
      { name: 'Nurse' },
      { name: 'Pharmacist' },
      { name: 'Lab Technician' }
    ]);

    console.log('Roles seeded.');

    // Seed Admin User
    const adminRole = roles.find(role => role.name === 'Admin');
    const hashedPassword = await bcrypt.hash('Admin@123', 10);

    await User.create({
      name: 'System Admin',
      email: 'admin@clinic.com',
      password: hashedPassword,
      roleId: adminRole.id,
    });

    console.log('Admin user seeded.');
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seed();
