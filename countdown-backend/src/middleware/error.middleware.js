const errorHandler = (err, req, res, next) => {
    console.error("ERROR:", err);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: statusCode === 500 
        ? "Something went wrong on the server. Please try again later."
        : err.message
    });
};

module.exports = errorHandler;