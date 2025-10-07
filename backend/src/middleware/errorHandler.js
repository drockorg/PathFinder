// Error handling middleware
const errorHandler = (err, req, res, next) => {
    // Log the error
    console.error(err.stack);

    // Default error status and message
    const status = err.status || 500;
    const message = err.message || 'Something went wrong!';

    // Handle validation errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            status: 'error',
            message: 'Validation Error',
            errors: Object.values(err.errors).map(e => e.message)
        });
    }

    // Handle MongoDB duplicate key errors
    if (err.code === 11000) {
        return res.status(400).json({
            status: 'error',
            message: 'Duplicate key error',
            field: Object.keys(err.keyPattern)[0]
        });
    }

    // Handle JWT errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid token'
        });
    }

    // Handle expired JWT
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            status: 'error',
            message: 'Token expired'
        });
    }

    // Return error response
    res.status(status).json({
        status: 'error',
        message
    });
};

module.exports = { errorHandler };