const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const serverConfig = require('./configs/server.config');
const dbConfig = require('./configs/db.config');
const init = require('./init')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error", (err)=>{
    console.log(`___ Error while connecting the MongoDB ___ : ${err.message}`);
})
db.once("open", ()=>{
    console.log(`___ Connected To MongoDB ___`);
    init();
})


require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/movie.routes')(app);
require('./routes/theatre.routes')(app);
require('./routes/booking.routes')(app);
require('./routes/payment.routes')(app);


app.listen(serverConfig.PORT,()=>{
    console.log(`Server listening on ${serverConfig.PORT}`);
})