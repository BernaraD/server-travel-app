const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

const placesController = require('../controllers/places-controllers');


router.get('/:pid',  placesController.getPlaceById);
router.get('/user/:uid', placesController.getPlacesByUserId);

//Validator Express .not().isEmpty() middleware
router.post('/',
    check('title').not().isEmpty,
    check('description').isLength({min: 5}),
    check('address').not().isEmpty(),
    placesController.createPlace);

router.patch('/:pid', placesController.updatePlaceById);
router.delete('/:pid', placesController.deletePlaceById);



module.exports = router;