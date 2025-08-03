import sequelize from '../lib/sequelize';

(async () => {
  try {
    console.log('🟡 Connecting to DB...');
    await sequelize.authenticate();

    console.log('🟡 Syncing models...');
    await sequelize.sync({ alter: true }); // or use { force: true } in dev

    console.log('✅ Tables created successfully!');
  } catch (err) {
    console.error('❌ Sync error:', err);
  } finally {
    await sequelize.close();
  }
})();
