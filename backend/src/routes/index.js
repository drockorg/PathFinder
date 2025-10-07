const authRoutes = require('./auth');
const testRoutes = require('./test');
const profileRoutes = require('./profile');

const setupRoutes = (app) => {
    app.use('/api/auth', authRoutes);
    app.use('/api/test', testRoutes);
    app.use('/api/profile', profileRoutes);
    
    // Serve uploaded files
    app.use('/uploads', require('express').static('uploads'));
};

module.exports = { setupRoutes };