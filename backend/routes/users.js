const router = require('express').Router();
const { response } = require('express');
const User = require('../models/user.model');
const asyncHandler = require('express-async-handler');
const generateToken = require('../token');
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(request, file, callback) {
        callback(null, './../../frontend/src/images/upload');
    },
    filename: function(request, file, callback) {
        callback(null, file.originalname);
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024*1024*3
    }
})

//Backend URL : http://localhost:5000/user/
//function : Display users
router.route('/').get((request,response) => {
    User.find()
        .then((Users) => response.json(Users))
        .catch((err) => {console.log(err)
            response.status(500).json('Error : ' + err)})
});

router.route('/add').post( asyncHandler(async (request,response) => {
    
    const firstname = request.body.firstname;
    const lastname = request.body.lastname;
    const username = request.body.username;
    const email = request.body.email;
    const mobile = request.body.mobile;
    const department = request.body.department;
    const password = request.body.password;

    const userExists = await User.findOne({username});

    if (userExists) {
        response.status(500).json('User Already Exists');
    }

    const newUser = new User({firstname, lastname, username, email, mobile, department, password});

    newUser.save()
        .then((newUser) => response.status(201).json('User Added! (ID: ' + newUser + ')'))//token
        .catch((err) => {console.log(err)
            response.status(500).json('Error : ' + err)})
}));

router.route('/get/:id').get( asyncHandler(async (request,response) => {
    
    const username = request.params.id;

    await User.findOne({username})
        .then((user) => response.json( user))
        .catch((err) => {console.log(err)
            response.status(500).json('Error : ' + err)})
}));

router.route('/update/:id').put(async (request,response) => {

    let userID = request.params.id;

    const {department, firstname, lastname, email, mobile} = request.body;

    const updateUser = {department, firstname, lastname, email, mobile};

    await User.findByIdAndUpdate(userID, updateUser)
        .then((user) => response.json('User Updated! (ID: ' + user._id + ')'))
        .catch((err) => {console.log(err)
            response.status(500).json('Error : ' + err)})
});

router.route('/login').post(asyncHandler(async (request,response) => {
    
    const username = request.body.username;
    const password = request.body.password;

    const authenticateUser = await User.findOne({username});

    if (authenticateUser && (await authenticateUser.matchPassword(password))) {
        response.json({username});
    } else {
        response.status(500).json('Invalid Email or Password!');
    }

}));

module.exports = router;