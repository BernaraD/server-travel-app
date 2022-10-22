const mongoose = require("mongoose");

function connnectToMongoDB() {
    let MONGO_DB = "mongodb://localhost:27017/noble-mongodb-intro";

    mongoose
        .connect(MONGO_DB)
        .then(() => {
            console.log("mongodb+srv://Bernara:Summer2022@cluster0.b9a6zfb.mongodb.net/test");
        })
        .catch((e) => {
            console.log(e);
        });
}

module.exports = connnectToMongoDB;
