const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const HttpError = require("./models/http-error");
const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 8000;


const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');


app.use('/api/places', placesRoutes); // => /api/places/...
app.use('/api/users', usersRoutes);

//Middlewares, default error handler
app.use((error,req, res, next) => {
    if (res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500);
    res.json({message: error.message || "Unknown error occurred"})
})

app.use((req, res, next) => {
    const error = new HttpError("Could not find this route.", 404);
    throw error;
});




app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}....`);
});
