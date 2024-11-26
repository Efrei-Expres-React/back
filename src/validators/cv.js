const { Validator } = require('jsonschema');

module.exports = {
    verifyCv: (cv) => {
        let validator = new Validator();
        let userSchema = {
            type: 'object',
            properties: {
                title: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 50,
                    errorMessage: 'CV title is missing or incorrect'
                },
                description: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 200,
                    errorMessage: 'CV description is missing or incorrect'
                },
                visibility: {
                    type: 'boolean',
                    errorMessage: 'CV title is missing or incorrect'
                }

            },
            required: ['title', 'description', 'visibility']
        };
        let result = validator.validate(cv, userSchema);

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