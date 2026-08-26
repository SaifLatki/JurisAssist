const express = require('express');

const authenticateUser =
    require('../middleware/auth.middleware.js');

const authorizeRoles =
    require('../middleware/role.middleware.js');

const router = express.Router();


// =========================
// ADVOCATE DASHBOARD
// GET /advocate/dashboard
// =========================

router.get(
    '/dashboard',

    authenticateUser,

    authorizeRoles('advocate'),

    (req, res) => {

        res.status(200).json({

            message:
                'Welcome to Advocate Dashboard',

            user: req.user

        });

    }
);


module.exports = router;