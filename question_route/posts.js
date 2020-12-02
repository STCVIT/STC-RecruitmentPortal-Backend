const expresss = require('express');
const router = expresss.Router();

const [userVerify, clubVerify, testVerify] = require('../middleware/userVer');
// const [userVerify, clubVerify] = require('../middleware/userVer');

const orgVerify = require('../middleware/orgVer').verify
const [addTest, addQuestion, checkResult,deleteQuestion, modifyQuestion,viewQuestions,updateTestStatus,getTestStatus] = require('../handlers/orgTest');
const [takeTest, submitTest] = require('../handlers/userPost');

router.route('/users/takeTest').post(userVerify, testVerify, takeTest);
router.route("/users/submitTest").post(userVerify, testVerify, clubVerify, submitTest)

// router.route('/users/takeTest').post(userVerify,  takeTest);
// router.route("/users/submitTest").post(userVerify, clubVerify, submitTest)
router.route("/orgs/addTest").post(addTest)
router.route("/orgs/getTestStatus").post(getTestStatus)
router.route("/orgs/updateTestStatus").post(updateTestStatus)
router.route("/orgs/checkResult").post((orgVerify), (checkResult))
router.route("/orgs/viewQuestions").post((orgVerify), (viewQuestions))
router.route("/orgs/questions/:id").post((orgVerify), (addQuestion))
router.route("/orgs/questions/:id").put((orgVerify), (modifyQuestion))
router.route("/orgs/questions/:id").delete((orgVerify), (deleteQuestion))
router.route("*").all((req, res, next) => res.send("route not found"));


module.exports = router;
