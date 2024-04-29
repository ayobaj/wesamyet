import User from '../models/userModel.js';
import bcrypt from 'bcrypt'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        // Check if username is provided
        if (!username) {
            throw { statusCode: 400, message: 'Please provide a username.' };
        }

        // Check if email is provided and valid
        if (!email) {
            throw { statusCode: 400, message: 'Please provide an email address.' };
        }

        // Check if password is provided
        if (!password) {
            throw { statusCode: 400, message: 'Please provide a password.' };
        }

        // Check password strength
        if (password.length < 6) {
            throw { statusCode: 400, message: 'Password must be at least 6 characters long.' };
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw { statusCode: 400, message: 'Email address is already registered.' };
        }

        const existingUserName = await User.findOne({username});
        if(existingUserName){
            throw {statusCode: 400, message: 'username exist already'};
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ username, email, password: hashedPassword });

        // Save the user to the database
        await newUser.save();

        // Respond with success message
        return res.status(201).json({ success: true, message: 'User created successfully.' });

    } catch (error) {
        // Pass the error to the error handler middleware
        next(error); // This line ensures that the error is passed to the error handling middleware
    }
};




export const signin = async (req, res, next) => {

    const {username, password} = req.body;

    try{

        const validUser = await User.findOne({username});
        
        if(!validUser){
            throw{statusCode: 400, message: 'user not found!'}
        }

        const validPassword = bcrypt.compareSync(password, validUser.password);

        if(!validPassword) {
            throw{ statusCode: 400, message: 'wrong password!'}
        }
        

        //Authentication of the user
        const token = jwt.sign({id:validUser._id }, process.env.JWT)

        // cancellation of the return of password to the user
        const {password: pass, ...other} = validUser._doc;
        
        //Adding cookie to the browser
        res.cookie('access_token', token, {httpOnly: true}).status(200).json({success: true, message: 'sign in successful!', ...other})

    } catch(error) { 
        
        next(error)
    }

}


export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT);

            const { password: pass, ...other } = user._doc;

            res.cookie('access_token', token, { httpOnly: true }).status(200).json(other);

        } else {
            
            const generatedPassword = Math.random().toString(36).slice(-8);

            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

            const newUser = new User({
                username: req.body.username.split("").join("").toLowerCase() + Math.random().toString(36).slice(-8),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo
            });

            await newUser.save();

            const token = jwt.sign({ id: newUser._id }, process.env.JWT);

            const { password: pass, ...other } = newUser._doc;

            res.cookie('access_token', token, { httpOnly: true }).status(200).json(other);
        }
    } catch (error) {
        next(error);
    }
};

export const signout = async (req, res, next) => {
    try{
        res.clearCookie('access_token');
        res.status(200).json('User Logged Out!')
    }catch(error){
        next(error)
    }
} 

