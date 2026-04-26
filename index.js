import express from 'express'
import { dbConnection } from './dbConnection/dbConnection.js'
import { userRouter } from './src/modules/user/user.routes.js'
import { User } from './dbConnection/models/user.model.js'
import { noteRouter } from './src/modules/note/note.routes.js'
import jwt from "jsonwebtoken"

const app = express()
const port = 3000

app.use(express.json())
export const connection = dbConnection


app.use("/users" , userRouter)
app.use("/notes" , noteRouter)



app.get("/verify/:token" , (req , res)=>{
    const {token} = req.params
    jwt.verify(token , "emailSignin" , async(error , decoded)=>{
        if(error) return res.status(401).json({message:"invalid token : " , error})

        await User.findOneAndUpdate({email:decoded.email} , {confirmEmail:true})
        res.json({message:"success" , email:decoded.email})
    })
})


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))