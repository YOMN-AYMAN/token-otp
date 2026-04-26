import { Note } from "../../../dbConnection/models/note.model.js"




export const addNote = async(req , res)=>{
    const note = await Note.insertMany(req.body)
    res.status(200).json({message:"success", note})
}


export const getAllNote = async (req , res)=>{
    const note = await Note.find() // علشان اجيب النوت الخاصه بمستخدم معين لازم احط id
    res.status(200).json({message:"success", note})
}


export const updateNote = async(req , res)=>{
    const note = await Note.findByIdAndUpdate(req.params.id , req.body , {new:true})
    res.status(200).json({message:"success", note})
}


export const deleteNote = async(req , res)=>{
    const note = await Note.findByIdAndDelete(req.params.id)
    if(!note){
        return res.status(404).json({message:"note not found"})
    }
    res.status(200).json({message:"success", note})
}