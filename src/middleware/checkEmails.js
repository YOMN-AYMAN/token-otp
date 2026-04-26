import { User } from "../../dbConnection/models/user.model.js"
import bcrypt from "bcrypt"


export const checkEmails = async(req ,res , next )=>{
    const {email , password} = req.body
    const userExists = await User.findOne({email})
        if (userExists) {
            return res.status(400).json({ message: "email already exist" })
        }
    const hashedPassword = bcrypt.hashSync(password , 8)
    req.body.password = hashedPassword
    next()
}