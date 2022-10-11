const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET

module.exports = {
    registerUser: async(req, res) => {
        try{
            const user = new User(req.body)
            const newUser = await user.save()
            console.log('User created:', newUser)
            const userToken = jwt.sign({_id:newUser._id, email:newUser.email, userName:newUser.userName}, SECRET)
            res.status(201).cookie('userToken', userToken,{httpOnly:true, expires:new Date(Date.now() + 900000)}).json({successMessage: 'User registered',user:newUser})
        }catch(error){ 
            res.status(400).json(error)
        }
    },

    loginUser: async (req,res) => {
        const userDocument = await User.findOne({email:req.body.email});
        console.log('User Document', userDocument)
        if(!userDocument){
            res.status(400).json({error:'Invalid email/password'})
        }
            try{
                
                const isPasswordValid = await bcrypt.compare(req.body.password, userDocument.password)
                console.log(isPasswordValid)
                if(!isPasswordValid){
                    res.status(400).json({error:'Invalid email/password'})
                } else{
                    const userToken = jwt.sign({_id:userDocument._id, email:userDocument.email, userName:userDocument.userName}, SECRET)
                    console.log('JWT', userToken)
                    res.status(201).cookie('userToken', userToken,{httpOnly:true, expires: new Date(Date.now() + 900000)}).json({successMessage: 'User logged in',user:userDocument})
                }
            } catch (error){
                res.status(400).json({error:'Invalid email/password'})
            }
            
    },
        logOutUser: (req, res) => {
        res.clearCookie('userToken');
        res.json({successMessage:"User logged out!"})
    },

    getLoggedInUser: async (req,res) => {
        try{
            const user = jwt.verify(req.cookies.userToken, SECRET);
            const currentUser = await User.findOne({ _id: user._id });
            res.json(currentUser);
            console.log(currentUser)
        }catch (error){
            res.status(401).json({error});
        }
    },


    // getLoggedInUser: (req,res) => {
    //     const user = jwt.verify(req.cookie.userToken, SECRET)
    //     User.findOne({_id: user._id})
    //     .then((user) => {
    //         res.json(user);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    // }
}