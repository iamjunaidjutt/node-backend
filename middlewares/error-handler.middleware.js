const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;

    console.error(`[ERROR] ${err.message || 'Unknown Error'}`);

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Something went wrong!',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};

module.exports = errorHandler;