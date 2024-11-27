const cvModel = require('../models/cvModel');
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
                const cv = await cvModel.findOne({_id : cvObjectId});
                if(!cv){
                    res.status(404).send({
                        message: "CV not found"
                    });
                }
 
                const recommandation = await recoModel.create({message : reco.message, sender: senderObjectId, cv: cvObjectId});

                console.log("here")
                // push to recos
                cv.recommendations.push(recommandation._id);
                await cv.save();


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
        const reco = await recoModel.findOne({_id : recoId})

        if(!reco){
            res.status(400).send({
                message: "Recommandation not found"
            });
        }else{
        // remove relationship
        await cvModel.updateOne(
            { _id: reco.cv }, 
            { $pull: { recommendations: recoId } }
            );

        await reco.deleteOne()
            res.status(200).send({
                message: "Recommandation deleted"
            });
        }

        } catch (error) {
            res.status(500).send({
                message: error.message || 'Some error occurred while registering cv'
            });
        }
    },
    getALlMyRecos : async (req, res) => {
        try {
        const {_id} = req.user

        if(!_id){
            res.status(400).send({
                message: "Reco ID is not provided"
            });
        }


        const userId = new Types.ObjectId(_id);

        const cv = await cvModel.find({ userId: userId })
        .select('title description email visibility')
        .populate(
            {path : "recommendations", 
            select: 'message sender',
            populate :{
                path : "sender",
                select : "firstname lastname email"
            }
        }
        )
        if (!cv) {
          return { message: 'No CV found for this user.' };
        }
        
        res.status(200).send({
                message: cv
            });


        } catch (error) {
            res.status(500).send({
                message: error.message || 'Some error occurred while registering cv'
            });
        }
    },
    getCvRecomandations : async (req, res) => {
        try {
        const {id} = req.params

        if(!id){
            res.status(400).send({
                message: " CV ID is not provided"
            });
        }else{
            const cvId = new Types.ObjectId(id);

            const response = await recoModel.find({cv : cvId}).populate([{
                path: 'sender',  
                select: 'firstname lastname email'
              }])
    
            if(response.deletedCount === 0){
                res.status(400).send({
                    message: "Recommandation not found"
                });
            }else{
                res.status(200).send({
                    message: response
                });
            }
        }



        } catch (error) {
            res.status(500).send({
                message: error.message || 'Some error occurred while registering cv'
            });
        }
    }
};