const UserModel = require('../models/userModel');
const { verifyUser } = require('../validators/user');
const bcrypt = require('bcrypt');

module.exports = {
    register: async (req, res) => {
        try {
            const newUser = req.body;
            const isNotValidateUser = verifyUser(newUser);

            if (isNotValidateUser) {
                res.status(400).send({
                    error: isNotValidateUser.message
                });
            } else {
                // Prevent duplicates by looking for same mail
                existingUser = await UserModel.findOne({ email: newUser.email });

                if (existingUser) {
                    return res.status(400).send({ message: 'Email already exists, you can try sign in' });
                }

                newUser.password = await bcrypt.hash(newUser.password, 10);
                const { id, lastName, firstName, email, bio } = await UserModel.create(newUser);

                res.send({
                    sucess: true,
                    user: {
                        id,
                        lastName,
                        firstName,
                        email,
                        bio
                    }
                });
            }
        } catch (error) {
            res.status(500).send({
                message: error.message || 'Some error occurred while registering user'
            });
        }
    }
};
