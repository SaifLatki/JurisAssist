require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.routes');
const chatRoutes = require('./routes/chat.routes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use('/users', userRoutes);
app.use('/chat', chatRoutes);
connectDB();

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to the JurisAssist Backend API' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
