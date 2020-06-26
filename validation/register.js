const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.regNo = !isEmpty(data.regNo) ? data.regNo : "";
  data.mobileNo = !isEmpty(data.mobileNo) ? data.mobileNo : "";
  data.clubCode = !isEmpty(data.clubCode) ? data.clubCode : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.testId = !isEmpty(data.testId) ? data.testId : "";

  // Regno check
  if (Validator.isEmpty(data.regNo)) {
    errors.regNo = "Registration No. is required";
  }
  // Mobile check
  if (Validator.isEmpty(data.mobileNo)) {
    errors.mobileNo = "Mobile No. is required";
  }

  // Club Code check
  if (Validator.isEmpty(data.clubCode)) {
    errors.clubCode = "Club code is required";
  }
  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.testId)) {
    errors.testId = "Test ID is required"
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }


  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};
