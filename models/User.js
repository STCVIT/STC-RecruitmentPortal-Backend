const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema for test scores of users
const userTestScoreSchema = new Schema({
  testId: Number,
  score: Number,
  attempted: Boolean
})

// Create User Schema
const UserSchema = new Schema({
  name: {

    type: String,
    required: true
  },
  regNo: {  
    type: String,
    required: true
  },
  mobileNo: {
    type: Number,
    required: true,
  },
  blockName: {
    type: String,
    default: 'Outside Campus'
  },
  roomNo: {
    type: Number,
  },
  clubCode: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique:false
  },
  password: {
    type: String,
    required: true
  },
  score: [userTestScoreSchema],
  date: {
    type: Date,
    default: Date.now
  },
  testId: {
    type:Number
  }
});
const UserTestScores = mongoose.model("UserTestScores", userTestScoreSchema);

const User = mongoose.model("users", UserSchema);
module.exports = {
  User, UserTestScores
}