//[Dependencies and Modules] 
const express = require('express');
const passport = require('passport');
const userController = require('../controllers/user.js');


const { verify, verifyAdmin } = require("../auth.js");

//[Routing Component] 
const router = express.Router();

// Create a user account (User)
router.post("/register", userController.registerUser);

// Login a user account (User)
router.post("/login", userController.loginUser);

// View a user profile (User)
router.get("/user-profile", verify, userController.getProfile);

// Reset a user account password (User)
router.put('/reset-password', verify, userController.resetPassword);

// Update a user account profile details (User)
router.put('/update-profile', verify, userController.updateProfile);



module.exports = router;