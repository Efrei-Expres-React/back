const cvModel = require('../models/cvModel.js');
const UserModel = require('../models/userModel');
const cv = require('../validators/cv');
const { verifyCv } = require('../validators/cv');

module.exports = {
    createCV: async (req, res) => {
        try {
            // Récupérer l'email de l'utilisateur depuis le JWT
            const { email } = req.user;
    
            // Trouver l'utilisateur correspondant à l'email
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(404).send({ message: "User not found." });
            }
    
            // Créer un nouvel objet CV à partir du corps de la requête
            const newCV = req.body;
    
            // Associer l'utilisateur au CV
            newCV.userId = user._id;
    
            // Vérifier les erreurs dans le CV (par exemple : champs requis manquants)
            const isNotValidCv = verifyCv(newCV);
            if (isNotValidCv) {
                return res.status(400).send({
                    message: isNotValidCv.message,
                });
            }
    
            // Empêcher les doublons en vérifiant le titre et l'utilisateur
            const existingCv = await cvModel.findOne({
                userId: user._id,
                title: newCV.title,
            });
            if (existingCv) {
                return res.status(400).send({
                    message: "A CV with this title already exists for this user. Please choose a different title.",
                });
            }
    
            // Créer le CV
            const createdCv = await cvModel.create({...newCV, email : email});
    
            // Préparer la réponse en filtrant les informations nécessaires
            const { title, description, visibility, experienceScolaire, experienceProfessionnel} = createdCv;
    
            res.status(201).send({
                success: true,
                cv: {
                    title,
                    description,
                    visibility,
                    experienceScolaire,
                    experienceProfessionnel,
                },
            });
        } catch (error) {
            // Gérer les erreurs inattendues
            res.status(500).send({
                message: error.message || "Some error occurred while creating the CV.",
            });
        }
    },
    getAllCV : async (req, res) => {
        try {
            // Récupérer l'email de l'utilisateur à partir du JWT
            const { email } = req.user;

            // Fetch CVs with the specified email
            const cvs = await cvModel.find({ email });

            // If no CVs are found, return a 404 response
            if (cvs.length === 0) {
                return res.status(404).send({
                    message: `No CVs found for email '${email}'.`,
                });
            }

            // Send all CVs as a response
            res.status(200).send({ cvs });

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
            const cvs = await cvModel.find().populate({
                path :"userId",
                select : "firstname lastname"
            });
    
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
            
            const { user } = req.user;

            if(user.email!==email){
                return res.status(403).send({
                    message: `CV with title '${title}' for email '${email}' not authorized for deletion.`,
                });
            }
    
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
                message: `CV titled '${title}' for email '${email}' was successfully deleted.`
            });
        } catch (error) {
            // Handle unexpected errors
            res.status(500).send({
                message: error.message || "An error occurred while deleting the CV.",
            });
        }
    },
    getAllPublicCVTitles: async (req, res) => {
        try {
            // Rechercher les CV avec `visibility: true` et récupérer les utilisateurs associés
            const cvs = await cvModel.find({ visibility: true }).populate('userId', 'firstname lastname');
    
            // Vérifier si aucun CV public n'a été trouvé
            if (!cvs || cvs.length === 0) {
                return res.status(404).send({
                    message: "No public CVs found.",
                });
            }
    
            // Préparer la réponse avec les titres des CV et les informations utilisateur
            const cvTitles = cvs.map(cv => ({
                title: cv.title,
                user: {
                    firstname: cv.userId.firstname,
                    lastname: cv.userId.lastname,
                }
            }));
    
            res.status(200).send({
                message: "Public CV titles fetched successfully.",
                cvs: cvTitles,
            });
        } catch (error) {
            // Gérer les erreurs inattendues
            res.status(500).send({
                message: error.message || "An error occurred while fetching public CV titles.",
            });
        }
    },
    getAllPublicCV: async (req, res) => {
        try {

            // Récupérer l'email de l'utilisateur depuis le JWT
            const { email } = req.user;
    
            // Trouver l'utilisateur correspondant à l'email
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(403).send({ message: "User not found." });
            }

            // Rechercher les CV avec `visibility: true` et récupérer les utilisateurs associés
            const cvs = await cvModel.find({ visibility: true }).populate('userId', 'firstname lastname');
    
            // Vérifier si aucun CV public n'a été trouvé
            if (!cvs || cvs.length === 0) {
                return res.status(404).send({
                    message: "No public CVs found.",
                });
            }
    
            // Préparer la réponse avec les titres des CV et les informations utilisateur
            const cvTitles = cvs.map(cv => ({
                cv: cv,
                user: {
                    firstname: cv.userId.firstname,
                    lastname: cv.userId.lastname,
                }
            }));
    
            res.status(200).send({
                message: "Public CV titles fetched successfully.",
                cvs: cvTitles,
            });
        } catch (error) {
            // Gérer les erreurs inattendues
            res.status(500).send({
                message: error.message || "An error occurred while fetching public CV titles.",
            });
        }
    }, 
    updateCV: async (req, res) => {
        try {
            // Extract user information from the JWT
            const { email } = req.user;
    
            // Extract CV ID and update data from the request
            const { id } = req.params;
            const updateData = req.body;
    
            // Find the CV by ID and email to ensure the user owns it
            const cv = await cvModel.findOne({ _id: id, email });
            if (!cv) {
                return res.status(404).send({ message: "CV not found or you do not have permission to update it." });
            }
    
            // Update the CV with the provided data
            const updatedCV = await cvModel.findByIdAndUpdate(id, updateData, { new: true });
    
            res.status(200).send({
                message: "CV updated successfully."
            });
        } catch (error) {
            res.status(500).send({
                message: error.message || "Some error occurred while updating the CV.",
            });
        }
    }   
};
