const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    question:{
        type: String,
        required: true,
        minLength: 4
    },
    description:{
        type: String,
        minLength: 10
    },
    level:{
        type: String,
        required: true,
        default: 'C2'
    },
    category: {
        type: String,
        required: true
    },
    answers: {
        type: [String],
        required: true
    },
    rightAnswers:{
        type: [String],
        required: true
    },
    rating: {
        type: Number,
        default: 1,
        required: true
    },
    random: {
        type: Boolean
    },
    ownerId:{
        type: String,
        required: true
    }
}, {timestamps: true})

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;