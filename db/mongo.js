const mongoose = require("mongoose");

function connectToMongoDB() {
    let MONGO_DB = `mongodb+srv://${ process.env.DB_USER }:${ process.env.DB_PASSWORD }@cluster0.b9a6zfb.mongodb.net/${ process.env.DB_NAME }`;
    // let MONGO_DB = "mongodb://localhost:27017/noble-mongodb-intro";

    mongoose
        .connect(MONGO_DB)
        .then(() => {
            console.log('BeeTravel database is connected')
        })
        .catch(( e ) => {
            throw new Error('Unable to connect to database');
        });
}

module.exports = connectToMongoDB;
