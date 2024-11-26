const mongoose = require('mongoose');
const { Schema } = mongoose;

const recommandationSchema = new Schema(
    {
        message: {
            type: String,
            required: true
        },
        sender: {
            type : mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        cv : {
            type : mongoose.Schema.Types.ObjectId, 
            required: true,
            ref: 'CV'
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('recommandation', recommandationSchema);