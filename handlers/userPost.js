const Test = require('../models/Test').Test
const orgTests = require('../models/Orgs').orgTests
const userScore = require('../models/Orgs').userScore
function takeTest(req, res, next) {
    if (req.body.testId && req.body.clubCode) {
        Test.findOne({ testId: req.body.testId, clubCode: req.body.clubCode }, (err, result) => {
            if (err) next(err)
            else {
                if (result == null) next("No such test or club code is present")
                else {
                    if(result.start==false)next("test not yet started please wait ")
                    //send the user question and options
                    var questionSet = [];
                    result.questions.forEach((question) => {
                        var q = {
                            quid: question._id,
                            ques: question.ques,
                            options: question.options
                        }
                        questionSet.push(q)
                    })
                    var data = { questionSet, testId: result.testId, clubCode: result.clubCode }
                    res.send(data)
                }
            }
        })
    }
    else next("Test id or club code is not present")
}
function submitTest(req, res, next) {
    // passing all the validation

    if (req.body.testId == null) next("testId not given")
    Test.findOne({ testId: req.body.testId }, (err, result) => {
        if (err) next(err)
        else if (result == null) next("no such test exists (source Test)")
        else {
            if(result.start==false)next("test has ended you cannot submit further")
            // iterate through answer array
            // and find answer values 
            let totalMarks = 0;
            let match = new Map()
            result.questions.forEach((value) => {
                match.set(value._id, value.ans)

            })
            // itertate through object array and 
            //get the current score
            req.body.ans.forEach((value) => {
                // check if key is there
                let correctAns = match.get(parseInt(value._id))
                console.log(value)
                console.log(value._id)
                console.log(value.ans)
                // add marks if correct 
                if (correctAns != null && correctAns == value.ans) {
                    totalMarks++
                }
            })
            // push the result to user

            orgTests.findOne({ testId: req.body.testId }, (err, result1) => {
                if (err) next(err)
                else if (result1 == null) {
                    next("No such test exists (source: Org)")

                }
                else {
                    // add user 
                    let newUser = userScore({ regNo: req.body.regNo, marks: totalMarks, name: req.body.name,mobileNo:req.body.mobileNo,email:req.body.email })

                    // for first entry
                    if (result1.usersScores == null) {

                        result1.usersScores = [newUser];

                    }
                    else result1.usersScores.push(newUser)
                    console.log(result1)
                    result1.save()
                        .then(() => res.send("result1 saved "))
                        .catch((err) => next(err))
                }

            })
        }
    })
}

module.exports = [takeTest, submitTest]