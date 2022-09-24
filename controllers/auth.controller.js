const bcrypt = require('bcrypt');
const User = require('../models/user.model')
const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config');
const constants = require('../utils/constants');
const objectConverter = require('../utils/objectConverter')


exports.signup = async (req,res)=>{

    const userObj = {
        name : req.body.name,
        userId : req.body.userId,
        email : req.body.email,
        userType : req.body.userType,
        password : bcrypt.hashSync(req.body.password, 8),
        userStatus : req.body.userType == constants.userTypes.customer ? constants.userStatus.approved : constants.userStatus.pending
    };

    try{
        const userCreated = await User.create(userObj);

        console.log(`___ ${userCreated.userType} ${userCreated.name} created ___`);
        res.status(201).send(objectConverter.singleUserResponse(userCreated));
    }catch(err){
        console.log("___ error while user sign up ___", err.message);
        res.status(500).send({
            message : "Internal server error while creating user"
        });
    }
}

exports.signin = async (req,res)=>{
    try{
        const user = await User.findOne({userId : req.body.userId})
        if(!user){
            return res.status(400).send({
                message : "Failed! userId passed dosen't exist"
            });
        }
        
        if(user.userStatus == constants.userStatus.pending){
            return res.status(400).send({
                message : "User is not yet approved from the admin"
            });
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid){
            return res.status(401).send({
                message : "Wrong password"
            });
        }

        const accessToken = jwt.sign({id: user.userId}, authConfig.secret, {expiresIn : authConfig.accessTokenTime});
        const refreshToken = jwt.sign({id: user.userId}, authConfig.refresh_secret, {expiresIn : authConfig.refreshTokenTime});
        console.log(`___ ${user.userType} ${user.name} logged in ___`);

        res.status(200).send({
            name : user.name,
            userId : user.userId,
            email : user.email,
            userType : user.userType,
            userStatus : user.userStatus,
            accessToken : accessToken,
            refreshToken : refreshToken
        });
    }catch(err){
        console.log("___ Error while user sign in ___ ", err.message);
        res.status(500).send({
            message : "Internal server error while user signin"
        });
    }
}

exports.refreshAccessToken = (req,res)=>{
    const accessToken = jwt.sign({id: req.user.userId}, authConfig.secret, {expiresIn : authConfig.accessTokenTime});
    res.status(200).send({
        accessToken : accessToken
    });
}