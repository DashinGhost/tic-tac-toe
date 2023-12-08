module.exports = (err, req, res, next) => {
    console.log('Error Handler Invoked:', err);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        messgae: err.message
    });
}