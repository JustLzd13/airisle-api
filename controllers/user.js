//[SECTION] Dependencies and Modules
const bcrypt = require('bcrypt');
const User = require("../models/User");

const auth = require("../auth");

//[CONTROLLER] Register a new user
module.exports.registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, mobileNumber, presentAddress, dateOfBirth } = req.body;

        // Check if email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            mobileNumber,
            presentAddress,
            dateOfBirth
        });

        const savedUser = await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: savedUser });
    } catch (error) {
        errorHandler(error, res);
    }
};

//[CONTROLLER] Login a user
module.exports.loginUser = (req,res) => {

    if(req.body.email.includes("@")){
        return User.findOne({ email : req.body.email })
        .then(result => {


            if(result == null){
                return res.status(404).send({ error: "No Email Found" });
            } else {

                const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);
                if (isPasswordCorrect) {

                    return res.status(200).send({ access : auth.createAccessToken(result)})

                } else {

                    return res.status(401).send({ message: "Email and password do not match" });
                }
            }
        })
        .catch(err => err);
    } else {
        return res.status(400).send(false)
    }
};


//[CONTROLLER] View user profile (User)
module.exports.getProfile = (req, res) => {
    return User.findById(req.user.id)
    .then(user => {
        if(!user){
            return res.status(404).send({error: 'User not found'})
        }else{
            user.password = "";
            res.status(200).send({user}); 
        }
    })
    .catch(error => errorHandler(error, req, res));

};


//[CONTROLLER] Reset user password (User)
module.exports.resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const { id } = req.user; 

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(id, { password: hashedPassword });

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//[CONTROLLER] Update user profile details (User)
module.exports.updateProfile = async (req, res) => {
    try {
        const updates = req.body;

        const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, { new: true, runValidators: true }).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        errorHandler(error, res);
    }
};
