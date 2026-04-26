import mongoose from "mongoose"

export const dbConnection = mongoose.connect("mongodb://127.0.0.1:27017/users_notes").then(()=>{
    console.log("mongoDB connected successfully")
}).catch((error)=>{
    console.log("connecting failed there is an error " , error)
})