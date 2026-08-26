// =========================
// GLOBAL ERROR HANDLER
// =========================

function errorMiddleware(err, req, res, next) {

    console.error(
        'ERROR:',
        err.message
    );


    const statusCode =
        err.statusCode || 500;


    res.status(statusCode).json({

        message:
            err.message ||
            'Internal server error'

    });
}


module.exports = errorMiddleware;