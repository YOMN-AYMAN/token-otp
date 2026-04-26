import bcrypt from "bcrypt"
import { User } from '../../../dbConnection/models/user.model.js';
import { sendEmail } from "../../emails/sendEmail.js";
import jwt from "jsonwebtoken"
import { sendOTP } from "../../emails/sendOTP.js";

// export const signup = async (req, res) => { 
//     const user = await User.insertMany(req.body)
//     await sendEmail(req.body.email)
//     user[0].password = undefined
//     res.status(201).json({message: "new user added",user})
//     console.log("SIGNUP WORKING");
// };
export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "email already exists" });
    }
    const hashedPassword = bcrypt.hashSync(password, 8);
    const otp = Math.floor(100000 + Math.random() * 900000);
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        otp,
        otpExpires: Date.now() + 10 * 60 * 1000
    });
    await sendOTP(email , otp);
    // res.status(201).json({message: "OTP sent to email : " , email});
    res.status(201).json({message: "new user added",user})

};



// export const signin = async (req, res) => {
//     const isExist = await User.findOne({email:req.body.email})
//     if(isExist&&bcrypt.compareSync(req.body.password , isExist.password)){
//         jwt.sign({id:isExist._id , name:isExist.name , role:isExist.role} , "userSignin" , (error , token)=>{
//             res.status(200).json({message:"succuss token" , token})
//         })
//     }
//     else{
//         res.status(404).json({message:"incorrect email or password"})
//     }
// };



export const signin = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
        return res.status(404).json({ message: "user not found" })
    }

    if (!user.isVerified) {
        return res.status(401).json({message: "please verify your email first"})
    }

    const isMatch = bcrypt.compareSync(password, user.password)
    console.log(password , user.password)
    if (!isMatch) {
        return res.status(400).json({message: "incorrect email or password"})
    }

    jwt.sign({id: user._id, name: user.name, role: user.role},"userSignin",(error, token) => {
            res.status(200).json({message: "success token",token})
        }
    )
}

