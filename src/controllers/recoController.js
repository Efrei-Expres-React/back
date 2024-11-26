const recoModel = require('../models/recoModel');
const { verifyReco } = require('../validators/reco');
const { Types } = require('mongoose');

module.exports = {
    createReco: async (req, res) => {
        try {
            const {_id} = req.user
            const reco = req.body;

            const senderObjectId = new Types.ObjectId(_id);

            // verufy if reco body is valid
            const isNotValidCv = verifyReco(reco);

            if (isNotValidCv) {
                res.status(400).send({
                    message: isNotValidCv.message
                });
            } else {
                const cvObjectId = new Types.ObjectId(reco.cv);
 
                await recoModel.create({message : reco.message, sender: senderObjectId, cv: cvObjectId});

                res.send({
                    sucess: true,
                    message: 'CV successfully created',
                });
            }
        } catch (error) {
            res.status(500).send({
                message: error.message || 'Some error occurred while registering cv'
            });
        }
    },
    deleteReco : async (req, res) => {
        try {
        const {id} = req.params

        if(!id){
            res.status(400).send({
                message: "Reco ID is not provided"
            });
        }

        const recoId = new Types.ObjectId(id);

        const response = await recoModel.deleteOne({_id : recoId})

        if(response.deletedCount === 0){
            res.status(400).send({
                message: "Recommandation not found"
            });
        }else{
            res.status(200).send({
                message: "Recommandation deleted"
            });
        }

        } catch (error) {
            res.status(500).send({
                message: error.message || 'Some error occurred while registering cv'
            });
        }
    }
};