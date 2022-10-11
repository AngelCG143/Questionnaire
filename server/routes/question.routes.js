const { authenticate } = require("../config/JwtConfig");
const QuestionController = require("../controllers/question.controller")


module.exports = (app) => {
    app.get('/api/questions' , authenticate ,QuestionController.getAllQuestions);
    app.get('/api/question/:id', authenticate ,QuestionController.getQuestion);
    app.post('/api/question/create', authenticate ,QuestionController.createQuestion);
    app.put('/api/questions/:id', authenticate ,QuestionController.updateQuestion);
    app.delete('/api/question/:id', authenticate ,QuestionController.deleteQuestion);
}