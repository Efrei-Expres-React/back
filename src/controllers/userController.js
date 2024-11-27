const { verifyUpdateUser } = require('../validators/user');
const UserModel = require('../models/userModel');


module.exports = {
    getMyInfos: async (req, res) => {
        try {
            const {firstname, lastname, email, bio, birth } = req.user;
            res.send({
                firstname,
                lastname,
                email, 
                birth : new Date(birth).toISOString().slice(0, 10), 
                bio
            });
        } catch (error) {
            res.status(500).send({
                message: error.message || 'Some error occurred on getting user informations'
            });
        }
    }, 
    updateMyInfos: async (req, res) => {
        try {
            const {email } = req.user;
            const updatedUser = req.body;
            const isNotValidateUser = verifyUpdateUser(updatedUser);

            if (isNotValidateUser) {
                res.status(400).send({
                    message: isNotValidateUser.message
                });
            } else {
                // First argument : find by email
                // Second argument : object that updates
                await UserModel.findOneAndUpdate(
                    { email },
                    { $set: updatedUser }, 
                );

                res.send({
                    sucess: true,
                    message : "updated"
                });
            }
        } catch (error) {
            res.status(500).send({
                message: error.message || 'Some error occurred while registering user'
            });
        }
    }
};

