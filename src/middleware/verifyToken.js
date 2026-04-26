
import jwt from "jsonwebtoken"
export const verifyToken = (req , res , next) =>{
    const {token} = req.headers
    jwt.verify(token , "userSignin" , (error , decoded)=>{
        if(error) return res.json({message:"error" , error})
        
        req.user = decoded // الخاصيه user دى انا انشئتها داخل req علشان تحمل لي decoded اللى هو البيانات اللى كانت متشفرة فى التوكن
        next()

    })

}
