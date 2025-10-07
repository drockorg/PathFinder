require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const { createServer } = require('http');
const { Server } = require('socket.io');
const redis = require('redis');

const logger = require('./utils/logger');
const connectDB = require('./config/database');
const { setupRoutes } = require('./routes');
const { errorHandler } = require('./middleware/errorHandler');
const { setupSocketHandlers } = require('./socket');

// Initialize Express app
const app = express();
const httpServer = createServer(app);

// Initialize Redis client (optional)
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => {
  logger.warn('Redis Client Error (optional service):', err.message);
});
redisClient.on('connect', () => logger.info('Redis Client Connected'));

// Connect to Redis (non-blocking)
redisClient.connect().catch(err => {
  logger.warn('Failed to connect to Redis (continuing without it):', err.message);
});

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5173'  // Vite dev server default port
    : 'https://pathfinders.gh',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Security middleware with relaxed CSP for development
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false, // Disable CSP for development
}));
app.use(compression());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Setup routes
setupRoutes(app);

// Error handling middleware (must be last)
app.use(errorHandler);

// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NODE_ENV === 'development' 
      ? 'http://localhost:5173'
      : 'https://pathfinders.gh',
    credentials: true
  }
});

setupSocketHandlers(io);

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Start HTTP server
    httpServer.listen(PORT, () => {
      logger.info(`✓ Server running on port ${PORT}`);
      logger.info(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.info(`✓ API URL: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();