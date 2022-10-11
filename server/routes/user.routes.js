const { authenticate } = require("../config/JwtConfig")
const UserController = require("../controllers/user.controller")

module.exports = (app) => {
    app.post('/register', UserController.registerUser),
    app.post('/login', UserController.loginUser),
    app.get('/getLoggedUser', UserController.getLoggedInUser),
    app.get('/logout', UserController.logOutUser)
    
}