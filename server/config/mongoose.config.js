const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/project7', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then( () => console.log("You good bro."))
    .catch(err => console.log("You messed it up, fix it.", err))