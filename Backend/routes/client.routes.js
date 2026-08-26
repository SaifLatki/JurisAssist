const express = require('express');

const authenticateUser =
    require('../middleware/auth.middleware.js');

const authorizeRoles =
    require('../middleware/role.middleware.js');

const router = express.Router();


// =========================
// CLIENT DASHBOARD
// GET /client/dashboard
// =========================

router.get(
    '/dashboard',

    authenticateUser,

    authorizeRoles('client'),

    (req, res) => {

        res.status(200).json({

            message:
                'Welcome to Client Dashboard',

            user: req.user

        });

    }
);


module.exports = router;