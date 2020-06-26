const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");


const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User").User


router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ regNo: req.body.regNo }).then(user => {
    if (user) {
      return res.status(400).json({ regNo: "Registration No. already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        regNo: req.body.regNo,
        mobileNo: req.body.mobileNo,
        blockName: req.body.blockName,
        roomNo: req.body.roomNo,
        clubCode: req.body.clubCode,
        email: req.body.email,
        password: req.body.password,
        testId:req.body.testId
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            // .catch(err => console.log(err));
        });
      });
    }
  });
});


router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const regNo = req.body.regNo;
  const password = req.body.password;

  // Find user by email
  User.findOne({ regNo }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ regNoNotFound: "Registration No. not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          regNo: user.regNo,
          clubCode: user.clubCode,
          testId: user.testId,
          mobileNo: user.mobileNo,
          email: user.email,
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: '3h'
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
