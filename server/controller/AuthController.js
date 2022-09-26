const User = require('../models/User');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
class AuthController{
    // [POST] /api/auth/register
    async register(req, res){
        const {username, password} = req.body;
        // Simple validation
        if(!username || !password)
            return res.status(400).json({success:false, message: 'Invalid username or password'})

        try {
            // check xem co user trong db chua
            const user = await User.findOne({username: username})
            if(user) 
                return res.status(400).json({success: false, message: 'Da trung Username roi'})
                
            //KHI THANH CONG(ma hoa password)
            const hashedPassword = await argon2.hash(password)  // truyen password vao de ma hoa
                
            //Tao ra mot user moi 
            const newUser = new User({
                username: username,
                password: hashedPassword
            })
            await newUser.save()

            // Tra ve token
            const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET)
            return res.json({success: true, message: 'User created successfully', accessToken})
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: "Internal server error"});
        }
    }

    // [POST] /api/auth/login
    async login(req, res) {
        const {username, password} = req.body;

        // Simple validation
        if(!username || !password){
            res.status(401).json({success: false, message: "invalid username or password"})
        }

        try {
            // check xem co username trong db chua
            const user = await User.findOne({username: username})
            if(!user){
                return res.status(400).json({success: false, message: "Incorrect username"});
            } 

            // thanh cong (khong trung username)
            const passwordValid = await argon2.verify(user.password, password)
            if(!passwordValid){
                return res.status(401).json({success: false, message: "Incorrect password"});
            }

             // Tra ve token
             const accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET)
             return res.json({success: true, message: 'Login successfully', accessToken})

        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    }

    // [GET] /api/auth/get: Kiem tra user login
    async get(req, res) {
        try {
            const user = await User.findById(req.userId).select('-password');
            if(!user)
                return res.status(400).json({success: false, message: 'User not found'})
            res.json({success: true, user})
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    }

}

module.exports = new AuthController;