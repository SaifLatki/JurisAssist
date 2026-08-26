const {
    registerUser,
    loginUser
} = require('../services/auth.service.js');


// =========================
// REGISTER
// =========================

async function register(req, res, next) {

    try {

        const user = await registerUser(req.body);

        res.status(201).json({
            message: 'User registered successfully',
            user
        });

    } catch (error) {

        next(error);

    }
}


// =========================
// LOGIN
// =========================

async function login(req, res, next) {

    try {

        const {
            email,
            password
        } = req.body;


        const result = await loginUser(
            email,
            password
        );


        res.status(200).json({
            message: 'Login successful',
            token: result.token,
            user: result.user
        });

    } catch (error) {

        next(error);

    }
}


// =========================
// GET CURRENT USER
// =========================

async function getCurrentUser(req, res, next) {

    try {

        res.status(200).json({
            user: req.user
        });

    } catch (error) {

        next(error);

    }
}


module.exports = {
    register,
    login,
    getCurrentUser
};