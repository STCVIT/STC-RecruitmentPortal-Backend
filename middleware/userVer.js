const User = require('../models/User').User
const Org = require('../models/Orgs').Org
const OrgTest = require('../models/Orgs').orgTests
const jwt = require('jsonwebtoken')
const secretkey = require('../config/keys').secretOrKey


function verify(req, res, next) {
    if (req.body.token == null) next("Token Not present")
    // verify token
    jwt.verify(req.body.token, secretkey, (err, data) => {
        if (err) {
            next(err);
        } else {
            if (data.regNo != req.body.regNo) next({ err: "Token Invalid" })
            else User.findOne({ regNo: data.regNo }, (err, result) => {
                if (err) next(err)
                else {
                    if (result == null) next({ err: "No such reg no exists" })
                    else {
                        next();
                    }
                }

            })

        }
    })
}


function testVerify(req, res, next) {
    if (req.body.testId == null) next("test id is empty")
    OrgTest.findOne({ testId: req.body.testId }, (err, result) => {
        if (err) next(err)
        else {
            if (result == null) {
                res.send({ error: 2 })
                return
            }
            else {
                // check if user already attempted
                let found = false;
                result.usersScores.forEach((value) => {
                    if (value.regNo == req.body.regNo) {
                        found = true

                    }

                })
                if (found) next("User already attempted")
                else next()
            }
        }
    })
}




function clubVerify(req, res, next) {
    if (req.body.clubCode ) {
        Org.findOne({ "clubCode": req.body.clubCode}, (err, result) => {
            if (err) next(err)
            if (result == null) next("no such clubCode exists")
            else {
                // verified
                next()
            }
        })
    }
    // else next()
}

module.exports = [verify, clubVerify,testVerify]