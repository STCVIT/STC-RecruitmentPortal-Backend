const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const validateOrgRegister = require('../../validation/org/register');
const validateOrgLogin = require('../../validation/org/login');

const Org = require('../../models/Orgs').Org;

router.post('/register', (req, res) => {
    const { errors, isValid } = validateOrgRegister(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Org.findOne({ email: req.body.email }).then(org => {
        if (org) {
            return res.status(400).json({ email: "Organisation email already exists" })
        } else {
            const newOrg = new Org({
                clubName: req.body.clubName,
                clubCode: req.body.clubCode,
                email: req.body.email,
                password: req.body.password,
                mobileNo: req.body.mobileNo,
                extras: req.body.extras,
                testId: req.body.testId
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newOrg.password, salt, (err, hash) => {
                    if (err) throw errl
                    newOrg.password = hash;
                    newOrg
                        .save()
                        .then(org => res.json(org));
                })
            })
        }
    });

})

router.post('/login', (req, res) => {
    const { errors, isValid } = validateOrgLogin(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    Org.findOne({ email }).then(org => {

        if (!org) {
            return res.status(400).json({ email: 'Email Id not found' });
        }

        bcrypt.compare(password, org.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: org.id,
                    clubName: org.clubName,
                    clubCode: org.clubCode,
                    testId: org.testId
                };

                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: '12h'
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
        })
    })

})

module.exports = router;