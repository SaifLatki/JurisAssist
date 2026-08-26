const userModel = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt.js');


// =========================
// REGISTER USER
// =========================

async function registerUser(userData) {

    const {
        name,
        email,
        password,
        role
    } = userData;


    // Check required fields
    if (!name || !email || !password || !role) {
        throw new Error('All fields are required');
    }


    // Check valid role
    if (!['client', 'advocate'].includes(role)) {
        throw new Error('Invalid role');
    }


    // Check existing user
    const existingUser = await userModel.findOne({
        email
    });

    if (existingUser) {
        throw new Error('User already exists');
    }


    // Hash password
    const hashedPassword = await bcrypt.hash(
        password,
        10
    );


    // Create user
    const newUser = new userModel({
        name,
        email,
        password: hashedPassword,
        role
    });


    await newUser.save();


    // Never return password
    return {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
    };
}


// =========================
// LOGIN USER
// =========================

async function loginUser(email, password) {

    if (!email || !password) {
        throw new Error('Email and password are required');
    }


    // Find user
    const user = await userModel.findOne({
        email
    });

    if (!user) {
        throw new Error('User not found');
    }


    // Compare password
    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }


    // Generate JWT
    const token = generateToken(user);


    // Safe user object
    const safeUser = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    };


    return {
        user: safeUser,
        token
    };
}


module.exports = {
    registerUser,
    loginUser
};