const express = require('express');

const {
    register,
    login,
    getCurrentUser
} = require('../controllers/auth.controller.js');

const authenticateUser =
    require('../middleware/auth.middleware.js');

const router = express.Router();


// =========================
// REGISTER
// POST /auth/register
// =========================

router.post(
    '/register',
    register
);


// =========================
// LOGIN
// POST /auth/login
// =========================

router.post(
    '/login',
    login
);


// =========================
// CURRENT USER
// GET /auth/me
// =========================

router.get(
    '/me',
    authenticateUser,
    getCurrentUser
);


module.exports = router;