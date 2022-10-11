const mongoose = require('mongoose');
const QuestionSchema = new mongoose.Schema({
    favoriteManga: {type: String,
        required:[true, "Just put one piece or something."],
        minLength: [3, "Gotta have at least three characters."]},
    favoriteMovie: {type: String,
        required:[true, "I know there must be atleast one!"],
        minLength: [3, "Its gotta be at least 3 characters."]},
    favoriteShow: {type : String,
        required: [true, "You need to have at least one favorite show!"],
        minLength: [3, "Has tp be at least 3 characters!"]},
    favoriteAnimal: {type: String,
        required: [true, "Gotta have an animal."],
        minLength:[3, "Has to be at least 3 characters!"]},
    createdBy: {type:mongoose.Schema.Types.ObjectId,
        ref: 'User'}
    },
        { timestamps: true},
    );
module.exports = mongoose.model('Question', QuestionSchema )