const Question = require('../models/question.model');
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT_SECRET

module.exports.createQuestion = (req, res) => {
    console.log(req.cookies.userToken)
    const user = jwt.verify(req.cookies.userToken, SECRET)
    console.log(user);
    Question.create({...req.body,createdBy:user._id})
    .then ((newQuestion) => {
    res.json({newQuestion});
    })
    .catch((err) => {
    res.status(400).json({err});
    });
};

module.exports.getAllQuestions = (req, res) => {
    Question.find({}).populate('createdBy', 'userName email')
    .then((allQuestion) => {
    res.json(allQuestion);
    })
    .catch((err) => {
    res.status(400).json({err});
    });
};

module.exports.getQuestion = (req, res) => {
    Question.findOne( {_id: req.params.id} )
    .then ((queriedQuestion) => {
    res.json(queriedQuestion);
    })
    .catch((err) => {
    res.status(400).json({err});
    });
};

module.exports.updateQuestion = (req, res) => {
    Question.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
    })
        .then((updatedQuestion) => {
        res.json({ updatedQuestion });
        })
        .catch((err) => {
        res.status(400).json({ err });
        });
    };

module.exports.deleteQuestion = (req, res) => {
    Question.deleteOne({ _id: req.params.id })
    .then((deletedResponse) => {
    res.json({ deletedResponse });
    })
    .catch((err) => {
    res.status(400).json({ err });
    });
};