module.exports = {
    getMyInfos: async (req, res) => {
        try {
            const {firstName, lastName, email } = req.user;
            res.send({
                firstName,
                lastName,
                email
            });
        } catch (error) {
            res.status(500).send({
                message: error.message || 'Some error occurred on getting user informations'
            });
        }
    }
};

