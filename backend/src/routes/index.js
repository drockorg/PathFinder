const authRoutes = require('./auth');
const testRoutes = require('./test');

const setupRoutes = (app) => {
    app.use('/api/auth', authRoutes);
    app.use('/api/test', testRoutes);
};

module.exports = { setupRoutes };