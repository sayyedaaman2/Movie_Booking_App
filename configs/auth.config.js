if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

module.exports = {
    secret : process.env.SECRET_KEY,
    refresh_secret : process.env.REFRESH_SECRET_KEY,
    accessTokenTime : process.env.ACCESS_TOKEN_TIME,
    refreshTokenTime : process.env.REFRESH_TOKEN_TIME
}