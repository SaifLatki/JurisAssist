require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db.js');


// Routes
const authRoutes =
    require('./routes/auth.routes.js');

const userRoutes =
    require('./routes/user.routes.js');

const chatRoutes =
    require('./routes/chat.routes.js');

const clientRoutes =
    require('./routes/client.routes.js');

const advocateRoutes =
    require('./routes/advocate.routes.js');


// Error middleware
const errorMiddleware =
    require('./middleware/error.middleware.js');


const app = express();

const PORT =
    process.env.PORT || 5000;


// =========================
// GLOBAL MIDDLEWARE
// =========================

app.use(cors());

app.use(express.json());


// =========================
// ROUTES
// =========================

app.use(
    '/auth',
    authRoutes
);

app.use(
    '/users',
    userRoutes
);

app.use(
    '/chat',
    chatRoutes
);

app.use(
    '/client',
    clientRoutes
);

app.use(
    '/advocate',
    advocateRoutes
);


// =========================
// TEST ROUTE
// =========================

app.get('/', (req, res) => {

    res.json({
        message: 'API is working!'
    });

});


// =========================
// ERROR HANDLER
// =========================

app.use(errorMiddleware);


// =========================
// DATABASE
// =========================

connectDB();


// =========================
// SERVER
// =========================

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});