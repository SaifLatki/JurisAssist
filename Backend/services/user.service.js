const userModel =
    require('../models/user.model.js');


// GET USER PROFILE

async function getUserProfile(userId) {

    const user = await userModel
        .findById(userId)
        .select('-password');

    if (!user) {
        throw new Error('User not found');
    }

    return user;
}


// UPDATE USER PROFILE

async function updateUserProfile(
    userId,
    userData
) {

    const user = await userModel
        .findByIdAndUpdate(
            userId,
            userData,
            {
                new: true,
                runValidators: true
            }
        )
        .select('-password');

    if (!user) {
        throw new Error('User not found');
    }

    return user;
}


module.exports = {
    getUserProfile,
    updateUserProfile
};