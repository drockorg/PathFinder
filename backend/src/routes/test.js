const express = require('express');
const router = express.Router();

router.get('/ping', (req, res) => {
    res.json({ message: 'Pong! Backend is connected', timestamp: new Date().toISOString() });
});

module.exports = router;