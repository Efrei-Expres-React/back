const cvModel = require('../models/cvModel.js');
const { verifyCv } = require('../validators/cv');

module.exports = {
    createCV: async (req, res) => {
        try {
            const newCV = req.body;
            //TODO: verifier l'email du token et le comparer a l'email de la requete et a l'email de la base
            const isNotValidCv = verifyCv(newCV);

            if (isNotValidCv) {
                res.status(400).send({
                    message: isNotValidCv.message
                });
            } else {
                // Prevent duplicates by looking for same mail and title
                existingCv = await cvModel.findOne({ email: newCV.email, title: newCV.title });

                if (existingCv) {
                    return res.status(400).send({ message: 'Email & title already exists, you can try a different title' });
                }

                const {title, description, visibility, email, experienceScolaire, experienceProfessionnel} = await cvModel.create(newCV);

                res.send({
                    sucess: true,
                    cv: {
                        title,
                        visibility,
                        email,
                        description,
                        experienceScolaire,
                        experienceProfessionnel
                    }
                });
            }
        } catch (error) {
            res.status(500).send({
                message: error.message || 'Some error occurred while registering cv'
            });
        }
    },
    getAllCVTitles : async (req, res) => {
        try {
            const { email } = req.body;

            // Fetch CVs with the specified email
            const cvs = await cvModel.find({ email }, 'title'); // Only select the 'title' field

            // Extract titles from the result
            const titles = cvs.map(cv => cv.title);

            // Send the titles as a response
            res.status(200).send({ titles });

        } catch(error) {
            res.status(500).send({
                message: error.message || 'some error occurred while getting cv of user'
            });
        }
    },
    getOneCV : async (req, res) => {
        try {
            const { email, title } = req.body;

        // Fetch the CV with the given email and title
        const cv = await cvModel.findOne({ email, title });

        // If no CV is found, return a 404 response
        if (!cv) {
            return res.status(404).send({
                message: `CV with title '${title}' for email '${email}' not found.`,
            });
        }
        // Send the CV details in the response
        res.status(200).send({ 
            cv: {
                title: cv.title,
                visibility: cv.visibility,
                email: cv.email,
                description: cv.description,
                experienceScolaire: cv.experienceScolaire,
                experienceProfessionnel: cv.experienceProfessionnel,
            },
        });

        } catch (error) {

        }
    },
    getAllCVs: async (req, res) => {
        try {
            // Fetch all CVs from the database
            const cvs = await cvModel.find();
    
            // If no CVs are found, return a 404 response
            if (!cvs || cvs.length === 0) {
                return res.status(404).send({
                    message: "No CVs found.",
                });
            }
    
            // Send the list of CVs in the response
            res.status(200).send({ cvs });
        } catch (error) {
            // Handle unexpected errors
            res.status(500).send({
                message: error.message || "An error occurred while fetching all CVs.",
            });
        }
    },
    deleteCVByTitleAndEmail: async (req, res) => {
        try {
            const { email, title } = req.body;
    
            // Find and delete the CV
            const deletedCV = await cvModel.findOneAndDelete({ email, title });
    
            // If no CV was found and deleted, return a 404 response
            if (!deletedCV) {
                return res.status(404).send({
                    message: `No CV found with title '${title}' for email '${email}'.`,
                });
            }
    
            // Return a success response
            res.status(200).send({
                message: `CV titled '${title}' for email '${email}' was successfully deleted.`,
                deletedCV,
            });
        } catch (error) {
            // Handle unexpected errors
            res.status(500).send({
                message: error.message || "An error occurred while deleting the CV.",
            });
        }
    }
};