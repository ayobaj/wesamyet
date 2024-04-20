import User from '../models/userModel.js';
import bcrypt from 'bcrypt'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    
    const {username, email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10)

    const newUser = new User({username, email, password:hashedPassword});

    try{
        
        await newUser.save()
    
        res.status(201).json('user created successfully')

    } catch (error) {

        next(error)
    }


}



export const signin = async (req, res, next) => {

    const {username, password} = req.body;

    try{

        const validUser = await User.findOne({username});
        
        if(!validUser) return next(errorHandler(404, 'user not found!'));

        const validPassword = bcrypt.compareSync(password, validUser.password);

        if(!validPassword) return next (errorHandler(401, 'Wrong!'));
        

        //Authentication of the user
        const token = jwt.sign({id:validUser._id }, process.env.JWT)

        // cancellation of the return of password to the user
        const {password: pass, ...other} = validUser._doc;
        
        //Adding cookie to the browser
        res.cookie('access_token', token, {httpOnly: true}).status(200).json(other)

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

