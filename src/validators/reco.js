const { Validator } = require('jsonschema');

module.exports = {
    verifyReco: (cv) => {
        let validator = new Validator();
        let recoSchema = {
            type: 'object',
            properties: {
                message: {
                    type: 'string',
                    minLength: 1,
                    errorMessage: 'reco is missing or incorrect'
                },
                cv: {
                    type: 'string',
                    minLength: 1,
                    errorMessage: 'CV description is missing or incorrect'
                }
            },
            required: ['message', 'cv']
        };
        let result = validator.validate(cv, recoSchema);

        // if validation failed
        if (Array.isArray(result.errors) && result.errors.length) {
            let failedInputs = '';

            result.errors.forEach((error) => {
                failedInputs += (error.schema.error || error.message) + ', ';
            });
            return {
                message: failedInputs
            };
        }
    }
};