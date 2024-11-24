const { Validator } = require('jsonschema');

module.exports = {
    verifyUser: (user) => {
        let validator = new Validator();
        let userSchema = {
            type: 'object',
            properties: {
                firstName: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 20,
                    errorMessage: 'User firstname is missing or incorrect'
                },
                lastName: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 20,
                    errorMessage: 'User lastname is missing or incorrect'
                },
                email: {
                    type: 'email',
                    format: 'email',
                    errorMessage: 'User email is missing or incorrect'
                },
                password: {
                    type: 'string',
                    minLength: 6,
                    errorMessage: "User's password, must contain at least one uppercase letter and one digit",
                    pattern: '^(?=.*[A-Z])(?=.*[0-9]).+$'
                },
                bio: {
                    type: 'string',
                    minLength: 6,
                    errorMessage: 'Must be a longer Bio'
                },
                birth: {
                    type: 'string',
                    format: 'date',
                    errorMessage: 'Please enter a birth date'
                }
            },
            required: ['firstName', 'lastName', 'email', 'password']
        };
        let result = validator.validate(user, userSchema);

        // console.log('error => ', result)
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
