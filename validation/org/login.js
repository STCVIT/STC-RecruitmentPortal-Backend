const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateOrgLogin(data) {
    let errors = {}

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.testId_org = !isEmpty(data.testId_org) ? data.testId_org : "";

    // email check
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    // password check

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is empty";
    }
    if (Validator.isEmpty(data.testId)) {
        errors.testId_org = "Test ID is empty";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}