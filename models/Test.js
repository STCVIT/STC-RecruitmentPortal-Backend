const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const questionSchema = new Schema({
    _id: {
      type:Number  
    },
    ques: String,
    ans: String,
    options: [String]
})

const testSchema = new Schema({
    clubCode: {
        type: String,
        required: true
    },
    testId: {
        type: Number,
        unique: true,
        required: true
    },
    start:{type:Boolean,default:false},
    MaxMarks: Number,
    perQuestionMarks: Number,
    negativeMarks: Number,
    questions: [questionSchema],

})
const Question = Mongoose.model("Question", questionSchema);
const Test = Mongoose.model("Test", testSchema);

module.exports = {
    Test, Question
}