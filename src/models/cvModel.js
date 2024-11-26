const mongoose = require('mongoose');
const { Schema } = mongoose;

const cvSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        visibility : {
            type: Boolean,
            required: true
        },
        experienceScolaire: [
            {
                type: { type: String, required: true },
                lieuFormation: { type: String, required: true },
                dateDebut: { type: Date, required: true },
                dateFin: { type: Date, required: true },
                description: {type: String, require: false}
            }
        ],
        experienceProfessionnel: [
            {
                poste: { type: String, required: true },
                entreprise: { type: String, required: true },
                dateDebut: { type: Date, required: true },
                dateFin: { type: Date, required: true },
                missions: [
                    {
                        titre: { type: String, required: true },
                        description: { type: String, required: true }
                    }
                ]
            }
        ],
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('CV', cvSchema);