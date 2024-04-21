import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from 'bcrypt'

export const test = (req, res) => {
    res.json({
        message: "Wagwan",
    });
}


export const updateUserInfo =  async (req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401, "Update only your account!"))

    try{
        if(req.body.password){

            req.body.password = bcrypt.hashSync(req.body.password, 10)
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, {new: true})

        const {password, ...other} = updateUserInfo._doc 

        res.status(200).json(other);

    }catch(error){
        next(error)
    }
}