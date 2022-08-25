const HttpError = require("../models/http-error");
const { uuid } = require('uuidv4');
const { validationResult } = require('express-validator');

let DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empite State Building',
        description: 'One of the most epic places located in the heart of the big Apple',
        imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/800px-Empire_State_Building_%28aerial_view%29.jpg',
        address: '20 W 34th St., New York, NY 10001',
        location: {
            lat: 40.7484445,
            lng: -73.9878584,
        },
        creator: 'u1',
    },
    {
        id: 'p2',
        title: 'Vessel at Hudson Yards',
        description: 'Open-air, honeycomb-shaped attraction offering 16 stories & 80 landings for visitors to climb.',
        imageURL: 'https://static01.nyt.com/images/2020/02/03/nyregion/02Vessel/merlin_166181697_6dcd4f16-14d5-483f-b444-aa71b4a46927-superJumbo.jpg',
        address: '20 Hudson Yards, New York, NY 10001',
        location: {
            lat: 40.7538073,
            lng: -74.0043477,
        },
        creator: 'u2',
    }
]


const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid;

    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    });
    if (!place) {
        throw new HttpError('Could not find a place for the provided id', 404);
    }
    res.json({place})
}

const getPlacesByUserId = (req, res, next) => {
    const userId = req.params.uid;

    const places = DUMMY_PLACES.filter(p => {
        return p.creator === userId;
    });

    if (!places || places.length === 0) {
        return next(
            new HttpError("Could not find places for the provided user id", 404)
        );
    };
    res.json({place: places})
}

const createPlace = (req, res, next) => {
//Validation-result is a function, will look into this request to detect validation errors
   const validationErrors = validationResult(req);

   if (!validationErrors.isEmpty()){
       console.log(validationErrors);
       res.status(422)
       throw new HttpError(`Invalid inputs passed`, 422)
   }

    const { title, description, coordinates, address, creator } = req.body;
    //const title = req.body.title -
    // the above code is a shortcut for this line, with object destructuring.

    const createdPlace = {
        id: uuid(),
        title,
        description,
        location: coordinates,
        address,
        creator,
    };

    DUMMY_PLACES.push(createdPlace);
    res.status(201).json({ place: createdPlace })

}

const updatePlaceById = (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()){
        console.log(validationErrors);
        res.status(422)
        throw new HttpError(`Invalid inputs passed`, 422)
    }

    const { title, description } = req.body;
    const placeId = req.params.pid;

    const updatedPlace = {
        ...DUMMY_PLACES.find(p => p.id === placeId)
    };
    const placeIndex = {
        ...DUMMY_PLACES.findIndex(p => p.id === placeId)
    }
    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_PLACES[placeIndex] = updatedPlace;

    res.status(200).json({place: updatedPlace})
}

const deletePlaceById = (req, res, next) => {
    const placeId = req.params.pid;
    if (!DUMMY_PLACES.find(place => place.id === placeId)){
        throw new HttpError(`Could not find place for this id`, 404)
    }

    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);

    res.status(200)
        .json({message: `${placeId} was deleted successfully`})
}

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;