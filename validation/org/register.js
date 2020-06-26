const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateOrgRegister(data) {
    let errors = {};


    data.clubName = !isEmpty(data.clubName) ? data.clubName : "";
    data.clubCode = !isEmpty(data.clubCode) ? data.clubCode : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.mobileNo = !isEmpty(data.mobileNo) ? data.mobileNo : "";
    data.extras = !isEmpty(data.extras) ? data.extras : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.testId = !isEmpty(data.testId) ? data.testId : "";

    // clubCode check

    if (Validator.isEmpty(data.clubCode)) {
        errors.clubCode = 'Club code is required';

    }
    // clubName check
    if (Validator.isEmpty(data.clubName)) {
        errors.clubName = 'Club name is required';

    }
    // email
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    // Mobile no.
    if (Validator.isEmpty(data.mobileNo)) {
        errors.mobileNo = 'Mobile no. is required';

    }
    if (Validator.isEmpty(data.testId)) {
        errors.testId = "Test ID is required"
    }
    // Password check
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}