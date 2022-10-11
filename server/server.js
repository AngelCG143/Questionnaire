const express = require('express');
const cors = require('cors')
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 4000;

// app.use(cors())
app.use(express.json());

const cookieParser = require('cookie-parser')
;
app.use(cookieParser());               
app.use(express.urlencoded({ extended: true }));  

// app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));


require('./config/mongoose.config');  
require('./routes/question.routes')(app);
require('./routes/user.routes')(app);

app.listen(PORT, () => {
    console.log("Listening at Port 8000")
})

