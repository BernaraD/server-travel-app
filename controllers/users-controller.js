const HttpError = require("../models/http-error");
const {uuid} = require('uuidv4');

const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Bernara Marat',
        email: 'test@test.com',
        password: 'testers'
    }
]

const getAllUsers = (req, res, next) => {
    res.json({users: DUMMY_USERS})
}

const signup = (req, res, next) => {
    const {name, email, password} = req.body;

    const hasUser = DUMMY_USERS.find(user => user.email === email)
    if (hasUser){
       throw new HttpError("User already exists. Please sign in.", 422);
    }

    const createdUser = {
        id: uuid(),
        name,
        email,
        password
    };

    DUMMY_USERS.push(createdUser);
    res.status(200).json({ user: createdUser.email })
}

const login = (req, res, next) => {
    const {email, password} = req.body;

    const identifiedUser = DUMMY_USERS.find(user => user.email === email);
    if (!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError("Could not find this user, wrong credentials", 401)
    }
    res.json({message: 'Logged in', payload: identifiedUser.email})
}


module.exports = {
    getAllUsers,
    signup,
    login
}